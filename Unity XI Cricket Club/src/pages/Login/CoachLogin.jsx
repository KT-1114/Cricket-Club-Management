import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import logo from "../../assets/logo.png";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import supabase from "../../connection";
import Footer from "../../components/Footer/Footer";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const CoachLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("coaches")
        .select("*")
        .eq("coach_name", username)
        .single();
        
        console.log(data);
      if (error) {
        alert("Please check your credentials");
      }

      if (!data) {
        alert("Please check your credentials");
      }

      if (data.password !== password) {
        setErrorAlert(true);
        throw new Error("Incorrect password");
      }

      setSuccessAlert(true);
      setTimeout(() => {
        navigate("/admincoach/" + data.coach_id);
      }, 2000);

    } catch (error) {
      setErrorAlert(true);
      console.error("Login error:", error.message);
    }
  };

  return (
    <div>
    <div className="pt-5 mt-5 mb-5">
      <Header curr={"Login"} />
      <div class="container-fluid login mt-5">
        <div class="row">
          <div class="container-fluid px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 d-flex align-items-center">
              <div class="col-lg-12">
                <h1 class="text-white text-center">Unity XI Coach Login </h1>
              </div>
            </div>
          </div>
          <div class="container-fluid col-md-6 offset-md-3">
            <div class="card mt-2">
              <form class="card-body cardbody-color p-lg-5" onSubmit={handleLogin}>
              <Stack sx={{ width: "100%" }} spacing={2}>
          {successAlert && (
            <Alert severity="success" variant="filled" onClose={() => setSuccessAlert(false)}>
              Login successful! Redirecting...
            </Alert>
          )}
          {errorAlert && (
            <Alert severity="error" variant="filled" onClose={() => setErrorAlert(false)}>
              Something went wrong...!
            </Alert>
          )}
        </Stack>
                <div class="text-center">
                  <img
                    src={logo}
                    class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="100px"
                    alt="profile"
                  />
                </div>

                <div class="mb-3">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    class="form-control"
                    id="Username"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                    Login
                  </button>
                </div>
                <div
                  id="emailHelp"
                  class="form-text text-center mb-5 text-dark"
                >
                  Player?{" "}
                  <a href="/login" type="submit" class="text-dark fw-bold">
                    {" "}
                    Login here
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
      </div>
  );
};

export default CoachLogin;
