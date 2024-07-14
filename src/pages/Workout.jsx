import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Modal, Container, Table } from "react-bootstrap";
import "animate.css";
import UserContext from "../UserContext";
import EditWorkout from "../components/EditWorkout";
import Swal from "sweetalert2";

const Workout = () => {
  // for the authentication
  const { user } = useContext(UserContext);

  // for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  Add Workout
  const [name, setWorkoutName] = useState("");
  const [duration, setWorkoutDuration] = useState("");
  const [status, setWorkoutStatus] = useState("Pending");

  // for the modal (edit workout)
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  //   for edit ID
  const [editWorkoutId, setEditWorkoutId] = useState(null);

  //   for Fetching the data in the table
  const [showWorkouts, setShowWorkouts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user) {
      fetch(
        `https://fitness-tracker-using-api.onrender.com/workouts/getMyWorkOuts?userId=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.workouts) {
            console.log(data);
            setShowWorkouts(data.workouts);
          } else {
            setShowWorkouts([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching workouts:", error);
        });
    }
  }, [user]);

  // adding function
  const handleAddWorkout = () => {
    const token = localStorage.getItem("token");

    fetch(
      "https://fitness-tracker-using-api.onrender.com/workouts/addWorkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          duration,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        if (data.success) {
          setShowWorkouts([...showWorkouts, data.workout]);
          setWorkoutName("");
          setWorkoutDuration("");
          handleCloseEditModal();
          Swal.fire({
            title: "Workout Added Successfully",
            icon: "success",
          });
        } else {
          handleCloseEditModal();
          Swal.fire({
            icon: "success",
            title: "Workout Added Successfully",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error adding workout:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Add Workout",
          text: "An error occurred while adding the workout.",
        });
      });
  };

  // Delete function
  const handleDeleteWorkout = (workoutId) => {
    const token = localStorage.getItem("token");

    fetch(
      `https://fitness-tracker-using-api.onrender.com/workouts/deleteWorkout/${workoutId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.table(data);
        if (data.success) {
          setShowWorkouts(
            showWorkouts.filter((workout) => workout._id !== workoutId)
          );
          Swal.fire({
            title: "Workout Deleted Successfully",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Workout Deleted Successfully",
            icon: "success",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error deleting workout:", error);
        Swal.fire({
          icon: "error",
          title: "Failed to Delete Workout",
          text: "An error occurred while deleting the workout.",
        });
      });
  };

  return (
    <>
      <Container>
        <h1 className="display-1 text-center mt-5 animate__animated animate__fadeInDown">
          Workout
        </h1>
        <Button variant="primary" onClick={handleShow} size="lg">
          Add Workout
        </Button>

        {/* for add modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Workout</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="workoutName">
                <Form.Label>Workout Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter workout name"
                  value={name}
                  onChange={(e) => setWorkoutName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="workoutDuration">
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setWorkoutDuration(e.target.value)}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="workoutStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setWorkoutStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddWorkout}>
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
              {showWorkouts.length > 0 ? (
                showWorkouts.map((workout, index) => (
                  <tr key={workout._id}>
                    {/* <td>{index + 1}</td> */}
                    <td>{workout._id}</td>
                    <td>{workout.userId}</td>
                    <td>{workout.name}</td>
                    <td>{workout.duration}</td>
                    <td>{workout.status}</td>
                    <td>{new Date(workout.dateAdded).toLocaleDateString()}</td>
                    <td>
                      {/* <Button
                        variant="warning"
                        size="sm"
                        onClick={() => openEditModal(workout.id)}
                      >
                        Edit
                      </Button> */}
                      <EditWorkout workoutId={workout._id} />
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteWorkout(workout._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No workouts found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};

export default Workout;
