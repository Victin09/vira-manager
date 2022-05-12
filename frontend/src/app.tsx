import React from "react";
import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "@vira/common/routes/public.route";
import { PrivateRoute } from "@vira/common/routes/private.route";
import { LandingTemplate } from "@vira/components/templates/landing.template";
import Landing from "@vira/views/landing.view";
import Login from "@vira/views/login.view";
import Register from "@vira/views/register.view";
import { AuthProvider } from "@vira/common/providers/auth.provider";
import { AppTemplate } from "@vira/components/templates/app.template";
import Home from "@vira/views/home.view";
import Kanban from "@vira/views/kanban/kanban.view";
import { KanbanLayout } from "@vira/components/templates/kanban.template";
import KanbanProjectView from "@vira/views/kanban/kanban-project.view";
import KanbanTasksView from "@vira/views/kanban/kanban-tasks.view";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LandingTemplate />}>
            <Route path="/welcome" element={<Landing />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
          </Route>
        </Route>
        {/* <Route element={<PrivateRoute />}> */}
        <Route element={<AppTemplate />}>
          <Route path="/" element={<Home />} />
          <Route element={<KanbanLayout />}>
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/kanban/:projectId" element={<KanbanProjectView />} />
            <Route path="/kanban/tasks" element={<KanbanTasksView />} />
          </Route>
        </Route>
        {/* </Route> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
