import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { apiSource } from "../apiSource";

// import apiSource

function DeleteRide(
  {
    // Props
  }
) {
  // State declarations
  const [ride, setRide] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  const navigate = useNavigate();
  const rideID = useParams().id;

  useEffect(() => {
    fetch(apiSource + `ride/` + rideID, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Ride fetch error");
        }
        return response.json();
      })
      .then((response) => setRide(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  async function deleteRide(e) {
    e.preventDefault();
    await fetch(apiSource + "ride/" + rideID, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  }

  // Render
  if (loading) return <p>Loading Ride Detail...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <>
      <Link to={"/"}>Home</Link>

      <Box component="form" onSubmit={deleteRide}>
        <p>Delete this ride?</p>
        <p>{ride.clientName}</p>
        <p>{ride.clientPhone}</p>
        <p>Pick up at {ride.pickUpTime}</p>
        <p>
          {ride.pickUpLocation} to {ride.dropOffLocation}
        </p>
        <p>Passengers: {ride.passengerCt}</p>
        <p>{ride.hasLuggage}</p>
        <p>{ride.notes}</p>
        <p>{ride.jobStatus}</p>
        <Button type="submit" variant="contained">
          Delete
        </Button>
      </Box>
    </>
  );
}

export default DeleteRide;
