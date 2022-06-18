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
  }, [users]);

  return (
    <>
      {!loading && (
        <div
          className="uk-box-shadow-small uk-border-rounded"
          style={{ zIndex: "101" }}
        >
          <input
            type="text"
            placeholder="Search users"
            className="uk-input uk-form-width-large uk-border-rounded uk-width-1-1"
            onChange={(e) => {
              const search = e.target.value;
              users.filter((user) =>
                user.fullname.toLowerCase().includes(search.toLowerCase())
              );
              console.log("users", users);
            }}
          />
          <ul className="uk-list" style={{ marginTop: ".5em" }}>
            {users
              .filter(
                (i) =>
                  !selectedUsers.filter((y) => y.fullname === i.fullname).length
              )
              .map((user, index) => (
                <li
                  key={index}
                  onClick={() => setSelectedUsers(user)}
                  style={{ cursor: "pointer", padding: ".5em" }}
                >
                  <span
                    className="uk-border-circle uk-background-primary uk-light uk-margin-small-right"
                    style={{
                      padding: ".30em",
                      paddingLeft: ".5em",
                      paddingRight: ".5em",
                    }}
                  >
                    {getInitials(user.fullname)}
                  </span>
                  {user.fullname}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};
