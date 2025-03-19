import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router";
import ListView from "./components/ListView";
import ErrorScreen from "./components/ErrorScreen";
function App() {
  return (
    <>
      <main>
        <Routes>
          {/* List view */}
          <Route path="/" element={<ListView />} />
          {/* Ride New */}
          {/* Ride Edit */}
          {/* Ride Delete */}
          {/* Error view */}
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
