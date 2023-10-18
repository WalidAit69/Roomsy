import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { TbHomeSearch } from "react-icons/tb";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { ToggleDim, Undim } from "../functions/DimFunctions.js";
import { MyContext } from "../App";
import AddPlace from "./BecomeHost Components/AddPlace";
import useAuth from "../app/useAuth";
import { Menu, Text, Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Skeleton from 'react-loading-skeleton';


function Navbar() {
  const { togglePopup, removePopup, isHomepage, setIsEdit } = useContext(MyContext);

  const [isMobileMenu, setisMobileMenu] = useState(false);

  const [isdim, setisdim] = useState(false);

  const [modelOpen, setmodelOpen] = useState(false);

  const id = localStorage.getItem("userID");

  const [user, setuser] = useState('');
  useAuth({ user, setuser })

  const isHost = user?.host;

  const navigate = useNavigate();

  const [Booked, setBooked] = useState();
  const [notifications, setnotifications] = useState(0)

  async function getBooked() {
    if (user.id === id) {
      try {
        const { data } = await axios.get("http://localhost:3001/Booked", {
          withCredentials: true
        })
        setBooked(data);
        setnotifications(data?.length);
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    getBooked();
  }, [user])



  const toggleMobileMenu = () => {
    setisMobileMenu(!isMobileMenu);
    document.querySelector(".nav_links").classList.toggle("responsive");
    document.querySelector(".nav__right").classList.toggle("responsive");
    ToggleDim();
  };

  const handleClick = (e) => {
    e.preventDefault();
    Undim();
    setisMobileMenu(false);
    document.querySelector(".nav_links").classList.remove("responsive");
    document.querySelector(".nav__right").classList.remove("responsive");
    if (!isdim) {
      togglePopup();
    } else {
      removePopup();
    }
    setisdim(!isdim)
  };

  const handlelinkClick = () => {
    Undim();
    setisMobileMenu(false);
    document.querySelector(".nav_links").classList.remove("responsive");
    document.querySelector(".nav__right").classList.remove("responsive");
    removePopup();
  };

  const handleAddplaceClick = () => {
    setmodelOpen(true);
    setIsEdit(false);
  }

  function clearCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  async function Logout() {
    try {
      const res = await axios.get("http://localhost:3001/api/logout");
      clearCookie('token');
      window.location.href = '/';
    } catch (error) {
      console.error(error)
    }
  }

  function handlebooked() {
    handlelinkClick();
    navigate("/user/Booked");
  }
  function handlebookings() {
    handlelinkClick();
    navigate("/user/bookings");
  }
  function handleProfile() {
    handlelinkClick();
    navigate(`/user/show/${id}`);
  }
  function handleNotification(e) {
    handlelinkClick();
    navigate(`/user/booked/${e}`)
  }

  const [opened, { open, close }] = useDisclosure(false);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [screenHeight, setscreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setscreenHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, [])

  console.log(screenHeight);


  return (
    <header className="header">
      <nav className={isSticky ? "navbar sticky nav_dim" : "navbar nav_dim"}>
        {isMobileMenu ? (
          <HiOutlineMenuAlt1
            className="menu_icon_close"
            id="menu_icon_close"
            size={"20px"}
            onClick={toggleMobileMenu}
          ></HiOutlineMenuAlt1>
        ) : (
          <RxHamburgerMenu
            id="menu_icon"
            size={"20px"}
            onClick={toggleMobileMenu}
          ></RxHamburgerMenu>
        )}

        <div className="nav__left ">
          <Link to={"/"} onClick={() => { handlelinkClick() }}><Logo></Logo></Link>

          <div className="nav_links">
            {isHomepage ? (
              <>
                <Link to={"/places"} onClick={() => { handlelinkClick() }}>Places</Link>
                <Link onClick={() => { handlelinkClick() }}>Experiences</Link>
                <Link onClick={() => { handlelinkClick() }}>Nearby</Link>
              </>
            ) : (
              <>
                <Link onClick={() => { handlelinkClick() }}>Host</Link>
                <Link onClick={() => { handlelinkClick() }}>Experiences</Link>
                <Link onClick={() => { handlelinkClick() }}>Support</Link>
              </>
            )}
          </div>
        </div>

        <div className="nav__right">
          <div className="nav__right__icon">
            <TbHomeSearch className="icon"></TbHomeSearch>
            <Menu shadow="md" width={300}>
              <Menu.Target>
                <div className="notification">
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                  {notifications > 0 && <p>{notifications}</p>}
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                {Booked && Booked.map((book) => {
                  return <Menu.Item key={book._id} onClick={(e) => handleNotification(book._id)}>
                    Your place at {book.place.address} has ben booked by {book.Username}
                  </Menu.Item>
                })}
              </Menu.Dropdown>
            </Menu>

            {isHomepage ? (
              <Link to={"Host"} onClick={() => { handlelinkClick() }}>Host</Link>
            ) : id ? (
              <Link onClick={handleAddplaceClick} className="host_btn">
                <p>{isHost ? 'Add a Place' : 'Become host'}</p>
              </Link>
            ) : null}
            <AddPlace opened={modelOpen} setOpened={setmodelOpen}></AddPlace>
          </div>
          {!id ? (
            <Link className="nav_btn" onClick={handleClick}>
              <BiUser className="nav_btn_icon"></BiUser>
              <span>Sign in</span>
            </Link>
          ) : (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                {!user.profilepic ? <Skeleton width={"35px"} height={"35px"} borderRadius={"50%"} style={{ marginLeft: ".6rem" }} /> : <img src={`http://localhost:3001/${user.profilepic}`} alt="" style={{ cursor: "pointer", marginLeft: ".6rem" }} />}
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={handleProfile}>
                  Profile
                </Menu.Item>
                <Menu.Item onClick={handlebookings}>
                  My Bookings
                </Menu.Item>
                {isHost && <Menu.Item onClick={handlebooked}>
                  My Booked Places
                </Menu.Item>}
                <Menu.Item>
                  Settings
                </Menu.Item>
                <Menu.Item>
                  Messages
                </Menu.Item>
                <Menu.Item
                  rightSection={
                    <Text size="xs" c="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  color="red"
                  onClick={open}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>

              <Modal
                className="Logout_confirm"
                opened={opened}
                onClose={close}
                withCloseButton={false}
                overlayProps={{
                  backgroundOpacity: 0.55,
                  blur: 3,
                }}
                centered>
                <div>
                  <h3>Are you sure you want to logout</h3>
                  <div className="Logout_confirm_btns">
                    <Button onClick={Logout}>Yes</Button>
                    <Button onClick={close}>No</Button>
                  </div>
                </div>
              </Modal>

            </Menu>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
