import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Container, Table } from "react-bootstrap";
import "animate.css";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext";

const Workout = () => {
  // for the authentication
  const { user } = useContext(UserContext);

  // for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showWorkouts, setShowWorkouts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/workouts/getMyWorkOuts`)
      .then((res) => res.json())
      .then((data) => {
        setShowWorkouts(data.workouts);
      });
  }, []);

  return (
    <>
      <Container>
        <h1 className="display-1 text-center mt-5 animate__animated animate__fadeInDown">
          Workout
        </h1>
        <Button variant="primary" onClick={handleShow} size="lg">
          Add Workout
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ============================================================================ */}
        {/*                                    TABLE                                     */}
        {/* ============================================================================  */}
        <div className="mt-3 ">
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Date Added</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Workout;
