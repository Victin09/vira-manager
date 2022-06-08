import React, { useEffect } from 'react'
// import { I18nProvider } from 'vira-i18n-react'
import { Routes, Route } from 'react-router-dom'
// import * as es from '@vira/common/i18n/es.json'
// import * as en from '@vira/common/i18n/en.json'
import { PublicRoute } from '@vira/common/routes/public.route'
import { PrivateRoute } from '@vira/common/routes/private.route'
import { LandingTemplate } from '@vira/components/templates/landing.template'
import Landing from '@vira/views/landing.view'
import Login from '@vira/views/login.view'
import Register from '@vira/views/register.view'
import { AuthProvider } from '@vira/common/providers/auth.provider'
import { AppTemplate } from '@vira/components/templates/app.template'
import { KanbanTemplate } from '@vira/components/templates/kanban.template'
import Home from '@vira/views/home.view'
import KanbanView from '@vira/views/kanban/kanban.view'
import KanbanProjectView from '@vira/views/kanban/kanban-project.view'
import KanbanTasksView from '@vira/views/kanban/kanban-tasks.view'
import { KanbanProvider } from './common/providers/kanban.provider'

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

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    // <I18nProvider language={selectedLanguage} locales={locales}>
    <AuthProvider>
      <KanbanProvider>
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
              <Route element={<KanbanTemplate />}>
                <Route path='/kanban' element={<KanbanView />} />
                <Route path='/kanban/:projectId' element={<KanbanProjectView />} />
                <Route path='/kanban/tasks' element={<KanbanTasksView />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </KanbanProvider>
    </AuthProvider>
    // </I18nProvider>
  )
}

export default App
