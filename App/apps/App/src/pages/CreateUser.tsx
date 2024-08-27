import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppDispatch } from "../hooks";
import { setSnack } from "../features/token/snackSlice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {CreatUserForm} from '../helpers/types'
import APIService from "../services/api.service";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import React from "react";
import calculateAge from "../helpers/ageCalculator";

export default function SignUp(props: { messageText: string; RoleName: string; title: string }) {
  const [upstate, setUpState] = useState<CreatUserForm>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    emailid: "",
  });
  const [value, setValue] = React.useState<Dayjs| null>(dayjs('2022-04-17'));
  const [role, setRole] = useState<string>(props.RoleName);
  const dispatch = useAppDispatch();

  const fieldNames: { name: string; value: string;}[]  = [
    { name: "username", value: upstate.username},
    { name: "firstname", value: upstate.firstname},
    { name: "lastname", value: upstate.lastname},
    { name: "emailid", value: upstate.emailid},
    { name: "password", value: upstate.password},
];

  function handleChange(event: { target: { name: string; value: string; }; }): void {
    const { name, value } = event.target;
  if (name === "role") {
      setRole(value as string);
    } else {
      console.log(value)
      setUpState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function handleClick(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    const age = value? calculateAge(value.toString()) :null
    console.log(age)
    const apiService:APIService = new APIService()
    apiService.post(`auth/signup`,{ username: upstate.username, firstname: upstate.firstname, lastname: upstate.lastname, emailid: upstate.emailid, role: role, password: upstate.password, age: age})
      .then(() => {
        dispatch(setSnack({ message: `${props.messageText} Successful`, severity: "success" }));
      })
      .catch(() => {
        dispatch(setSnack({ message: `${props.messageText} Failed`, severity: "error" }));
      });
  }

  return (
    <div className="Page">
      <div className="create-user-form">
        <header>
          <h1>{props.title}</h1>
        </header>
        <div>
          <form onSubmit={handleClick}>
            {fieldNames.map((field, index) => (
              <TextField required style={{ display: "block" }} key={index} name={field.name} placeholder={field.name} value={field.value} margin="dense" onChange={handleChange}/>
            ))}
              <div style={{margin:"10px 0"}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker sx={{width:"100%", maxWidth:"14.5rem"}} label="Date of Birth" value={value} onChange={(newValue) => setValue(newValue)}/>
            </LocalizationProvider>
              </div>
            <FormControl>
              <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
              <Select sx={{width:'100%', maxWidth:"14.5rem"}}  name="role" value={role} onChange={handleChange} label="Role">
                <MenuItem  value={props.RoleName}>{props.RoleName}</MenuItem>
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
