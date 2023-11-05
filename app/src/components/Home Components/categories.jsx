import React, { useContext } from "react";
import "./categories.css";
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
        <img src={"https://ucarecdn.com/7b89b44f-6871-4311-8b9b-cabc41b590b0/-/preview/1000x1000/-/quality/smart/-/format/auto/"} alt="" />
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
          <img src={"https://ucarecdn.com/87efcc2a-c056-4178-bdb9-059e1a52c84b/-/preview/1000x1000/-/quality/smart/-/format/auto/"} alt="" />
          <div className="category__info">
            <h3>Unique stays</h3>
            <p>3 stays</p>
          </div>
        </Link>

         <Link to={'/places'} className="category" onClick={() => {
          settype("Entire home")
          setselectedcategoryindex(1)
        }}>
          <img src={"https://ucarecdn.com/1a99bd7e-80f3-4538-be3f-d066d475bc56/-/preview/1000x1000/-/quality/smart/-/format/auto/"} alt="" />
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
        <img src={"https://ucarecdn.com/a6113cab-7665-4260-be71-149f5bbbf7b5/-/preview/1000x1000/-/quality/smart/-/format/auto/"} alt="" />
        <div className="category__info">
          <h3>Luxury Stays</h3>
          <p>1 stays</p>
        </div>
      </Link>:<div className="right__category category"><Skeleton height={"450px"}/></div>}
    </section>
  );
}

export default Categories;
