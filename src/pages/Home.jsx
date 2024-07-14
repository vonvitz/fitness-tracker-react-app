import React from "react";
import Container from "react-bootstrap/Container";
import "animate.css";

const Home = () => {
  return (
    <>
      <Container>
        <div className="d-flex vh-100 align-items-center justify-content-center flex-column text-center">
          <h1 className="display-1 animate__animated animate__bounceInDown">
            Welcome Fitness Tracker App
          </h1>
          <p className="lead animate__animated animate__bounceInDown mt-2">
            Welcome to our Fitness Tracker App! Whether you're a seasoned
            athlete or just starting your fitness journey, our app is designed
            to help you achieve your health and fitness goals effectively. Track
            your workouts, monitor your progress, and stay motivated with
            personalized insights and achievements. With intuitive features and
            user-friendly interface, managing your fitness routine has never
            been easier. Start your journey towards a healthier lifestyle today
            with our Fitness Tracker App!
          </p>
        </div>
      </Container>
    </>
  );
};

export default Home;
