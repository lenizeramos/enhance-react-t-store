import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
//components
import LandingPage from "./components/LandingPage";
import PageNotFound from "./components/PageNotFound";

//screens
import DesireToFly from "./screens/DesireToFly";
import NotForYou from "./screens/NotForYou";

import "./App.css";

//icons
import { AiFillShopping } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import SidePanel from "./components/SidePanel";
import { useSelector, useDispatch } from "react-redux";
import { setCartIsOpen } from "../src/features/counter/cartSlice.js";
import ViewCart from "./screens/ViewCart";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

toast.configure();

function App() {
  const dispatch = useDispatch();
  const {
    // total,
    // fnfItemsTotal,
    CartIsOpen: sidePanel,
  } = useSelector((state) => state.cart);
  const [navOpened, setNavOpen] = useState(false);

  const openNavBarRef = useRef();
  const sidePanelRef = useRef();
  const navigate = useNavigate();

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { ref: whiteSectionRef, inView: isWhiteSectionInView } = useInView({
    threshold: 0.1,
  });
  const [serviceWorkerError, setServiceWorkerError] = useState(null);

  const fnfSectionRef = useRef(null);
  const scrollToFnFSection = () => {
    navigate("/", { state: { targetId: "fnfSection" } });
  };

  const handleNavOutsideClick = (e) => {
    if (!openNavBarRef?.current?.contains(e.target)) {
      setNavOpen(false);
    }
  };

  const handlePanelOutsideClick = (e) => {
    if (!sidePanelRef?.current?.contains(e.target)) {
      dispatch(setCartIsOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleNavOutsideClick);
    document.addEventListener("mousedown", handlePanelOutsideClick);

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleNavOutsideClick);
      document.removeEventListener("mousedown", handlePanelOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  });
  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => {
          setServiceWorkerError(null);
          console.log("Service Worker registered successfully.");
        })
        .catch((error) => {
          setServiceWorkerError(error);
        });
    }
  }, []);

  return (
    <div>
      <ScrollToTop />

      {/* Navbar */}
      <nav className="navbar">
        {navOpened ? (
          <div ref={openNavBarRef} className="openNavBar">
            <ul className="navElements">
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/"
                onClick={() => setNavOpen(false)}
              >
                <h2>Home</h2>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/desiretofly"
                onClick={() => setNavOpen(false)}
              >
                <h2>Desire to fly</h2>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/notforyou"
                onClick={() => setNavOpen(false)}
              >
                <h2>Not for you</h2>
              </Link>
              <h2
                style={{ textDecoration: "none" }}
                className="navBtn fnfBtn"
                onClick={() => {
                  setNavOpen(false);
                  scrollToFnFSection();
                }}
              >
                Friends & Family
              </h2>
            </ul>
          </div>
        ) : (
          <HiMenuAlt4
            size={40}
            className="hiMenu"
            color={`${isWhiteSectionInView ? "black" : "white"}`}
            onClick={() => {
              setNavOpen(!navOpened);
            }}
          />
        )}
        {(navOpened && screenSize.width < 430) || (
          <AiFillShopping
            className="shoppingCartIcon"
            size={40}
            color={`${isWhiteSectionInView ? "black" : "white"}`}
            onClick={() => {
              dispatch(setCartIsOpen(!sidePanel));
            }}
          />
        )}
      </nav>

      <SidePanel
        sidePanelOpen={sidePanel}
        setSidePanelOpen={dispatch(setCartIsOpen)}
        sidePanelRef={sidePanelRef}
      />

      <Routes>
        <Route
          path="/"
          element={<LandingPage fnfSectionRef={fnfSectionRef} />}
        />
        <Route
          path="/desiretofly"
          element={<DesireToFly sectionRef={whiteSectionRef} />}
        />
        <Route
          path="/notforyou"
          element={<NotForYou sectionRef={whiteSectionRef} />}
        />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <Toaster />
      {serviceWorkerError && <p>Service Worker registration failed.</p>}
    </div>
  );
}
export default App;
