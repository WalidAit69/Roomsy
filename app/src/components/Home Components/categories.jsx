import React, { useContext } from "react";
import "./categories.css";
import img1 from "../../assets/categories/outdoor.jpg";
import img2 from "../../assets/categories/unique.jpg";
import img3 from "../../assets/categories/entire-home.jpg";
import img4 from "../../assets/categories/luxe.jpg";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Categories() {
  const { type, settype, selectedcategoryindex, setselectedcategoryindex , isLoading } = useContext(MyContext);

  return (
    <section className="categories dim_overlay">

      {!isLoading ? <Link to={'/places'} className="left__category category" onClick={() => {
        settype("Outdoor gateways")
        setselectedcategoryindex(5)
      }}>
        <img src={img1} alt="" />
        <div className="category__info">
          <h3>Outdoor gateways</h3>
          <p>1 stays</p>
        </div>
      </Link>:<div className="left__category category"><Skeleton height={"450px"}/></div> }

      {!isLoading ? <div className="middle__category">

         <Link to={'/places'} className="category" onClick={() => {
          settype("Unique stays")
          setselectedcategoryindex(4)
        }}>
          <img src={img2} alt="" />
          <div className="category__info">
            <h3>Unique stays</h3>
            <p>3 stays</p>
          </div>
        </Link>

         <Link to={'/places'} className="category" onClick={() => {
          settype("Entire home")
          setselectedcategoryindex(1)
        }}>
          <img src={img3} alt="" />
          <div className="category__info">
            <h3>Entire home</h3>
            <p>2 stays</p>
          </div>
        </Link>

      </div> : <div className="middle__category"><Skeleton height={"220px"} count={2}/></div>}

      {!isLoading ? <Link to={'/places'} className="right__category category" onClick={() => {
        settype("Luxe")
        setselectedcategoryindex(6)
      }}>
        <img src={img4} alt="" />
        <div className="category__info">
          <h3>Luxury Stays</h3>
          <p>1 stays</p>
        </div>
      </Link>:<div className="right__category category"><Skeleton height={"450px"}/></div>}
    </section>
  );
}

export default Categories;
