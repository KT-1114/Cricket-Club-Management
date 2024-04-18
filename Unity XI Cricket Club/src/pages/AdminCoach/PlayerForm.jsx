import { useState } from "react";
import CoachNav from "../../components/CoachNav/CoachNav";
import logo from "../../assets/logo.png";
import supabase from "../../connection";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const PlayerForm = () => {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    player_name: "",
    age: "",
    city: "",
    jersey_num: "",
    contact: "",
    email: "",
    speciality: "",
    password: "",
    batting_side: "",
    bowling_style: "",
    photo: "",
  });

  console.log(coachId);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, photo: file });
  };

  const validateForm = () => {
    const {
      player_name,
      age,
      city,
      jersey_num,
      contact,
      email,
      speciality,
      batting_side,
      bowling_style,
      password,
    } = formData;

    if (!formData.photo) {
      alert("Please choose a photo.");
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!player_name.trim()) {
      alert("Please enter your name.");
      document.getElementById("player_name").focus();
      return false;
    } else if (!nameRegex.test(player_name.trim())) {
      alert("Name should only contain alphabets and spaces.");
      document.getElementById("player_name").focus();
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
      alert("Please enter your email address.");
      document.getElementById("email").focus();
      return false;
    } else if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      document.getElementById("email").focus();
      return false;
    }

    if (!password.trim()) {
      alert("Please enter your password.");
      document.getElementById("password").focus();
      return false;
    }

    if (password.length < 8) {
      alert("Password should contain atleast 8 characters.");
      document.getElementById("password").focus();
      return false;
    }

    if (!contact || contact.toString().length !== 10) {
      alert("Please enter a valid contact number.");
      document.getElementById("contact").focus();
      return false;
    }

    if (age === 0) {
      alert("Please enter your age.");
      document.getElementById("age").focus();
      return false;
    } else if (age < 18 || age > 60) {
      alert("Age must be between 18 and 60.");
      document.getElementById("age").focus();
      return false;
    }

    if (!city) {
      alert("Please select a city.");
      document.getElementById("city").focus();
      return false;
    }

    if (jersey_num <= 0) {
      alert("Jersey number must be greater than 0.");
      document.getElementById("jersey_num").focus();
      return false;
    }

    if (!speciality) {
      alert("Please select a speciality.");
      return false;
    }
    console.log(speciality);

    if (speciality.toLowerCase() === "batsman" && !batting_side) {
      alert("Please select a batting side.");
      document.getElementById("batting_side_left").focus();
      return false;
    }

    if (speciality.toLowerCase() === "bowler" && !bowling_style) {
      alert("Please select a bowling style.");
      document.getElementById("bowling_style_spin").focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!validateForm()) {
      return;
    }
    const { data: maxPlayerIdData, error: maxPlayerIdError } = await supabase
      .from("players")
      .select("player_id", { count: "exact" })
      .order("player_id", { ascending: false })
      .limit(1)
      .single();

    if (maxPlayerIdError) {
      throw maxPlayerIdError;
    }

    const playerId = maxPlayerIdData.player_id + 1;

    const currentDate = new Date();
    const uploadFile = async (file) => {
      try {
        console.log("In upload file");
        const { data, error } = await supabase.storage
          .from("Club")
          .upload(file.name, file);


        // const {data1} = await supabase.storage
        // .from("Club")
        // .createSignedUploadUrl(file.name);

        // const {data2} = await supabase.storage
        // .from("Club")
        // .uploadToSignedUrl(file.name, data1, file);

        const {data3} = await supabase.storage
        .from("Club")
        .getPublicUrl(file.name);

        console.log(data3)

        if (error) {
          throw error;
        }
        console.log("Upload file 2");
        const url =  URL.createObjectURL(file);
        console.log(data);
        setImageUrl(url);
        console.log(file.name)
        formData.photo = file.name;
        return data.Key;
      } catch (error) {
        console.error("Error uploading file:", error.message);
        return null;
      }
    };
    let photoUrl = "";
    try {
      photoUrl = await uploadFile(formData.photo);
      // if (!photoUrl) {
      //   // alert("Couldn't upload the photo.")
      //   return;
      // }
    } catch (error) {
      alert("Couldn't upload the photo." + error.message);
      return;
    }

    const playerData = {
      player_id: playerId,
      club_id: 1,
      player_name: formData.player_name,
      age: formData.age,
      city: formData.city,
      joining_date: currentDate,
      jersey_num: formData.jersey_num,
      password: formData.password,
      contact: formData.contact,
      email: formData.email,
      speciality: formData.speciality.toLowerCase(),
      photo: "https://rdquiblqymwujjgwhwwr.supabase.co/storage/v1/object/public/Club/" + formData.photo,
    };

    let batsmanData = {};
    let bowlerData = {};
    let allRounderData = {};

    try {
      const { data: playerInsertData, error: playerInsertError } =
        await supabase.from("players").insert([playerData]);

      if (playerInsertError) {
        throw playerInsertError;
      }
      if (formData.speciality.toLowerCase() === "batsman") {
        batsmanData = {
          batting_side: "",
          player_id: playerId,
        };

        if (formData.batting_side == "left") {
          batsmanData.batting_side = "FALSE";
        } else {
          batsmanData.batting_side = "TRUE";
        }

        const { data, error } = await supabase
          .from("batsmen")
          .insert([batsmanData]);

        if (error) {
          throw error;
        }
      } else if (formData.speciality.toLowerCase() === "bowler") {
        bowlerData = {
          bowling_style: formData.bowling_style,
          player_id: playerId,
        };

        if (formData.bowling_style == "fast") {
          bowlerData.bowling_style = "FALSE";
        } else {
          bowlerData.bowling_style = "TRUE";
        }

        const { data, error } = await supabase
          .from("bowlers")
          .insert([bowlerData]);
        if (error) {
          throw error;
        }
      } else if (formData.speciality.toLowerCase() === "all_rounder") {
        allRounderData = {
          batting_side: formData.batting_side,
          bowling_style: formData.bowling_style,
          player_id: playerId,
        };

        if (formData.bowling_style == "fast") {
          allRounderData.bowling_style = "FALSE";
        } else {
          allRounderData.bowling_style = "TRUE";
        }

        if (formData.batting_side == "left") {
          allRounderData.batting_side = "FALSE";
        } else {
          allRounderData.batting_side = "TRUE";
        }

        const { data, error } = await supabase
          .from("all_rounders")
          .insert([allRounderData]);
        if (error) {
          throw error;
        }
      }

      console.log("Data inserted successfully");
      alert("Data inserted successfully")
      navigate("/allplayers/"+coachId)
      setFormData({
        player_name: "",
        age: "",
        city: "",
        jersey_num: "",
        contact: "",
        email: "",
        speciality: "",
        password: "",
        batting_side: "",
        bowling_style: "",
        photo: "",
      });
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  const renderFormBasedOnSpeciality = () => {
    switch (formData.speciality) {
      case "Batsman":
        return (
          <>
            <div>
              <div>Batting Side</div>
              <label>
                <input
                  type="radio"
                  name="batting_side"
                  value="left"
                  checked={formData.batting_side === "left"}
                  onChange={handleChange}
                />
                Left
              </label>
              <label>
                <input
                  type="radio"
                  name="batting_side"
                  value="right"
                  checked={formData.batting_side === "right"}
                  onChange={handleChange}
                />
                Right
              </label>
            </div>
          </>
        );
      case "Bowler":
        return (
          <>
            <div>Bowling Style</div>
            <label>
              <input
                type="radio"
                name="bowling_style"
                value="fast"
                checked={formData.bowling_style === "fast"}
                onChange={handleChange}
              />
              Fast
            </label>
            <label>
              <input
                type="radio"
                name="bowling_style"
                value="spin"
                checked={formData.bowling_style === "spin"}
                onChange={handleChange}
              />
              Spin
            </label>
          </>
        );
      case "all_rounder":
        return (
          <>
            <div>
              <div>Batting Side</div>
              <label>
                <input
                  type="radio"
                  name="batting_side"
                  value="left"
                  checked={formData.batting_side === "left"}
                  onChange={handleChange}
                />
                Left
              </label>
              <label>
                <input
                  type="radio"
                  name="batting_side"
                  value="right"
                  checked={formData.batting_side === "right"}
                  onChange={handleChange}
                />
                Right
              </label>
            </div>
            <div>Bowling Style</div>
            <label>
              <input
                type="radio"
                name="bowling_style"
                value="fast"
                checked={formData.bowling_style === "fast"}
                onChange={handleChange}
              />
              Fast
            </label>
            <label>
              <input
                type="radio"
                name="bowling_style"
                value="spin"
                checked={formData.bowling_style === "spin"}
                onChange={handleChange}
              />
              Spin
            </label>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="pt-5 mt-5 mb-5">
        <CoachNav curr={"PlayerForm"} id={coachId} />
        <div class="container-fluid login mt-5">
          <div class="row">
            <div class="container-fluid col-md-6 offset-md-3">
              <div class="card mt-2">
                <form
                  class="card-body cardbody-color p-lg-5"
                  onSubmit={handleSubmit}
                >
                  <div class="text-center">
                    <img
                      src={logo}
                      class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                      width="100px"
                      alt="profile"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                      Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      onChange={handlePhotoChange}
                      accept="image/*"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      name="player_name"
                      value={formData.player_name}
                      onChange={handleChange}
                      class="form-control"
                      id="player_name"
                      placeholder="Full Name"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      class="form-control"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      class="form-control"
                      id="contact"
                      placeholder="Contact Number"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      class="form-control"
                      id="age"
                      placeholder="Age"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                      id="city"
                    >
                      <option value="">Select City</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Pune">Pune</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Surat">Surat</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Lucknow">Lucknow</option>
                      <option value="Kanpur">Kanpur</option>
                      <option value="Nagpur">Nagpur</option>
                      <option value="Indore">Indore</option>
                      <option value="Patna">Patna</option>
                      <option value="Bhopal">Bhopal</option>
                      <option value="Ludhiana">Ludhiana</option>
                      <option value="Agra">Agra</option>
                      <option value="Varanasi">Varanasi</option>
                      <option value="Chandigarh">Chandigarh</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="jersey_num"
                      value={formData.jersey_num}
                      onChange={handleChange}
                      className="form-control"
                      id="jersey_num"
                      placeholder="Jersey Number"
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleChange}
                      className="form-control"
                      id="speciality"
                    >
                      <option value="">Select Speciality</option>
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="all_rounder">All Rounder</option>
                    </select>
                  </div>
                  {currentStep === 2 && renderFormBasedOnSpeciality()}
                  <div class="text-center">
                    <button type="submit" class="btn btn-color px-5 mb-5 w-100">
                      {currentStep === 1 ? "Next" : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlayerForm;
