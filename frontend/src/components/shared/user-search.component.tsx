/* eslint-disable multiline-ternary */
import { getApiUrl } from '@vira/common/utils/api.util'
import React, { useEffect, useState } from 'react'

type UserSearchProps = {
  selectedUsers: any[]
  setSelectedUsers: React.Dispatch<any[]>
}

export const UserSearch = ({ selectedUsers, setSelectedUsers }: UserSearchProps) => {
  const [users, setUsers] = useState<any[]>([])
  const [filterUser, setFilterUser] = useState<string>('')

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch(`${getApiUrl()}/users/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const result = await response.json()
      if (result.status === 200) {
        setUsers(result.data)
      }
    }

    getUsers()
  }, [users])

  return (
    <div className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
      <div className='d-flex flex-col p-2'>
        <input
          type='text'
          className='form-control'
          placeholder='Buscar'
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <ul className='list-group list-group-flush'>
          {users.length ? (
            users
              .filter((item) => {
                if (!filterUser) return true
                if (
                  item.fullname.toLowerCase().includes(filterUser) ||
                  item.fullname.toLowerCase().includes(filterUser)
                ) {
                  return true
                }
                return false
              })
              .filter((el) => {
                return selectedUsers.indexOf(el) < 0
              })
              .slice(0, 5)
              .map((user, index) => (
                <li
                  className='list-group-item'
                  key={index}
                  onClick={() => setSelectedUsers([...selectedUsers, user])}
                >
                  {user.fullname}
                </li>
              ))
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  )
}
