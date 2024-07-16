import { useState } from "react";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch } from "../hooks";
import { setSnack } from "../features/token/snackSlice";
import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";

const Base = import.meta.env.VITE_BASE_URL
export default function SignUp(props: { messageText: string; RoleName: string; title: string }) {
  const [upstate, setUpState] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    emailid: "",
  });

  const [role, setRole] = useState(props.RoleName);
  const [age, setAge] = useState<number | string>("");
  const dispatch = useAppDispatch();

  const fieldNames = [
    { name: "username", value: upstate.username },
    { name: "firstname", value: upstate.firstname },
    { name: "lastname", value: upstate.lastname },
    { name: "emailid", value: upstate.emailid },
    { name: "password", value: upstate.password },
  ];

  function handleChange(event: any): void {
    const { name, value } = event.target;
    if (name === "age") {
      setAge(value);
    } else if (name === "role") {
      setRole(value as string);
    } else {
      setUpState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleClick(event: any): void {
    event.preventDefault();
    axios
      .post(`${Base}auth/signup`, {
        username: upstate.username,
        firstname: upstate.firstname,
        lastname: upstate.lastname,
        emailid: upstate.emailid,
        role: role,
        password: upstate.password,
        age: age,
      })
      .then((res) => {
        dispatch(setSnack({ message: `${props.messageText} Successful`, severity: "success" }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSnack({ message: `${props.messageText} Failed`, severity: "error" }));
      });
  }

  return (
    <div className="Page">
      <div className="card">
        <header>
          <h1>{props.title}</h1> {/* Correct usage of title prop */}
        </header>
        <div>
          <form onSubmit={handleClick}>
            {fieldNames.map((field, index) => (
              <TextField
                required
                style={{ display: "block" }}
                key={index}
                name={field.name}
                placeholder={field.name}
                value={field.value}
                margin="dense"
                onChange={handleChange}
              />
            ))}
            <Input
              type="number"
              aria-label="Demo input"
              placeholder="age"
              name="age"
              value={age}
              onChange={handleChange}
            />
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                name="role" // Added name attribute
                value={role}
                onChange={handleChange}
                label="Role"
              >
                <MenuItem value={props.RoleName}>{props.RoleName}</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
