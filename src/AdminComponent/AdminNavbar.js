import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export const AdminNavbar = () => {
  const logout = useNavigate();

  let userCode = sessionStorage.getItem("userCode");
  console.log(userCode);

  return (
    <>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Link
              to="/adminhomepage"
              style={{ color: "white", textDecoration: "none" }}
            >
              HOME
            </Link>
            <Nav className="me-auto">
              <Link
                to="/createuser"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Create User
              </Link>

              <Link
                to="/adminentry"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Admin Entry
              </Link>
              <Link
                to="/acceptpayment"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Accept Payment
              </Link>
              <Link
                to="/pendingpayment"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Pending Payment
              </Link>
              <Link
                to="/showprogress"
                style={{
                  marginLeft: "30px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Show Progress
              </Link>
            </Nav>

            <button className="admin_logout" onClick={() => logout("/")}>
              Logout
            </button>
            <div className="UserName">{userCode}</div>
          </Container>
        </Navbar>
      </div>
    </>
  );
};
