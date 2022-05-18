import React, { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CreateKanbanProjectModal } from '@vira/components/kanban/create-project.kanban'
import { useAuth } from '@vira/common/providers/auth.provider'
import { useFetch } from '@vira/common/hooks/use-fetch.hook'

export const KanbanLayout = () => {
  const { fetchData } = useFetch<any>()
  const { getUser } = useAuth()

  useEffect(() => {
    fetchData(`/kanban/projects/${getUser()!.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  }, [])

  return (
    <div className='flex flex-1'>
      <Link to='/kanban/aaaa12' className='fw-light link-dark'>
        No tienes ningún proyecto asociado
      </Link>
      <div className='flex flex-1'>{<Outlet />}</div>

      {/* MODALS */}
      <CreateKanbanProjectModal />
    </div>
  )
}
