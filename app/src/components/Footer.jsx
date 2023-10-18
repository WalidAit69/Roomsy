import React, { useRef, useState } from "react";
import { AiFillApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import logo from "../assets/door.png";
import "./Footer.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";

function Footer() {
  return (
    <footer className="dim_overlay footer">
      <div className="footercontainer">
        <div className="store">
          <div className="store_info">
            <AiFillApple size={"30px"}></AiFillApple>
            <div>
              {" "}
              <p>Available on the</p>
              <h4>Appstore</h4>
            </div>
          </div>

          <div className="store_info">
            <IoLogoGooglePlaystore size={"25px"}></IoLogoGooglePlaystore>
            <div>
              {" "}
              <p>Get it on</p>
              <h4>Google Play</h4>
            </div>
          </div>
        </div>

        <div className="logo">
          <img src={logo} alt="logo" className="logo_img" />
          <span className="logo_name">
            Roomsy<span>TM</span>
          </span>
        </div>

        <button className="black_btn">Become a host</button>
      </div>

      <div className="about">
        <Aboutinfo
          title={"About"}
          text1={"How Roomy works"}
          text2={"News Room"}
          text3={"Roomy Pro"}
          text4={"Roomy Vip"}
          text5={"Investors"}
          text6={"Careers"}
        ></Aboutinfo>

        <Aboutinfo
          title={"Community"}
          text1={"Diversity And Belonging"}
          text2={"Against Discrimination"}
          text3={"Accessibility"}
          text4={"Guest Referrals"}
          text5={"Gift Cards"}
          text6={"Frontline Stays"}
        ></Aboutinfo>

        <Aboutinfo
          title={"Host"}
          text1={"Host Your House"}
          text2={"Host An Online Experience"}
          text3={"Host An Experience"}
          text4={"Recourse Center"}
          text5={"Responsible Hosting"}
        ></Aboutinfo>

        <Aboutinfo
          title={"Support"}
          text1={"Help Center"}
          text2={"Cancellation Options"}
          text3={"Neighborhood Support"}
          text4={"Trust And Safety"}
        ></Aboutinfo>
      </div>

      <div className="footer_end">
        <div className="copyright">
          <div className="copyright_info">
            <p>2023 Roomsy,Inc</p>
            <div>
              {" "}
              <p>privacy</p>
              <span>.</span>
              <p>Terms</p>
              <span>.</span>
              <p>Sitemap</p>
            </div>
          </div>

          <div>
            <AiFillFacebook
              size={"25px"}
              className="copyright_icons"
            ></AiFillFacebook>
            <AiFillTwitterSquare
              size={"25px"}
              className="copyright_icons"
            ></AiFillTwitterSquare>
            <AiFillInstagram
              size={"25px"}
              className="copyright_icons"
            ></AiFillInstagram>
          </div>
        </div>
      </div>
    </footer>
  );
}

const Aboutinfo = ({ title, text1, text2, text3, text4, text5, text6 }) => {
  const [footerLinks, setfooterLinks] = useState(true);
  const myRef = useRef(null);

  const handleClick = () => {
    setfooterLinks(!footerLinks);
    const elements = myRef.current.querySelectorAll(".about_info_links");
    elements.forEach((element) => {
      element.classList.toggle("footer__responsive");
    });
  };

  return (
    <div className="about_info" ref={myRef}>
      <div className="about_info_icon">
        <h4>{title}</h4>
        {!footerLinks ? (
          <AiOutlinePlus
            color="gray"
            onClick={handleClick}
            id="about_info_icon"
          ></AiOutlinePlus>
        ) : (
          <AiOutlineMinus
            color="gray"
            onClick={handleClick}
            id="about_info_icon"
          ></AiOutlineMinus>
        )}
      </div>

      <div className="about_info_links">
        <p>{text1}</p>
        <p>{text2}</p>
        <p>{text3}</p>
        <p>{text4}</p>
        <p>{text5}</p>
        <p>{text6}</p>
      </div>
    </div>
  );
};

export default Footer;
