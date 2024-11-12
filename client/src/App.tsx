import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import View from "./components/View";
import ViewSingle from "./components/ViewSingle";
import EditJob from "./components/EditJob";
import ViewAll from "./components/ViewAll";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import TemporaryFormation from "./components/TemporaryFormation";
import Test from "./components/test";

// Inside your Routes

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view" element={<View />} />
        <Route path="/temporaryFormation" element={<TemporaryFormation />} />
        <Route path="/test" element={<Test />} />

        <Route
          path="/viewAll"
          element={
            <PrivateRoute>
              <ViewAll />
            </PrivateRoute>
          }
        />
        <Route path="/viewSingle/:id" element={<ViewSingle />} />
        <Route path="/editJob/:id" element={<EditJob />} />

        {/* <Route path="/viewSingle/:id" element={<ViewSingle />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
