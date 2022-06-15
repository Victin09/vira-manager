/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { useAuth } from '@vira/common/providers/auth.provider'
import { ApiResponse } from '@vira/common/types/api-response.type'
import { getApiUrl } from '@vira/common/utils/api.util'
import { Kanban } from '@vira/models/kanban/kanban.model'
import { Link } from 'react-router-dom'
import { CreateKanbanProjectModal } from '@vira/components/kanban/modals/create-project.kanban'
import { useKanban } from '@vira/common/providers/kanban.provider'
import { formatToDate } from '@vira/common/utils/date.util'

const KanbanView = () => {
  const [filterProject, setFilterProject] = useState('')
  const { getUser } = useAuth()
  const { projects, setProjects, displayCreateProjectModal, setDisplayCreateProjectModal } =
    useKanban()

  useEffect(() => {
    const fetchData = async () => {
      const result: Response = await fetch(`${getApiUrl()}/kanban/projects/${getUser()!.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const resultData: ApiResponse<Kanban> = await result.json()
      if (resultData.status === 200) {
        setProjects(resultData.data.projects)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='d-flex flex-col'>
      <div className='d-flex justify-content-between'>
        <span className='fs-3 fw-bold'>Tus proyectos</span>
        <button
          className='btn btn-sm btn-primary'
          type='button'
          onClick={() => setDisplayCreateProjectModal(true)}
        >
          Crear proyecto
        </button>
        {displayCreateProjectModal && <CreateKanbanProjectModal />}
      </div>
      {!projects.length ? (
        <span>No tienes proyectos creados</span>
      ) : (
        <div className='d-flex flex-col mt-5'>
          <div className='input-group input-group-sm flex-nowrap mb-3 w-25'>
            <span className='input-group-text' id='addon-wrapping'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </span>
            <input
              type='text'
              className='form-control'
              placeholder='Busca un proyecto'
              aria-label='Busca un proyecto'
              aria-describedby='addon-wrapping'
              onChange={(e) => setFilterProject(e.target.value)}
            />
          </div>

          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>Código</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Descripción</th>
                <th scope='col'>Fecha de creación</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter((item) => {
                  if (!filterProject) return true
                  if (
                    item.name.toLowerCase().includes(filterProject) ||
                    item.name.toLowerCase().includes(filterProject)
                  ) {
                    return true
                  }
                  return false
                })
                .map((project, index) => (
                  <tr key={index}>
                    <th scope='row'>
                      <Link to={`/kanban/${project._id}`}>{project.code}</Link>
                    </th>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{formatToDate(project.createdAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default KanbanView
