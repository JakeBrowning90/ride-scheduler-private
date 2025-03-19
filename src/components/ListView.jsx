import React, { useState, useEffect } from "react";
import { apiSource } from "../apiSource";
import { Link } from "react-router";

function ListView(
  {
    // Props
  }
) {
  // State declarations
  const [rideList, setRideList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Functions
  useEffect(() => {
    fetch(apiSource + "ride", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Game list fetch error");
        }
        return response.json();
      })
      .then((response) => setRideList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  // Render
  if (loading) return <p>Loading Ride List...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <>
      <Link to={"/"}>New</Link>

      <div>
        {rideList.length == 0 ? (
          <p>No rides scheduled</p>
        ) : (
          <ul>
            {rideList.map((ride) => {
              return (
                <li key={ride.id}>
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
                  <Link to={"/"}>Edit</Link>
                  <Link to={"/"}>Delete</Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default ListView;
