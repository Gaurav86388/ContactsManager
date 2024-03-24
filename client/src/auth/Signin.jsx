import React, { useState, memo } from "react";
import "./Signin.css";
import eyeimage from "/eyecancel.svg";
import { useNavigate } from "react-router-dom";

const Signin = memo(function Signin({ handleSignUpToggle, setSigninSuccess }) {
 
  const [userNotFound, setNotUserFound] = useState(false);
  const [passwordInCorrect, setPasswordInCorrect] = useState(false);
  const [onEyeClick, setOnEyeClick] = useState(false)

  const navigate = useNavigate();
  const [signinDetails, setSigninDetails] = useState({
    mailID: "",
    password: "",
  });

  function handleOnChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "mailID") {
      setNotUserFound(false);
    } else if (name === "password") {
      setPasswordInCorrect(false);
    }
    setSigninDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSignin(e) {
    e.preventDefault();

    fetch("https://contactsmanager-4ml8.onrender.com/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(signinDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "validated") {
          const token = data.token;

          localStorage.setItem("jwt", token);

          setSigninSuccess(true);

          setTimeout(() => {
            navigate("/access");
          }, 1000);
        } else if (data.message === "Not Found") {
          setNotUserFound(true);
        } else if (data.message === "Invalid password") {
          setPasswordInCorrect(true);
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="signin">
      <h5 className="signin-message">
        Enter your credentials to access your account
      </h5>

      <form onSubmit={handleSignin} className="signin-form">
        <input
          type="text"
          required
          placeholder="User ID"
          id="signin-userid"
          name="mailID"
          onChange={handleOnChange}
        />
        <p
          className={
            userNotFound ? "error-message-active" : "error-message-inactive"
          }
        >
          Please enter a valid mail ID
        </p>

        <input
          type={onEyeClick ? "text": "password"}
          required
          placeholder="Password"
          id="signin-password"
          name="password"
          onChange={handleOnChange}
        />
        <div className="hide-eye" onMouseDown={()=>setOnEyeClick(true)} onMouseUp={()=>setOnEyeClick(false)}>
          <img src={eyeimage} alt="dont look image" />
        </div>

        <p
          className={
            passwordInCorrect
              ? "error-message-active"
              : "error-message-inactive"
          }
        >
          Please enter a valid password
        </p>

        <input type="submit" value="Sign In" id="signin-signin-btn" />

        <input
          type="button"
          value="Sign Up"
          onClick={handleSignUpToggle}
          id="signin-signup-btn"
        />
      </form>
    </div>
  );
});

export default Signin;
