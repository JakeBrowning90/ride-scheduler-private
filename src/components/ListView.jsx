import React, { useState, useEffect } from "react";
import { apiSource } from "../apiSource";
import { Link } from "react-router";
import person from "../assets/person.svg";

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

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Render
  if (loading) return <p>Loading Ride List...</p>;
  if (error) return <p>Network error, please try again later.</p>;

  return (
    <>
      <Link to={"new"}>
        <button className="btn btn-primary sticky-top">New</button>
      </Link>

      <div>
        {rideList.length == 0 ? (
          <p>No rides scheduled</p>
        ) : (
          <ul className="list-group">
            {rideList.map((ride) => {
              return (
                <li
                  key={ride.id}
                  className="list-group-item bg-light rideListItem"
                >
                  <div className="rideListItem-row">
                    <p>{ride.jobStatus}</p>
                    <p>
                      {days[new Date(ride.pickUpTime).getDay()]}{" "}
                      {new Date(ride.pickUpTime).toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="rideListItem-row">
                    <p>{ride.clientName}</p>
                    <p>
                      <img src={person} alt="" />
                      {ride.passengerCt}
                    </p>
                  </div>

                  <p>{ride.clientPhone}</p>
                  <p>{ride.pickUpLocation}</p>
                  <p>{ride.dropOffLocation}</p>
                  {ride.hasLuggage && <p>Extra Luggage</p>}
                  {ride.notes && <p>{ride.notes}</p>}
                  <div className="rideListItem-row">
                    <Link to={`${ride.id}/edit`}>Edit</Link>
                    <Link to={`${ride.id}/delete`}>Delete</Link>
                  </div>
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
