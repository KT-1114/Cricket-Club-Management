import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import logo from "../../assets/logo.png";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import supabase from "../../connection";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("player_name", username)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("User not found");
      }

      if (data.password !== password) {
        alert("Please check your credentials");
        throw new Error("Incorrect password");
      }

      navigate('/adminplayer/'+ data.player_id);
      alert("Redirecting to the player admin dashboard...!");

    } catch (error) {
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
                <h1 class="text-white text-center">Unity XI Player Login </h1>
              </div>
            </div>
          </div>
          <div class="container-fluid col-md-6 offset-md-3">
            <div class="card mt-2">
              <form class="card-body cardbody-color p-lg-5" onSubmit={handleLogin}>
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
                  Coach?{" "}
                  <a href="#" type="submit" class="text-dark fw-bold">
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

export default Login;
