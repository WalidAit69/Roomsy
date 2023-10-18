import React, { useContext } from "react";
import "./Explore_widget.css";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



function Explore_widget({ name1, name2, image1, image2, info1, info2 }) {
  const { isLoading } = useContext(MyContext);

  return (
    <>
      {!isLoading ? <div className="explore__grid">
        <Link to={'/places/' + name1} className="explore__card">
          <img src={image1} alt="" />
          <div>
            <h4>{name1}</h4>
            <p>{info1}</p>
          </div>
        </Link>

        <Link to={'/places/' + name2} className="explore__card">
          <img src={image2} alt="" />
          <div>
            <h4>{name2}</h4>
            <p>{info2}</p>
          </div>
        </Link>
      </div> : <div className="explore__card"><Skeleton width={"100px"} height={"100px"} count={2}/></div> }
    </>
  );
}

export default Explore_widget;
