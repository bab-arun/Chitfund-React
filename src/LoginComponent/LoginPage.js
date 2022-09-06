/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from "react";
import "../CssComponent/component.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { UserContext } from "../App";

export const LoginPage = () => {
  const userContext = useContext(UserContext);

  const [userCodeErr, setUserCodeErr] = useState();
  const [passwordErr, setPasswordErr] = useState();

  const [userCode, setUserCode] = useState();
  const [password, setPassword] = useState();

  console.log({ userCode, password });

  // user code validation
  const userCodeHandler = (e) => {
    setUserCode(e.target.value);

    ///

    sessionStorage.setItem("userCode", e.target.value);

    ////

    userContext.dispatch(e.target.value); // reducer

    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmail.test(e.target.value)) {
      setUserCodeErr(false);
    } else {
      setUserCodeErr(true);
    }
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

  const userCodeHider = () => {
    setUserCodeErr(false);
  };

  const passwordHider = () => {
    setPasswordErr(false);
  };

  ////////////////////submit call api validate password
  const [validData, setValidData] = useState();
  const navigate = useNavigate();
  const passwordValidation = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/usercode-password/check", {
        userCode: e.target[0].value,
        password: e.target[1].value,
      })
      .then((response) => {
        console.log(response.data);
        setValidData(response.data);

        console.log(validData);
        //console.log(validData.role);
        const admin = "admin";
        const user = "user";

        if (validData === admin) {
          return navigate("/adminhomepage");
        } else if (validData === user) {
          return navigate("/userhomepage");
        } else {
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

  /////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="overall_box">
        <div className="userform">
          <form onSubmit={(e) => passwordValidation(e)}>
            <h1 className="userlogin_header">WELCOME TO CHIT SCHEME</h1>

            <div className="usercredential">
              <label>Email</label>
              <br></br>
              <input
                type="text"
                placeholder="Enter Email"
                className="UserLogin_textbox"
                required
                autoFocus
                onBlur={(e) => userCodeHandler(e)}
                onFocus={userCodeHider}
              />
              {userCodeErr ? (
                <spa style={{ color: "red" }}>*Invalid UserCode</spa>
              ) : null}
              <br></br>
              <br></br>
              <label>Password</label> <br></br>
              <input
                type="password"
                placeholder="Enter Password"
                className="UserLogin_textbox"
                required
                onBlur={(e) => passwordHandler(e)}
                onFocus={passwordHider}
              />
              {passwordErr ? (
                <spa style={{ color: "red" }}>*Invalid Password</spa>
              ) : null}
              <br></br>
              <br></br>
              <input type="submit" value="Submit" className="Login_submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
