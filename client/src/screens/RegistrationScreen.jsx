import React from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";


function RegistrationScreen() {
    const [credentials, setCredentials] = React.useState({
        username: "",
        name: "",
        lastname: "",
        email: "",
        password: ""
    });

    function handleChanges(event){
        const { name, value } = event.target;
        setCredentials(prevNote => {
            return {
              ...prevNote,
              [name]: value
            };
          });
    };

    function submitCredentials(event){
        event.preventDefault();
        try {
            const body = { credentials };
            console.log(body);
            fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(resData => resData.json())
            .then(data => {
                window.location.replace(data.direction);
                alert(data.message);
            }) 
        } catch (error) {
            console.log(error.message);
        }
    }

    document.body.style = "background-color: #3C5186"
    const size = {m: 1, width: 220};
    return (
        <form onSubmit={submitCredentials}>
        <div className="login-div">

            <TextField
                label="Username"
                name="username"
                value={credentials.username}
                type="text"
                color="secondary"
                margin="normal"
                onChange={handleChanges}
                sx={size}
            />
            <TextField
                label="Name"
                name="name"
                value={credentials.name}
                type="text"
                color="secondary"
                margin="normal"
                onChange={handleChanges}
                sx={size}
            />
            <TextField
                label="Last Name"
                name="lastname"
                value={credentials.lastname}
                type="text"
                color="secondary"
                margin="normal"
                onChange={handleChanges}
                sx={size}
            />
            <TextField
                label="Email address"
                name="email"
                value={credentials.email}
                type="email"
                color="secondary"
                margin="normal"
                onChange={handleChanges}
                sx={size}
            />
            <TextField
                label="Password"
                name="password"
                value={credentials.password}
                type="password"
                color="secondary"
                margin="normal"
                onChange={handleChanges}
                sx={size}
            />
            <Button variant="contained" color="secondary" type="submit" sx={size}>Sign Up</Button>
            <Button variant="contained" color="secondary" href="/login" sx={size}>...or Log in</Button>

        </div>
        </form>
    );
}

export default RegistrationScreen;