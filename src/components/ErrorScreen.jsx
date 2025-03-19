import React from "react";
import { Link } from "react-router";
// import apiSource

function ErrorScreen(
  {
    // Props
  }
) {
  // State declarations
  // Functions
  // Render
  return (
    <div>
      <p>Error 404: Page not found</p>
      <Link to={"/"}>Home</Link>
    </div>
  );
}

export default ErrorScreen;