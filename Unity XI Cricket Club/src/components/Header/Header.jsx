// import React, { useState } from "react";
// import "../Header/Header.css";
// import logo from "../../assets/logo.png";

// const Header = (props) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("players")
//         .select("*")
//         .ilike("player_name", `%${searchQuery}%`);
//       if (error) throw error;
//       setSearchResults(data || []);
//     } catch (error) {
//       console.error("Error searching for players:", error.message);
//     }
//   };

//   return (
//     <div>
//       <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
//         <div class="container">
//           <div className="logoImage">
//             <a
//               href="/"
//               className="navbar-brand animate__animated animate__fadeIn"
//             >
//               <img src={logo} className="logo" />
//             </a>
//           </div>
//           <button
//             class="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <i class="bi bi-list"></i>
//           </button>
//           <div
//             class="collapse navbar-collapse animate__animated animate__fadeInRight"
//             id="navbarSupportedContent"
//           >
//             <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li class="nav-item">
//                 <a
//                   className={
//                     props.curr === "Home" ? "nav-link active" : "nav-link"
//                   }
//                   aria-current="page"
//                   href="/"
//                 >
//                   Home
//                 </a>
//               </li>
//               <li class="nav-item">
//                 <a
//                   class={
//                     props.curr === "Achievements"
//                       ? "nav-link active"
//                       : "nav-link"
//                   }
//                   href="/achievements"
//                 >
//                   Achievements
//                 </a>
//               </li>
//               <li class="nav-item">
//                 <a
//                   class={
//                     props.curr === "Matches" ? "nav-link active" : "nav-link"
//                   }
//                   href="/matches"
//                 >
//                   Matches
//                 </a>
//               </li>
//               <li class="nav-item">
//                 <a
//                   class={
//                     props.curr === "Players" ? "nav-link active" : "nav-link"
//                   }
//                   href="/players"
//                 >
//                   Players
//                 </a>
//               </li>
//               <li class="nav-item">
//                 <a
//                   class={props.curr === "Club" ? "nav-link active" : "nav-link"}
//                   href="/club"
//                 >
//                   Club
//                 </a>
//               </li>
//               <li class="nav-item">
//                 <a
//                   class={
//                     props.curr === "Login" ? "nav-link active" : "nav-link"
//                   }
//                   href="/login"
//                   aria-disabled="true"
//                 >
//                   Login
//                 </a>
//               </li>

//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search players"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button
//                   className="btn btn-outline-secondary"
//                   type="button"
//                   onClick={handleSearch}
//                 >
//                   Search
//                 </button>
//               </div>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import "../Header/Header.css";
import logo from "../../assets/logo.png";
import supabase from "../../connection";

const Header = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("club_id", 1)
        .ilike("player_name", `%${query}%`);
      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error("Error searching for players:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top d-lg-none d-block">
        {" "}
        <div class="container">
          <div className="logoImage">
            <a
              href="/"
              className="navbar-brand animate__animated animate__fadeIn"
            >
              <img src={logo} className="logo" />
            </a>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list"></i>
          </button>
          <div
            class="collapse navbar-collapse animate__animated animate__fadeInRight"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  className={
                    props.curr === "Home" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Achievements"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/achievements"
                >
                  Achievements
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Matches" ? "nav-link active" : "nav-link"
                  }
                  href="/matches"
                >
                  Matches
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Players" ? "nav-link active" : "nav-link"
                  }
                  href="/players"
                >
                  Players
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={props.curr === "Club" ? "nav-link active" : "nav-link"}
                  href="/club"
                >
                  Club
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Login" ? "nav-link active" : "nav-link"
                  }
                  href="/login"
                  aria-disabled="true"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-dark fixed-top d-lg-block d-none">
        <div className="container">
          <div className="navbar-header">
            <a
              href="/"
              className="navbar-brand animate__animated animate__fadeIn"
            >
              <img src={logo} className="logo" />
            </a>
          </div>
          <div className="navbar-center">
            {/* Centered navigation links */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a
                  className={
                    props.curr === "Home" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    props.curr === "Achievements"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  href="/achievements"
                >
                  Achievements
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    props.curr === "Matches" ? "nav-link active" : "nav-link"
                  }
                  href="/matches"
                >
                  Matches
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    props.curr === "Players" ? "nav-link active" : "nav-link"
                  }
                  href="/players"
                >
                  Players
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    props.curr === "Club" ? "nav-link active" : "nav-link"
                  }
                  href="/club"
                >
                  Club
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    props.curr === "Login" ? "nav-link active" : "nav-link"
                  }
                  href="/login"
                  aria-disabled="true"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-right">
            {/* Right-aligned search bar */}
            <div className="dropdown">
              <input
                type="text"
                className="form-control dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                placeholder="Search players"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {loading ? (
                  <li>
                    <span className="dropdown-item">Loading...</span>
                  </li>
                ) : searchResults.length > 0 ? (
                  searchResults.map((player) => (
                    <li key={player.player_id}>
                      <a
                        className="dropdown-item"
                        href={
                          player.speciality === "batsman"
                            ? "/batsman/" + player.player_id
                            : player.speciality === "bowler"
                            ? "/bowler/" + player.player_id
                            : "allrounder/" + player.player_id
                        }
                      >
                        {player.player_name}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item">No results found</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
