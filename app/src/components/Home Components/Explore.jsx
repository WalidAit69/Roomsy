import React from "react";
import "./Explore.css";
import Explore_widget from "../../widgets/Home widgets/Explore_widget";


function Explore() {

  return (
    <section className="explore__section dim_overlay">
      <h1>Explore</h1>
      <div className="explore__section_container">
        <Explore_widget
          image1={"https://ucarecdn.com/6db67557-40e6-49cd-a00a-a412a9a9d5f5/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name1={"United States"}
          info1={"info"}
          image2={"https://ucarecdn.com/508973b7-9580-4d48-a555-4ab419acf0ed/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name2={"United Kingdom"}
          info2={"info"}
        ></Explore_widget>
        <Explore_widget
          image1={"https://ucarecdn.com/f8deba3f-b499-49d9-ae8a-ab90fc229edc/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name1={"France"}
          info1={"info"}
          image2={"https://ucarecdn.com/be23d741-f828-4728-bbf8-7872423daf13/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name2={"United Arab Emirates"}
          info2={"info"}
        ></Explore_widget>
        <Explore_widget
          image1={"https://ucarecdn.com/d71a20b6-6d73-4ed7-94ed-5c74138876d3/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name1={"Portugal"}
          info1={"info"}
          image2={"https://ucarecdn.com/98563a22-0555-4047-9bcb-f34504e6100e/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name2={"Morocco"}
          info2={"info"}
        ></Explore_widget>
        <Explore_widget
          image1={"https://ucarecdn.com/f31d704b-089b-4c4e-8c28-4a2de0a7f334/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name1={"Greece"}
          info1={"info"}
          image2={"https://ucarecdn.com/d71a20b6-6d73-4ed7-94ed-5c74138876d3/-/preview/500x500/-/quality/smart/-/format/auto/"}
          name2={"Philippines"}
          info2={"info"}
        ></Explore_widget>
      </div>
    </section>
  );
}

export default Explore;
