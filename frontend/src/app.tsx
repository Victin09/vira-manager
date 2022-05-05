import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "@vira/common/routes/public.route";
import { PrivateRoute } from "@vira/common/routes/private.route";
import { LandingTemplate } from "@vira/components/templates/landing.template";
import Landing from "@vira/views/landing.view";
import Login from "@vira/views/login.view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<LandingTemplate />}>
            <Route path="/welcome" element={<Landing />} />
            <Route path="/sign-in" element={<Login />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
