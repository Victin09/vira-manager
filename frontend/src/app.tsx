import { Route, Routes, useLocation } from "react-router-dom";
import { Main } from "./components/main";
import { Modal } from "./components/modal";
import Landing from "./views/landing/landing";
import SignIn from "./views/landing/sign-in";
import SignUpView from "./views/landing/sign-up";
import { LandingTemplate } from "./components/templates/landing";

import "./app.css";
import { PublicRoute } from "./routes/public";
import { PrivateRoute } from "./routes/private";
import { AuthProvider } from "./providers/auth";
import KanbanProjectView from "./views/kanban/kanban-board";
import { KanbanTemplate } from "./components/templates/kanban";
import KanbanView from "./views/kanban/kanban";
import { AppTemplate } from "./components/templates/app";
import { KanbanProvider } from "./providers/kanban";
import KanbanBacklogView from "./views/kanban/kanban-backlog";

type CustomState = {
  background: Location;
};

function App() {
  const location = useLocation();
  const state = location.state as CustomState;
  const background = state && state.background;
  console.log({ background });

  return (
    <AuthProvider>
      <KanbanProvider>
        <Routes location={background || location}>
          <Route element={<PublicRoute />}>
            <Route element={<LandingTemplate />}>
              <Route path="/welcome" element={<Landing />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUpView />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<AppTemplate />}>
              <Route path="/" />
              <Route path="/kanban" element={<KanbanView />} />
              <Route element={<KanbanTemplate />}>
                <Route
                  path="/kanban/:projectId/board"
                  element={<KanbanProjectView />}
                >
                  <Route
                    path="/kanban/:projectId/board/issue/:issueId"
                    element={<Modal />}
                  />
                </Route>
                <Route
                  path="/kanban/:projectId/backlog"
                  element={<KanbanBacklogView />}
                ></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
        {background && (
          <Routes>
            <Route path="modal" element={<Modal />} />
          </Routes>
        )}
      </KanbanProvider>
    </AuthProvider>
  );
}

export default App;
