import React, { useEffect, useState } from 'react'
// import { I18nProvider } from 'vira-i18n-react'
import { Routes, Route } from 'react-router-dom'
import * as es from '@vira/common/i18n/es.json'
import * as en from '@vira/common/i18n/en.json'
import { PublicRoute } from '@vira/common/routes/public.route'
import { PrivateRoute } from '@vira/common/routes/private.route'
import { LandingTemplate } from '@vira/components/templates/landing.template'
import Landing from '@vira/views/landing.view'
import Login from '@vira/views/login.view'
import Register from '@vira/views/register.view'
import { AuthProvider } from '@vira/common/providers/auth.provider'
import { AppTemplate } from '@vira/components/templates/app.template'
import Home from '@vira/views/home.view'
import Kanban from '@vira/views/kanban/kanban.view'
import { KanbanLayout } from '@vira/components/templates/kanban.template'
import KanbanProjectView from '@vira/views/kanban/kanban-project.view'
import KanbanTasksView from '@vira/views/kanban/kanban-tasks.view'

const App = () => {
  // const [selectedLanguage, setSelectedLanguage] = useState('')

  // useEffect(() => {
  //   const language = localStorage.getItem('language')
  //   if (!language) {
  //     setSelectedLanguage('en')
  //     localStorage.setItem('language', 'en')
  //   } else {
  //     setSelectedLanguage(language)
  //   }
  // }, [])

  // const locales = [
  //   {
  //     language: 'en',
  //     resources: en
  //   },
  //   {
  //     language: 'es',
  //     resources: es
  //   }
  // ]

  return (
    // <I18nProvider language={selectedLanguage} locales={locales}>
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LandingTemplate />}>
            <Route path='/welcome' element={<Landing />} />
            <Route path='/sign-in' element={<Login />} />
            <Route path='/sign-up' element={<Register />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AppTemplate />}>
            <Route path='/' element={<Home />} />
            <Route element={<KanbanLayout />}>
              <Route path='/kanban' element={<Kanban />} />
              <Route path='/kanban/:projectId' element={<KanbanProjectView />} />
              <Route path='/kanban/tasks' element={<KanbanTasksView />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
    // </I18nProvider>
  )
}

export default App
