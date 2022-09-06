/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import "../CssComponent/component.css";
import { AdminNavbar } from "./AdminNavbar";
import axios from "axios";
import swal from "sweetalert";
import $ from "jquery";

export const CreateScheme = () => {
  ///////////create scheme api call
  const [schemeName, setSchemeName] = useState("");
  const [schemeAmount, setSchemeAmount] = useState("");
  const [numberOfUser, setNumberOfUser] = useState("");
  const [payAmount, setPayAmount] = useState("");

  let [schemeDuration, setSchemeDuration] = useState("");
  const [startDate, setStartDate] = useState("");

  const [predictEndDate, setPredictEndDate] = useState("");

  const createSchemeApi = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/addSchemeDetails/save", {
        schemeName: schemeName,
        schemeAmount: schemeAmount,
        numberOfUser: numberOfUser,
        payAmount: payAmount,
        schemeDuration: schemeDuration,
        startDate: startDate,
        endDate: predictEndDate,
      })
      .then((result) => {
        console.log(result);
        if ((result.data = "Scheme inserted successfully")) {
          swal({
            title: "Scheme Created Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/adminhomepage";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///////////////////////////validation///////////////////////////////////////
  const [schemeNameErr, setSchemeNameErr] = useState();
  const [schemeAmountErr, setSchemeAmountErr] = useState();
  const [schemeUsersErr, setSchemeUsersErr] = useState();
  const [schemePayErr, setSchemePayErr] = useState();
  const [durationErr, setDurationErr] = useState();
  //scheme name valid
  const schemeNameHandler = (e) => {
    setSchemeName(e.target.value);
    const validSchemeName = /^[A-Za-z ]+$/;

    if (validSchemeName.test(schemeName)) {
      setSchemeNameErr(false);
    } else {
      setSchemeNameErr(true);
    }
  };

  const schemeNameHider = () => {
    setSchemeNameErr(false);
  };

  //scheme amount valid

  const schemeAmountHandler = (e) => {
    setSchemeAmount(e.target.value);
    const validSchemeAmount = /^[0-9]+$/;

    if (validSchemeAmount.test(schemeAmount)) {
      setSchemeAmountErr(false);
    } else {
      setSchemeAmountErr(true);
    }
  };

  const schemeAmountHider = () => {
    setSchemeAmountErr(false);
  };

  //scheme num of users validation

  const schemeUsersHandler = (e) => {
    setNumberOfUser(e.target.value);
    const validSchemeUser = /^[0-9]+$/;

    if (validSchemeUser.test(numberOfUser)) {
      setSchemeUsersErr(false);
    } else {
      setSchemeUsersErr(true);
    }
  };

  const schemeUsersHider = () => {
    setSchemeUsersErr(false);
  };

  // scheme amount validation
  const schemePayHandler = (e) => {
    setPayAmount(e.target.value);
    const validSchemePay = /^[0-9]+$/;

    if (validSchemePay.test(payAmount)) {
      setSchemePayErr(false);
    } else {
      setSchemePayErr(true);
    }
  };

  const schemePayHider = () => {
    setSchemePayErr(false);
  };

  ///////scheme duration handler

  const durationHandler = (e) => {
    setSchemeDuration(e.target.value);
    const validDuration = /^[0-9]+/;
    if (validDuration.test(schemeDuration)) {
      setDurationErr(false);
    } else {
      setDurationErr(true);
    }
    setStartDate("");
  };

  ///////////scheme start date

  const startDateHandler = (e) => {
    let date = new Date(e.target.value);
    console.log(date);
    setStartDate(e.target.value);

    var duration = schemeDuration;
    var monthValue = 12;

    var year = Math.floor(duration / monthValue);
    var month = duration % monthValue;

    if (year > 0) {
      let newYear = date.getFullYear() + year;
      date.setFullYear(newYear);
    }
    if (month > 0) {
      let newMonth = date.getMonth() + month;
      date.setMonth(newMonth);
    }
    date = new Date(date).toISOString().slice(0, 10);
    setPredictEndDate(date);
  };

  //////////////////////////

  $(function () {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var minDate = year + "-" + month + "-" + day;

    $("#hidePastDate").attr("min", minDate);
  });
  //////////////////////////

  return (
    <>
      <AdminNavbar />

      <div className="Create_scheme_box">
        <form onSubmit={(e) => createSchemeApi(e)}>
          <h1 className="create_chit_scheme">CREATE CHIT SCHEME</h1>

          <div className="create_scheme_box">
            <div className="scheme_part_1">
              <label className="create_scheme_name">Scheme name</label>
              <br></br>
              <input
                type="text"
                className="create_scheme_name_input"
                autoFocus
                onBlur={schemeNameHandler}
                onFocus={schemeNameHider}
                required
              />
              <br></br>
              {schemeNameErr ? (
                <spa style={{ color: "red" }}>*Only alphabets</spa>
              ) : null}
              <br></br>
              <br></br>
              <label className="create_scheme_amount">Scheme amount</label>
              <br></br>
              <input
                type="text"
                className=""
                onBlur={schemeAmountHandler}
                onFocus={schemeAmountHider}
                required
              />{" "}
              <br></br>
              {schemeAmountErr ? (
                <spa style={{ color: "red" }}>*Only Numbers</spa>
              ) : null}
              <br></br>
              <br></br>
              <label className="create_scheme_user">Number of user</label>
              <br></br>
              <input
                type="text"
                className=""
                onBlur={schemeUsersHandler}
                onFocus={schemeUsersHider}
                required
              />{" "}
              <br></br>
              {schemeUsersErr ? (
                <spa style={{ color: "red" }}>*Only Numbers</spa>
              ) : null}
              <br></br>
              <br></br>
              <label className="create_scheme_pay">Pay amount</label>
              <br></br>
              <input
                type="text"
                className=""
                onBlur={schemePayHandler}
                onFocus={schemePayHider}
                required
              />
              <br></br>
              {schemePayErr ? (
                <spa style={{ color: "red" }}>*Only Numbers</spa>
              ) : null}
              <br></br>
              <br></br>
            </div>

            <div className="scheme_part_2">
              <br></br>

              <br></br>
              <br></br>
              <label className="create_scheme_duration">
                Scheme Duration (in months)
              </label>
              <br></br>

              <input
                type="text"
                className=""
                onChange={durationHandler}
                required
              />
              <br></br>
              {durationErr ? (
                <spa style={{ color: "red" }}>*Only Numbers</spa>
              ) : null}

              <br></br>
              <br></br>

              <div className="start_date">
                <label className="create_scheme_start_date">Start date</label>
                <br></br>
                <input
                  type="date"
                  className="scheme_date"
                  id="hidePastDate"
                  value={startDate}
                  onChange={startDateHandler}
                  required
                />{" "}
                <br></br>
                <br></br>
              </div>
              <div className="end_date">
                <label className="create_scheme_end_date">End date</label>{" "}
                <br></br>
                <input
                  type="date"
                  className="scheme_date"
                  value={predictEndDate}
                  disabled
                  required
                />
                <br></br>
              </div>
            </div>

            <input
              type="submit"
              className="create_button"
              value="Create Scheme"
            />
          </div>
        </form>
      </div>
    </>
  );
};
