import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@react-forked/dnd";
import { useAuth } from "../../providers/auth";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/use-form";
import { ListType, ProjectType } from "../../types/kanban";
import { getApiUrl } from "../../utils/api";
import { ApiResponse } from "../../types/api-response";
import { User } from "../../types/user";
import {
  insertAndReorder,
  removeAndReorder,
  reorder,
} from "../../utils/kanban";
import { List } from "../../components/kanban/list";
import { ViewCardModal } from "../../components/kanban/view-card";
import { useKanban } from "../../providers/kanban";
import { SearchUsersDropdown } from "../../components/search-users-dropdown";
import { getInitials } from "../../utils/text";

const KanbanProjectView = () => {
  const { getUser } = useAuth();
  const { handleSubmit, register, values, errors } = useForm<{
    name: string;
  }>();
  const { projectId } = useParams();
  const { selectedProject } = useKanban();
  const [loading, setLoading] = useState<boolean>(true);
  const [project, setProject] = useState<ProjectType>();
  const [lists, setLists] = useState<ListType[]>([]);
  const [newList, setNewList] = useState<boolean>(false);
  const [selectedUsersState, setSelectedUsersState] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await fetch(
        `${getApiUrl()}/kanban/projects/${getUser()!.id}/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const result: ApiResponse<ProjectType> = await apiResult.json();
      if (result.status === 200) {
        setProject(result.data);
        setSelectedUsersState(result.data.users);
        setLists(result.data.lists ? result.data.lists : []);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (result.type === "task") {
      const sourceList = lists.find((list) => list._id === source.droppableId);
      const destinationList = lists.find(
        (list) => list._id === destination.droppableId
      );

      if (sourceList && destinationList) {
        if (sourceList._id === destinationList._id) {
          const newCards = reorder(
            sourceList.cards!,
            source.index,
            destination.index
          );

          await Promise.all(
            newCards.map(async (card) => {
              try {
                const apiResponse = await fetch(
                  `${getApiUrl()}/kanban/cards/${card._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(card),
                  }
                );
                const result: ApiResponse<any> = await apiResponse.json();
                if (result.status !== 200) return;
              } catch (error) {
                console.log("error", error);
              }
            })
          );
          const newState = lists.map((list) => {
            list._id === sourceList._id && (list.cards = newCards);
            return list;
          });
          setLists(newState);
        } else {
          // Remove from list and reorder cards
          const { removed, result } = removeAndReorder(
            sourceList.cards!,
            source.index,
            destination.index
          );
          // Update new source list cards order
          await Promise.all(
            result.map(async (card) => {
              try {
                const apiResponse = await fetch(
                  `${getApiUrl()}/kanban/cards/${card._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(card),
                  }
                );
                const result: ApiResponse<any> = await apiResponse.json();
                if (result.status !== 200) return;
              } catch (error) {
                console.log("error", error);
              }
            })
          );

          // Update card new list
          removed.list = destinationList._id;
          // Insert into new list
          const newCards = insertAndReorder(
            destinationList!.cards,
            removed,
            destination.index
          );
          // Update new cards order
          await Promise.all(
            newCards.map(async (card) => {
              try {
                const apiResponse = await fetch(
                  `${getApiUrl()}/kanban/cards/${card._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(card),
                  }
                );
                const result: ApiResponse<any> = await apiResponse.json();
                if (result.status !== 200) return;
              } catch (error) {
                console.log("error", error);
              }
            })
          );
          const newState = lists.map((list) => {
            list._id === sourceList._id && (list.cards = result);
            list._id === destinationList._id && (list.cards = newCards);
            return list;
          });
          setLists(newState);
        }
      }
    } else {
      const listsTmp = [...lists];
      const reorderedList = reorder(listsTmp, source.index, destination.index);
      await Promise.all(
        reorderedList.map(async (list) => {
          try {
            const apiResponse = await fetch(
              `${getApiUrl()}/kanban/lists/${list._id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(list),
              }
            );
            const result: ApiResponse<any> = await apiResponse.json();
            if (result.status !== 200) return;
          } catch (error) {
            console.log("error", error);
          }
        })
      );
      setLists(reorderedList);
    }
  };

  const handleNewList = async () => {
    try {
      const apiResponse = await fetch(`${getApiUrl()}/kanban/lists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          board: projectId,
          cards: [],
        }),
      });
      const result: ApiResponse<any> = await apiResponse.json();
      if (result.status === 201) {
        setLists([...lists, result.data]);
        setNewList(false);
        values.name = "";
        return;
      }
      return;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSelectedUser = async (user: any) => {
    const response = await fetch(`${getApiUrl()}/kanban/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: [...selectedUsersState, user._id] }),
      credentials: "include",
    });
    const result: ApiResponse<ProjectType> = await response.json();
    if (result.status === 200) {
      console.log("response", response);
      setSelectedUsersState([...selectedUsersState, user]);
    }
  };

  return (
    <div className="d-flex flex-column flex-grow-1 h-100">
      {loading ? (
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column ms-2">
          <div className="mx-2 mt-2 mb-2 d-flex align-items-center justify-content-between">
            <span className="fs-3 fw-bold">{`Tablero ${project?.code}`}</span>
            <div className="d-flex">
              {selectedUsersState.map((user, index) => (
                <div
                  key={index}
                  className="p-2 d-flex align-items-center justify-content-center rounded-circle bg-primary"
                >
                  <span className="text-white">
                    {getInitials(user.fullname)}
                  </span>
                </div>
              ))}
              <SearchUsersDropdown
                selectedUsers={selectedUsersState}
                setSelectedUsers={handleSelectedUser}
              />
            </div>
          </div>
          <div
            className="d-flex flex-grow-1 mt-4 overflow-auto"
            style={{
              height: "calc(100vh - 140px)",
              width: "calc(100vw - 170px)",
            }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="allCols"
                type="column"
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="d-flex w-100"
                  >
                    {lists.map((list, i) => {
                      return <List key={list._id} data={list} index={i} />;
                    })}
                    {provided.placeholder}
                    {!newList ? (
                      <div
                        className="d-flex align-items-center justify-content-center px-2 rounded-1 bg-light w-100 position-sticky"
                        style={{
                          width: "16rem",
                          height: "4rem",
                          cursor: "pointer",
                          top: "0px",
                        }}
                        onClick={() => setNewList(true)}
                      >
                        <div
                          className="d-flex align-items-center"
                          style={{ width: "16em" }}
                        >
                          <i className="bi bi-plus"></i>
                          <span className="ms-2">A??adir nueva lista</span>
                        </div>
                      </div>
                    ) : (
                      <form
                        className="ml-2 p-2 w-100"
                        onSubmit={handleSubmit(handleNewList)}
                      >
                        <input
                          type="text"
                          autoFocus
                          className={`${
                            errors.name ? "is-invalid " : ""
                          }form-control mt-1 me-1`}
                          placeholder="A??adir nueva columna"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "El nombre es obligatorio",
                            },
                          })}
                          style={{ width: "16em" }}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            <span className="fw-bold">Oops!</span> {errors.name}
                          </div>
                        )}
                      </form>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      )}
      <ViewCardModal />
    </div>
  );
};

export default KanbanProjectView;
