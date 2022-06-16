import { Route, Routes, useLocation } from "react-router-dom";
import { Main } from "./components/main";
import { Modal } from "./components/modal";
import { BasicSetup } from "./views/kanban/project-board";
import Landing from "./views/landing/landing";
import SignIn from "./views/landing/sign-in";
import SignUpView from "./views/landing/sign-up";
import { LandingTemplate } from "./components/templates/landing";

import "./app.css";
import { PublicRoute } from "./routes/public";

type CustomState = {
  background: Location;
};

function App() {
  const location = useLocation();
  const state = location.state as CustomState;
  const background = state && state.background;
  console.log({ background });

  return (
    <>
      <Routes location={background || location}>
        <Route element={<PublicRoute />}>
          <Route element={<LandingTemplate />}>
            <Route path="/welcome" element={<Landing />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUpView />} />
          </Route>
        </Route>
        <Route path="/kanban" element={<BasicSetup />}>
          <Route path="/kanban/modal" element={<Modal />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="modal" element={<Modal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
