/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import swal from "sweetalert";
import { ChitSchemeContext } from "../App";
import { AdminNavbar } from "./AdminNavbar";
import { Link } from "react-router-dom";

// //Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";

import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

export const AdminHomepage = () => {
  const { setLinkSchemeName } = useContext(ChitSchemeContext);

  const [schemeDuration, setSchemeDuration] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  //edit modal popup////////////////////////////////////
  const handClose = () => setEdit(false);
  const [edit, setEdit] = useState(false);
  const [selectedData, setSelectedData] = useState("");

  // const [selectedLink, setSelectedLink] = useState("");
  const handShow = (selectedRec) => {
    setSelectedData(selectedRec);

    setSchemeDuration(selectedRec.schemeDuration);
    setStartDate(selectedRec.startDate);
    setEndDate(selectedRec.endDate);
    setEdit(true);
  };
  const assignLinkPopulate = (x) => {
    console.log(x.schemeName);
    setLinkSchemeName(x.schemeName);
    if (x.numberOfUser === x.schemeUserCount) {
      swal("User Count is Full", "You are unable to add user", "warning");
    } else {
      navigate("/assignscheme");
    }
  };

  const editSchemeApi = (e) => {
    e.preventDefault();
    let id = e.target[0].value;
    let schemeName = e.target[1].value;
    let schemeAmount = e.target[2].value;
    let numberOfUser = e.target[3].value;
    let payAmount = e.target[4].value;
    let schemeDuration = e.target[5].value;
    let startDate = e.target[6].value;
    let endDate = e.target[7].value;

    console.log({
      id,
      schemeName,
      schemeAmount,
      numberOfUser,
      payAmount,

      schemeDuration,
      startDate,
      endDate,
    });

    axios
      .post("http://localhost:8081/addSchemeDetails/save", {
        id,
        schemeName,
        schemeAmount,
        numberOfUser,
        payAmount,

        schemeDuration,
        startDate,
        endDate,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Scheme inserted successfully") {
          swal({
            title: "Edit Scheme Saved Successfully!!!",
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

  /////////////////////////////////////////////////////////

  // Delete Api for scheme table///////////////////////////////////

  const deleteScheme = (x) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, Assigned users are deleted with Scheme",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .get(`http://localhost:8081/scheme-details/delete/ ${x.id}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
        window.location = "http://localhost:3000/adminhomepage";
      }
    });
  };

  // get api for user table

  const [scheme, setScheme] = useState([]);
  const [val, setVal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/scheme-details/showAll")
      .then((res) => {
        console.log(res.data);
        setScheme(res.data);
        setVal(true);
      })
      .catch((err) => console.log(err));
  }, []);

  $(function () {
    $("#show_schemes").DataTable();
  });

  const arr = scheme.map((x, index) => {
    return (
      <tr key={index}>
        {/* <td>{x.id}</td> */}
        <td>{x.schemeName}</td>
        <td>{x.schemeAmount}</td>
        <td>{x.numberOfUser}</td>
        <td>
          <p>
            <a
              href
              title="Assign scheme page"
              onClick={() => assignLinkPopulate(x)}
              style={{ color: "yellow", textDecoration: "underline" }}
            >
              <b>{x.schemeUserCount}</b>
            </a>
          </p>
        </td>
        <td>{x.payAmount}</td>
        <td>{x.schemeDuration + " months"}</td>
        <td>{x.startDate}</td>
        <td>{x.endDate}</td>
        <td>
          <Link to={`/adminentry/${x.schemeName}/${x.payAmount}`}>
            Admin Entry
          </Link>
        </td>
        <td>
          <button className="User_edit_button" onClick={() => handShow(x)}>
            Edit
          </button>
          <button className="User_del_button" onClick={() => deleteScheme(x)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  ///////////////////date

  const durationHandler = (e) => {
    setSchemeDuration(e.target.value);
    setStartDate("");
  };

  const startDateHandler = (e) => {
    let date = new Date(e.target.value);
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

    date = new Date(date).toISOString().slice(0, 10); //change format yyyy-MM-dd

    setEndDate(date);
  };

  return (
    <>
      <AdminNavbar />
      <div>
        <h1 className="create_user_header">CHIT SCHEMES</h1>
        <div className="admin_create_scheme_button">
          <Button variant="success" onClick={() => navigate("/createscheme")}>
            Create Scheme
          </Button>
        </div>

        <div className="chit_scheme_home">
          {val && (
            <Table
              id="show_schemes"
              striped
              bordered
              hover
              variant="dark"
              className="edit_scheme_table"
            >
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th style={{ textAlign: "center" }}>Scheme Name</th>
                  <th style={{ textAlign: "center" }}>Scheme Amount</th>
                  <th style={{ textAlign: "center" }}>Number Of Users</th>
                  <th style={{ textAlign: "center" }}>User Count</th>
                  <th style={{ textAlign: "center" }}>Installment Amount</th>

                  <th style={{ textAlign: "center" }}>Scheme Duration</th>
                  <th style={{ textAlign: "center" }}>Start Date</th>
                  <th style={{ textAlign: "center" }}>End Date</th>
                  <th style={{ textAlign: "center" }}>Admin Entry</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>{arr}</tbody>
            </Table>
          )}
          {/************************ edit scheme **********************************/}
          <Modal
            show={edit}
            onHide={handClose}
            aria-labelledby="contained-modal-title-vcenter"
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Scheme</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <form
                onSubmit={(e) => {
                  editSchemeApi(e);
                }}
                className="create_user_form"
              >
                <input
                  type="hidden"
                  className=""
                  value={selectedData.id}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_scheme_name">Scheme Name</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.schemeName}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_scheme_amount">Scheme Amount</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.schemeAmount}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_number_of_user">Number Of Users</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.numberOfUser}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_installment_amount">
                  Installment Amount
                </label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={selectedData.payAmount}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_scheme_duration">Scheme Duration</label>
                <br></br>
                <input
                  type="text"
                  className=""
                  value={schemeDuration}
                  onChange={durationHandler}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_start_date">Start Date</label>
                <br></br>
                <input
                  type="date"
                  id="previousDateHider"
                  className="input_start_date"
                  value={startDate}
                  onChange={startDateHandler}
                  required
                />{" "}
                <br></br>
                <br></br>
                <label className="edit_end_date">End Date</label>
                <br></br>
                <input
                  type="date"
                  className="input_end_date"
                  value={endDate}
                  readOnly
                  required
                />{" "}
                <br></br>
                <br></br>
                <input type="submit" value="Submit" className="edit_submit" />
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* /////////////////////////////////////////////////////////////////////// */}
        </div>
      </div>
    </>
  );
};
