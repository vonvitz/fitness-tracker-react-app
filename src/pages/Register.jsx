import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Container, Card, Col } from "react-bootstrap";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    fetch("https://fitness-tracker-using-api.onrender.com/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // { "message": "User registered successfully" }

        if (data.message === "Registered SUccessfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");

          alert("Registration successful");
        } else if (data.message === "Invalid email format") {
          alert("Email Invalid");
        } else if (
          data.error === "Password must be atleast 8 characters long"
        ) {
          alert("Password must be at least 8 characters");
        } else {
          alert("Something went wrong.");
        }
      });
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, password]);

  return (
    <>
      <Container>
        <h1 className="text-center display-1 mt-5">Register</h1>
        <Card className="p-3 mt-5">
          <Form onSubmit={(e) => registerUser(e)}>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="d-grid gap-2">
              {isActive ? (
                <Button
                  className="mt-3"
                  variant="success"
                  size="lg"
                  type="submit"
                >
                  REGISTER
                </Button>
              ) : (
                <Button
                  className="mt-3"
                  variant="success"
                  size="lg"
                  type="submit"
                  disabled
                >
                  REGISTER
                </Button>
              )}
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Register;
