import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { MattersContext } from "../../context/MattersContext";

export default function SharingWindow() {
  const { submitEmailToShare, activeMatter } = useContext(MattersContext);
  const [email, setEmail] = useState("");
  const handleClick = () => {
    if (isEmailValid(email) === false) {
      alert("Podane wyrażenie nie jest adresem email!");
    } else {
      submitEmailToShare(email);
    }
  };
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };

  return activeMatter.id === 0 ? (
    <div></div>
  ) : (
    <div className="share-window-div">
      <h5 className="cat-title" style={{ marginTop: "5px" }}>
        Share
      </h5>

      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        color="secondary"
        onChange={handleChange}
        sx={{ width: "230px" }}
      />
      <button className="share-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}
