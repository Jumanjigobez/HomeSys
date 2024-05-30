import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

const Timetables = () => {
  const navigate = useNavigate();

  const handleTimetable = (Type) => {
    if (Type === "personal") {
      navigate("/timetables/personal");
    } else {
      navigate("/timetables/class");
    }
  };
  return (
    <section id="active">
      <Sidebar />

      <div className="container">
        <Header />

        <div className="content_part timetables_content">
          <div className="part_1">
            <h1>Choose Timetable</h1>
          </div>

          <div className="part_2">
            <div className="box" onClick={() => handleTimetable("personal")}>
              <div className="icon_part">
                <i class="fa-solid fa-user-pen"></i>
              </div>
              <div className="text_part">
                <h2>
                  Personal <br /> Timetable
                </h2>
              </div>
            </div>

            <div className="box" onClick={() => handleTimetable("class")}>
              <div className="icon_part">
                <i class="fa-solid fa-chalkboard-user"></i>
              </div>
              <div className="text_part">
                <h2>
                  Class <br /> Timetable
                </h2>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Timetables;
