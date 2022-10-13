import React from "react";
import "./App.css";
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
import LandingPage from "./pages/landing-page";
import CampaignJoin from "./pages/campaigns-join";
import Logout from "./pages/log-out";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="logout" element={<Logout />} />
        <Route element={<PrivateRoutes />}>
          <Route path="campaigns" element={<Campaigns />} />
        </Route>
        <Route path="campaigns/join/:id" element={<CampaignJoin />} />
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
