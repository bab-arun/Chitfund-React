/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [userCode, setUserCode] = useState();
  const [password, setPassword] = useState();

  const [userCodeErr, setUserCodeErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  // user code validation
  const userCodeHandler = (e) => {
    setUserCode(e.target.value);

    ///

    sessionStorage.setItem("userCode", e.target.value);

    ////

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmail.test(e.target.value)) {
      setUserCodeErr(false);
    } else {
      setUserCodeErr(true);
    }
  };

  const userCodeHider = () => {
    setUserCodeErr(false);
  };

  // password validation
  const passwordHandler = (e) => {
    setPassword(e.target.value);

    const validPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (validPassword.test(e.target.value)) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
  };

  const passwordHider = () => {
    setPasswordErr(false);
  };

  const [validData, setValidData] = useState();
  const navigate = useNavigate();
  const passwordValidation = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/usercode-password/check", {
        userCode: userCode,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setValidData(response.data);

        const admin = "admin";
        const user = "user";
        const invalidUser = "Invalid Password";

        if (validData === admin) {
          return navigate("/adminhomepage");
        } else if (validData === user) {
          return navigate("/userhomepage");
        } else if (validData === invalidUser) {
          swal({
            title: "ENTER THE VALID USER CREDENTIALS",
            button: "ok",
            icon: "warning",
            dangerMode: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
          marginTop: "154px",
          marginLeft: "550px",
        }}
      >
        <h1 style={{ marginRight: "900px" }}>Chitfund</h1>
        <form onSubmit={(e) => passwordValidation(e)}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "300px" }}
            onBlur={(e) => userCodeHandler(e)}
            onFocus={userCodeHider}
            required
          />

          <br></br>
          {userCodeErr ? (
            <spa style={{ color: "red" }}>*Invalid UserCode</spa>
          ) : null}
          <br></br>
          <br></br>

          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            style={{ width: "300px" }}
            onBlur={(e) => passwordHandler(e)}
            onFocus={passwordHider}
            required
          />
          <br></br>

          {passwordErr ? (
            <spa style={{ color: "red" }}>*Invalid Password</spa>
          ) : null}

          <br></br>
          <br></br>

          <input
            type="submit"
            value="Login"
            style={{
              marginTop: "2px",
              marginLeft: "74px",
              width: "140px",
              height: "34px",
              backgroundColor: "#3333ff",
              borderRadius: "4px",
              color: "white",
              fontWeight: "bold",
              border: "none",
            }}
          />
        </form>
      </div>
    </>
  );
};
