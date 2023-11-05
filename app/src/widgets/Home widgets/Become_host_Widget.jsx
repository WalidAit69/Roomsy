import React, { useContext } from "react";
import "./Become_host_Widget.css";
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
              <img src={"https://ucarecdn.com/ad4efd40-f7ec-485c-8781-ca6762edf2b6/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />

              <div className="img-info">
                <h1>Sam</h1>
                <p>24 old</p>
              </div>
            </div>

            <div className="img2">
              <img src={"https://ucarecdn.com/a7cde4cc-4ed2-4832-af8d-79e5c614ba25/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />

              <div className="img-info">
                <h1>Maria</h1>
                <p>26 old</p>
              </div>
            </div>

            <div className="img3">
              <img src={"https://ucarecdn.com/5e8414e3-91f4-4007-9956-71542399840c/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />

              <div className="img-info">
                <h1>Garry</h1>
                <p>29 old</p>
              </div>
            </div>

            <div className="img4">
              <img src={"https://ucarecdn.com/dbab0d6d-10a8-474d-a41d-67eff7c24f82/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />

              <div className="img-info">
                <h1>Natasha</h1>
                <p>21 old</p>
              </div>
            </div>
          </div>

          <div className="s_img img5">
            <img src={"https://ucarecdn.com/81dd11f9-3457-4cb3-958d-8eb45931f47b/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />
          </div>

          <div className="s_img img6">
            <img src={"https://ucarecdn.com/7a3e99e6-51e8-4572-82e1-009e55417a67/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />
          </div>

          <div className="s_img img7">
            <img src={"https://ucarecdn.com/ea4985f6-7274-4d8c-af49-3d5b2832b2fd/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />
          </div>

          <div className="s_img img8">
            <img src={"https://ucarecdn.com/0c68c1ef-d185-464f-b03d-86e0aa14016a/-/preview/500x500/-/quality/smart/-/format/auto/"} alt="" loading="lazy" />
          </div>
        </div>
      </section> : <div className="host__section"><Skeleton width={"1100px"} height={"400px"} /></div>}
    </>
  );
}

export default Become_host_Widget;
