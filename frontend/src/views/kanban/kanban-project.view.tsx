import React, { useEffect } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { getApiUrl } from '@vira/common/utils/api.util'
import { useSearchParams } from 'react-router-dom'
import { ListKanban } from '@vira/components/kanban/list.kanban'

const KanbanProjectView = () => {
  const { getUser } = useAuth()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    console.log('params', searchParams.get('projectId'))
    const fetchData = async () => {
      const result = await fetch(
        `${getApiUrl()}/${getUser()!.id}/${searchParams.get('projectId')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      )
      const data = await result.json()
    }

    fetchData()
  }, [])

  return (
    <div className='flex flex-1 flex-col p-2'>
      <div className='self-end'>
        <button className='btn btn-ghost btn-sm basis-1'>Invitar a gente</button>
      </div>
      <ListKanban />
    </div>
  )
}

export default KanbanProjectView
