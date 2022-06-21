import { useEffect, useState } from "react";
import { ApiResponse } from "../types/api-response";
import { User } from "../types/user";
import { getApiUrl } from "../utils/api";
import { getInitials } from "../utils/text";

// Fetch all users from the database and return them as a list of users with filter and search functionality and a dropdown menu to select a user
export const SearchUsersDropdown = ({
  setSelectedUsers,
  selectedUsers,
}: {
  setSelectedUsers: (user: User) => void;
  selectedUsers: User[];
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiResult = await fetch(`${getApiUrl()}/users/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result: ApiResponse<User[]> = await apiResult.json();
      if (result.status === 200) {
        setUsers(result.data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="d-flex">
      <div className="dropdown">
        <div
          className="p-2 d-flex align-items-center justify-content-center rounded-circle bg-light"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-plus-lg"></i>
        </div>
        {!loading && (
          <div className="dropdown-menu p-2 shadow">
            <input
              type="text"
              className="form-control"
              id="exampleDropdownFormEmail2"
              placeholder="Busca un usuario"
            />
            <div className="my-3">
              {users
                .filter(
                  (i) => !selectedUsers.filter((y) => y.id === i.id).length
                )
                .map((user, index) => (
                  <div
                    key={index}
                    className="d-flex flex-column px-2"
                    onClick={() => setSelectedUsers(user)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="fw-semibold">{user.fullname}</span>
                    <span className="fw-light">{user.email}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
