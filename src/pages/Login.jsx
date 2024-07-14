import React from "react";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  function login(event) {
    event.preventDefault();

    fetch(`https://fitness-tracker-using-api.onrender.com/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);
          if (data.user && data.user.firstName) {
            Swal.fire({
              title: "Login Successful",
              icon: "success",
              text: `Welcome ${data.user.firstName}`,
              timer: 1000,
              showConfirmButton: true,
            }).then(() => {
              setTimeout(() => {
                // window.location.reload();
              }, 1000);
            });
          } else {
            Swal.fire({
              title: "Login Successful",
              icon: "success",
              text: `Welcome`,
              timer: 1000,
              showConfirmButton: true,
            }).then(() => {
              setTimeout(() => {
                // window.location.reload();
              }, 1000);
            });
          }
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
        }
      });
    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`https://fitness-tracker-using-api.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.user?._id || null,
        });
        // window.location.reload();
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/workout" />
  ) : (
    <Container>
      <h1 className="display-1 text-center mt-5 mb-5">Login</h1>
      <Row>
        <Col className="justify-content-center align-items-center">
          <Card>
            <Card.Body>
              <Form onSubmit={(e) => login(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
