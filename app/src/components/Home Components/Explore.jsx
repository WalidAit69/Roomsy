import React from "react";
import "./Explore.css";
import img1 from "../../assets/explore/fransisco.jpg";
import img2 from "../../assets/explore/uk.jpg";
import img3 from "../../assets/explore/fr.jpg";
import img4 from "../../assets/explore/uae.jpg";
import img5 from "../../assets/explore/pr.webp";
import img6 from "../../assets/explore/ma.jpg";
import img7 from "../../assets/explore/gr.webp";
import img8 from "../../assets/explore/ph.jpg";
import Explore_widget from "../../widgets/Home widgets/Explore_widget";


function Explore() {

  return (
    <section className="explore__section dim_overlay">
      <h1>Explore</h1>
      <div className="explore__section_container">
        <Explore_widget
          image1={img1}
          name1={"United States"}
          info1={"info"}
          image2={img2}
          name2={"United Kingdom"}
          info2={"info"}
        ></Explore_widget>
        <Explore_widget
          image1={img3}
          name1={"France"}
          info1={"info"}
          image2={img4}
          name2={"United Arab Emirates"}
          info2={"info"}
        ></Explore_widget>
        <Explore_widget
          image1={img5}
          name1={"Portugal"}
          info1={"info"}
          image2={img6}
          name2={"Morocco"}
          info2={"info"}
        ></Explore_widget>
        <Explore_widget
          image1={img7}
          name1={"Greece"}
          info1={"info"}
          image2={img8}
          name2={"Philippines"}
          info2={"info"}
        ></Explore_widget>
      </div>
    </section>
  );
}

export default Explore;
