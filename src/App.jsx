import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";
import ListView from "./components/ListView";
import NewRide from "./components/NewRide";
import EditRide from "./components/EditRide";
import DeleteRide from "./components/DeleteRide";
import ErrorScreen from "./components/ErrorScreen";
function App() {
  return (
    <>
      <main>
        <Routes>
          {/* List view */}
          <Route path="/" element={<ListView />} />
          {/* Ride New */}
          <Route path="new" element={<NewRide />} />
          {/* Ride Edit */}
          <Route path=":id/edit" element={<EditRide />} />
          {/* Ride Delete */}
          <Route path=":id/delete" element={<DeleteRide />} />
          {/* Error view */}
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
