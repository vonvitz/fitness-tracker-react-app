import { Button, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";

const EditWorkout = ({ workoutId }) => {
  //  Data Workout
  const [name, setWorkoutName] = useState("");
  const [duration, setWorkoutDuration] = useState("");
  const [status, setWorkoutStatus] = useState("Pending");

  // for the modal (edit workout)
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setWorkoutDuration("");
    setWorkoutName("");
    setWorkoutStatus("Pending");
  };
  //   const handleShowEditModal = () => ;

  //   for edit ID
  const [editWorkoutId, setEditWorkoutId] = useState(null);

  const handleEditWorkout = () => {
    const token = localStorage.getItem("token");

    fetch(
      `https://fitness-tracker-using-api.onrender.com/workouts/updateWorkout/${editWorkoutId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          duration,
          status,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Workout updated successfully") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Workout Successfully Updated",
          }).then(() => {
            window.location.reload();
          });
          handleCloseEditModal();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please Try Again!",
          });
          console.error("Error editing workout:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error editing workout:", error);
      });
  };

  const openEditModal = (workoutId) => {
    const token = localStorage.getItem("token");

    fetch(
      `https://fitness-tracker-using-api.onrender.com/workouts/getWorkOutByUser/${workoutId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.workouts) {
          setEditWorkoutId(workoutId);
          setWorkoutName(data.workouts.name);
          setWorkoutDuration(data.workouts.duration);
          setWorkoutStatus(data.workouts.status);
          setShowEditModal(true);
        } else {
          console.error("Error fetching workout:", data.error);
        }
      });
  };
  return (
    <>
      <Button
        variant="warning"
        size="sm"
        onClick={() => openEditModal(workoutId)}
      >
        Edit
      </Button>

      {/* Edit Workout Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="editWorkoutName">
              <Form.Label>Workout Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter workout name"
                value={name}
                onChange={(e) => setWorkoutName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editWorkoutDuration">
              <Form.Label>Duration (minutes)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editWorkoutStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setWorkoutStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditWorkout}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditWorkout;
