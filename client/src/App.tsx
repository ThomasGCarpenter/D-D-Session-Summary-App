import React from "react";
import "./App.css";
import Welcome from "./pages/welcome";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/sign-up";
import LogIn from "./pages/login";
import AddSession from "./pages/add-session";
import Campaigns from "./pages/campaigns";
import NewCampaign from "./pages/campaigns-create";
import ViewSession from "./pages/campaigns-id-viewSessions";
import EditSession from "./pages/campaigns-id-editSessions";
import CampaignEdit from "./pages/campaigns-edit";
import SessionPage from "./pages/session-page";
import PrivateRoutes from "./privateRoute";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<Campaigns />} path="campaigns" />
        </Route>
        <Route path="campaigns/:id/addsession" element={<AddSession />} />
        <Route path="campaigns/create" element={<NewCampaign />} />
        <Route path="campaigns/:id/sessions" element={<ViewSession />} />
        <Route path="campaigns/:sessionid/edit/:id" element={<EditSession />} />
        <Route path="campaigns/:id/edit/" element={<CampaignEdit />} />
        <Route
          path="campaigns/:sessionid/session/:id"
          element={<SessionPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
