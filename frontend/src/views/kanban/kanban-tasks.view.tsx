import React, { useEffect } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getApiUrl } from '@vira/common/utils/api.util'

const KanbanTasksView = () => {
  const { getUser } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${getApiUrl()}/kanban/${getUser()!.id}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await result.json()
    }

    fetchData()
  }, [])

  return <h1>TASKS VIEW FOR USER {getUser()!.fullname}</h1>
}

export default KanbanTasksView
