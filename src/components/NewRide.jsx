import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { apiSource } from "../apiSource";

function NewRide(
  {
    // Props
  }
) {
  // State declarations
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpTime, setPickUpTime] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [passengerCt, setPassengerCt] = useState(1);
  const [hasLuggage, setHasLuggage] = useState(false);
  const [notes, setNotes] = useState("");
  const [rideSubmitError, setRideSubmitError] = useState([]);

  // Functions
  const navigate = useNavigate();

  const handleClientName = (e) => {
    setClientName(e.target.value);
  };
  const handleClientPhone = (e) => {
    setClientPhone(e.target.value);
  };
  const handlePickUpLocation = (e) => {
    setPickUpLocation(e.target.value);
  };
  const handlePickUpTime = (e) => {
    setPickUpTime(e.target.value);
  };
  const handleDropOffLocation = (e) => {
    setDropOffLocation(e.target.value);
  };
  const handlePassengerCt = (e) => {
    setPassengerCt(e.target.value);
  };
  const handleHasLuggage = (e) => {
    setHasLuggage(e.target.value);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  async function submitRequest(e) {
    e.preventDefault();
    const response = await fetch(apiSource + "ride", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientName: clientName,
        clientPhone: clientPhone,
        pickUpLocation: pickUpLocation,
        pickUpTime: pickUpTime,
        dropOffLocation: dropOffLocation,
        passengerCt: passengerCt,
        hasLuggage: hasLuggage,
        notes: notes,
      }),
    });
    const newRideResponse = await response.json();
    if (Array.isArray(newRideResponse.errors)) {
      setRideSubmitError(newRideResponse.errors);
    } else {
      navigate("/");
    }
  }

  // Render
  return (
    <>
      <Link to={"/"}>Home</Link>
      <p>Ride Request Form</p>
      <Box component="form" onSubmit={submitRequest}>
        {/* TODO: Add input attributes */}

        <TextField
          label="Name"
          variant="filled"
          type="text"
          name="clientName"
          id="clientName"
          value={clientName}
          onChange={handleClientName}
          slotProps={{ htmlInput: { minLength: 1, maxLength: 30 } }}
          required
        />
        <TextField
          label="Phone number"
          variant="filled"
          type="tel"
          name="clientPhone"
          id="clientPhone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={clientPhone}
          onChange={handleClientPhone}
          required
        />
        <TextField
          label="Pick-up location"
          variant="filled"
          type="text"
          name="pickUpLocation"
          id="pickUpLocation"
          value={pickUpLocation}
          onChange={handlePickUpLocation}
          slotProps={{ htmlInput: { minLength: 1, maxLength: 30 } }}
          required
        />
        <DateTimePicker
          label="Pick-up time"
          name="pickUpTime"
          id="pickUpTime"
          disablePast
          value={pickUpTime}
          onChange={(newValue) => setPickUpTime(newValue)}
          required
        />
        <TextField
          label="Drop-off location"
          variant="filled"
          type="text"
          name="dropOffLocation"
          id="dropOffLocation"
          value={dropOffLocation}
          onChange={handleDropOffLocation}
          slotProps={{ htmlInput: { minLength: 1, maxLength: 160 } }}
          required
        />
        <TextField
          label="Passenger count"
          type="number"
          name="passengerCt"
          id="passengerCt"
          slotProps={{ htmlInput: { min: 1, max: 10 } }}
          value={passengerCt}
          onChange={handlePassengerCt}
          required
        />
        <FormControlLabel
          className="luggageLabel"
          control={
            <Switch
              name="hasLuggage"
              id="hasLuggage"
              value={hasLuggage}
              onChange={handleHasLuggage}
            />
          }
          label="Extra luggage:"
          labelPlacement="start"
        />
        <TextField
          label="Additional notes"
          multiline
          rows={4}
          name="notes"
          id="notes"
          slotProps={{ htmlInput: { maxLength: 160 } }}
          value={notes}
          onChange={handleNotes}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default NewRide;
