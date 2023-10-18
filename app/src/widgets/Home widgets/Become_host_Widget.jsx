import React, { useContext } from "react";
import "./Become_host_Widget.css";
import img1 from "../../assets/Host/1.jpg";
import img2 from "../../assets/Host/2.jpg";
import img3 from "../../assets/Host/3.jpg";
import img4 from "../../assets/Host/4.jpg";
import img5 from "../../assets/Host/5.jpg";
import img6 from "../../assets/Host/6.jpg";
import img7 from "../../assets/Host/7.jpg";
import img8 from "../../assets/Host/8.jpg";
import { MyContext } from "../../App";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";


function Become_host_Widget() {
  const { isLoading } = useContext(MyContext);

  return (
    <>
      {!isLoading ? <section className="host__section">
        <div className="polygon__layer">
          <div className="polygon">
            <div className="info">
              <h1>Become a Host</h1>
              <p>
                Earn extra income and unlock new opportunities by sharing your
                space.
              </p>
              <Link to={"/host"}>Learn More</Link>
            </div>
          </div>

          <div className="host__section_images">
            <div className="img1">
              <img src={img1} alt="" />

              <div className="img-info">
                <h1>Sam</h1>
                <p>24 old</p>
              </div>
            </div>

            <div className="img2">
              <img src={img2} alt="" />

              <div className="img-info">
                <h1>Maria</h1>
                <p>26 old</p>
              </div>
            </div>

            <div className="img3">
              <img src={img3} alt="" />

              <div className="img-info">
                <h1>Garry</h1>
                <p>29 old</p>
              </div>
            </div>

            <div className="img4">
              <img src={img4} alt="" />

              <div className="img-info">
                <h1>Natasha</h1>
                <p>21 old</p>
              </div>
            </div>
          </div>

          <div className="s_img img5">
            <img src={img5} alt="" />
          </div>

          <div className="s_img img6">
            <img src={img6} alt="" />
          </div>

          <div className="s_img img7">
            <img src={img7} alt="" />
          </div>

          <div className="s_img img8">
            <img src={img8} alt="" />
          </div>
        </div>
      </section> : <div className="host__section"><Skeleton width={"1100px"} height={"400px"} /></div>}
    </>
  );
}

export default Become_host_Widget;
