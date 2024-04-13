import { React } from "react";
import { NavLink } from "react-router-dom";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
// import { useSelector } from "react-redux/es/hooks/useSelector";

const Home = () => {
  // const session_state = useSelector(state => state.SessionReducer);

  //  console.log(session_state.username)
  return (
    <>
      <section id="active">
        <Sidebar />

        <div className="container">
          <Header />

          <div className="content_part">
            <NavLink to="/todo">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-list-check"></i>
                </div>
                <div className="text_part">
                  <h2>
                    My <br /> To_Do_Lis
                  </h2>
                </div>
              </div>
            </NavLink>

             <NavLink to="/goal">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-bullseye"></i>
                </div>
                <div className="text_part">
                  <h2>
                    My <br /> Goals
                  </h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/timetables/personal">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-user-pen"></i>
                </div>
                <div className="text_part">
                  <h2>
                    Personal <br /> Timetable
                  </h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/timetables/class">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-chalkboard-user"></i>
                </div>
                <div className="text_part">
                  <h2>
                    Class <br /> Timetable
                  </h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/projects">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-diagram-project"></i>
                </div>
                <div className="text_part">
                  <h2>Projects</h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/contacts">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-address-book"></i>
                </div>
                <div className="text_part">
                  <h2>Contacts</h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/appointments">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-building-user"></i>
                </div>
                <div className="text_part">
                  <h2>Appointments</h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/payments">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                </div>
                <div className="text_part">
                  <h2>Payments</h2>
                </div>
              </div>
            </NavLink>

            <NavLink to="/events">
              <div className="box">
                <div className="icon_part">
                  <i class="fa-solid fa-calendar-xmark"></i>
                </div>
                <div className="text_part">
                  <h2>Events</h2>
                </div>
              </div>
            </NavLink>
          </div>

          <Footer />
        </div>
      </section>
    </>
  );
};

export default Home;
