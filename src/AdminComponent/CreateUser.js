/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { AdminNavbar } from "./AdminNavbar";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import swal from "sweetalert";

export const CreateUser = () => {
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  console.log({
    userCode,
    userPassword,
    userEmail,
    userMobile,
    userAddress,
    userRole,
  });

  /////////////////create user api call
  const createUserApi = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/user-details/save", {
        userCode: userCode,
        userName: userName,
        password: userPassword,
        email: userEmail,
        mobile: userMobile,
        address: userAddress,
        role: userRole,
      })
      .then((result) => {
        console.log(result);
        if (result.data == "User Record Saved Successfully") {
          swal({
            text: userCode,
            title: " Saved Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///////////////////////////edit user api////////////////
  const editUserApi = (e) => {
    e.preventDefault();
    let id = e.target[0].value;
    let userName = e.target[1].value;
    let userCode = e.target[2].value;
    let password = e.target[3].value;
    let email = e.target[4].value;
    let mobile = e.target[5].value;
    let address = e.target[6].value;
    let role = e.target[7].value;

    console.log({
      id,
      userName,
      userCode,
      password,
      email,
      mobile,
      address,
      role,
    });
    axios
      .post("http://localhost:8081/user-details/save", {
        id,
        userName,
        userCode,
        password,
        email,
        mobile,
        address,
        role,
      })
      .then((result) => {
        console.log(result);
        if (result.data == "User Record Saved Successfully") {
          swal({
            title: "Edit User Saved Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /////////////////////////////// jquery for pagination,searching,sorting
  $(function () {
    $("#create_user").DataTable();
  });

  /////////////delete user api call
  function deleteUser(id) {
    axios
      .get(`http://localhost:8081/user-details/delete/ ${id}`)
      .then((res) => {
        console.log(res);
        if (res.data == "User record deleted") {
          swal({
            title: " User Deleted Successfully!!!",
            button: "ok",
          }).then(function () {
            window.location = "http://localhost:3000/createuser";
          });
        }
      })
      .catch((err) => console.log(err));
  }

  ///////////////////////////////////////////////
  const [create, setCreate] = useState(false);

  const handleClose = () => setCreate(false);
  const handleShow = () => setCreate(true);

  const [edit, setEdit] = useState(false);

  const handClose = () => setEdit(false);
  const [selectedData, setSelectedData] = useState({});

  const handShow = (selectedRec) => {
    setSelectedData(selectedRec);
    setEdit(true);
  };

  //for validation

  const [userNameErr, setUserNameErr] = useState();
  const [userCodeErr, setUserCodeErr] = useState();
  const [passwordErr, setPasswordErr] = useState();
  const [emailErr, setEmailErr] = useState();
  const [mobileErr, setMobileErr] = useState();
  const [addressErr, setAddressErr] = useState();

  // for username validation
  const userNameHandler = (e) => {
    setUserName(e.target.value);
    const validUserName = /^[A-Za-z ]+$/;

    if (validUserName.test(userName)) {
      setUserNameErr(false);
    } else {
      setUserNameErr(true);
    }
  };

  // usercode validation
  const userCodeHandler = (e) => {
    setUserCode(e.target.value);

    axios
      .get("http://localhost:8081/checkDupilcateUserCode", {
        params: {
          userCode: e.target.value,
        },
      })
      .then((response) => {
        if (response.data === "userCode exist") {
          swal({
            title: "Exist UserCode",
            button: "ok",
            icon: "warning",
            dangerMode: true,
          });
          setUserCode("");
        }
      });

    const validUserCode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validUserCode.test(userCode)) {
      setUserCodeErr(false);
    } else {
      setUserCodeErr(true);
    }
  };

  // password validation
  const passwordHandler = (e) => {
    setUserPassword(e.target.value);
    const validPassword =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (validPassword.test(userPassword)) {
      setPasswordErr(false);
    } else {
      setPasswordErr(true);
    }
  };

  // Email validation
  const emailHandler = (e) => {
    setUserEmail(e.target.value);
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (validEmail.test(userEmail)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

  // Mobile validation
  const mobileHandler = (e) => {
    setUserMobile(e.target.value);
    const validMobile = /[6789][0-9]{8}$/;

    if (validMobile.test(userMobile)) {
      setMobileErr(false);
    } else {
      setMobileErr(true);
    }
  };

  // adresss validation

  const addressHandler = (e) => {
    setUserAddress(e.target.value);
    const validAddress = /^$/;

    if (validAddress.test(userAddress)) {
      setAddressErr(true);
    } else {
      setAddressErr(false);
    }
  };

  // Role validation

  const roleHandler = (e) => {
    setUserRole(e.target.value);
  };

  ////////////////////////////////////////////////////

  // get api for user table

  const [user, setUser] = useState([]);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/user-details/showAll")
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoadData(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = user.map((x) => {
    return (
      <tr key={x.id}>
        {/* <td>{x.id}</td> */}
        <td>{x.userCode}</td>
        <td>{x.userName}</td>
        <td>{x.password}</td>
        <td>{x.email}</td>
        <td>{x.mobile}</td>
        <td>{x.address}</td>
        <td>{x.role}</td>
        <td>
          <button className="User_edit_button" onClick={() => handShow(x)}>
            Edit
          </button>

          <button className="User_del_button" onClick={() => deleteUser(x.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <AdminNavbar />

      <h1 className="create_user_header">User Details</h1>

      <div className="admin_create_user_button">
        <Button variant="success" onClick={handleShow}>
          Create User
        </Button>
      </div>

      <div className="user_table">
        {loadData && (
          <Table id="create_user" striped bordered hover variant="dark">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th style={{ textAlign: "center" }}>User Code</th>
                <th style={{ textAlign: "center" }}>User Name</th>
                <th style={{ textAlign: "center" }}>Password</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Mobile</th>
                <th style={{ textAlign: "center" }}>Address</th>
                <th style={{ textAlign: "center" }}>Role</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>{arr}</tbody>
          </Table>
        )}

        {/* modal popup for create user */}

        <Modal
          show={create}
          onHide={handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form
              onSubmit={(e) => createUserApi(e)}
              className="create_user_form"
            >
              <label className="User_form_label">User Name</label>
              <br></br>
              <input
                value={userName}
                type="text"
                className=""
                required
                autoFocus
                onChange={userNameHandler}
              />{" "}
              <br></br>
              {userNameErr ? (
                <spa style={{ color: "red" }}>*Only alphabets</spa>
              ) : null}
              <br></br>
              <label className="User_form_label">User Code</label>
              <br></br>
              <input
                value={userCode}
                type="text"
                className=""
                required
                onChange={userCodeHandler}
              />{" "}
              <br></br>
              {userCodeErr ? (
                <spa style={{ color: "red" }}>*Only email format</spa>
              ) : null}
              <br></br>
              <label className="User_form_label_password">Password</label>
              <br></br>
              <input
                value={userPassword}
                type="text"
                className=""
                required
                onChange={passwordHandler}
              />{" "}
              <br></br>
              {passwordErr ? (
                <spa style={{ color: "red" }}>
                  *Use upper,lower,special and numeric characters
                </spa>
              ) : null}
              <br></br>
              <label className="User_form_label_email">Email</label>
              <br></br>
              <input
                value={userEmail}
                type="text"
                className=""
                required
                onChange={emailHandler}
              />{" "}
              <br></br>
              {emailErr ? (
                <spa style={{ color: "red" }}>*only email format</spa>
              ) : null}
              <br></br>
              <label className="User_form_label_mobile">Mobile</label>
              <br></br>
              <input
                value={userMobile}
                type="text"
                className=""
                required
                onChange={mobileHandler}
              />
              <br></br>
              {mobileErr ? (
                <spa style={{ color: "red" }}>
                  *only 10 digits number format
                </spa>
              ) : null}
              <br></br>
              <label className="User_form_label_address">Address</label>
              <br></br>
              <input
                value={userAddress}
                type="text"
                className=""
                required
                onChange={addressHandler}
              />
              <br></br>
              {addressErr ? (
                <spa style={{ color: "red" }}>*Must not Empty</spa>
              ) : null}
              <br></br>
              <label className="role_name">Role</label>
              <br></br>
              <select
                value={userRole}
                className="role_select"
                required
                onChange={roleHandler}
              >
                <option>---Select role---</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <br></br>
              <br></br>
              <input type="submit" value="Create User" />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* end of create form */}

        {/***************modal popup for edit*************/}

        <Modal
          show={edit}
          onHide={handClose}
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form
              onSubmit={(e) => {
                editUserApi(e);
              }}
              className="create_user_form"
            >
              <input
                type="hidden"
                className=""
                defaultValue={selectedData.id}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_name">User Name</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.userName}
                required
                readOnly
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_code">User Code</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.userCode}
                required
                readOnly
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_password">Password</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.password}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_email">Email</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.email}
                readOnly
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_mobile">Mobile</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.mobile}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_address">Address</label>
              <br></br>
              <input
                type="text"
                className=""
                defaultValue={selectedData.address}
                required
              />{" "}
              <br></br>
              <br></br>
              <label className="edit_role">Role</label>
              <br></br>
              <input
                type="text"
                defaultValue={selectedData.role}
                required
                readOnly
              />{" "}
              <br></br>
              <br></br>
              <input
                type="submit"
                value="Submit"
                variant="primary"
                className="edit_submit"
              />
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
