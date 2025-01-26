import React, { useState, useEffect, useRef } from "react";
import "./LandingPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import ReactPlayer from "react-player";
import CommonButton from "./CommonButton";
import loadingGif from "../shared/bird.gif";

function LandingPage(props) {
  const videoRef = useRef(undefined);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const fnfClickHandler = () => {
    setModalIsOpen(true);
  };

  const { state } = useLocation();
  const { targetId } = state || {};

  useEffect(() => {
    if (videoRef.current !== undefined) videoRef.current.defaultMuted = true;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    return () => {};
  }, [targetId]);

  const customStyles = {
    minHeight: "auto",
    bottom: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
    padding: 0,
  };

  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState(false);
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState("");

  const handleRodalSubmit = (e) => {
    e.preventDefault();

    setPasscode("");
    if (passcode.toLocaleLowerCase() === "log in here") {
      //handlePass
      setPasscodeErrorMsg("");
      setPasscodeError(false);
      setModalIsOpen(false);
      alert("do not worry about this page");
    } else {
      //handleFailPasscode
      setPasscodeError(true);
      setPasscodeErrorMsg("Not For you!");
    }
    setPasscode("");
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loader" />
      </div>
    );
  }

  return (
    <div>
      <Rodal
        visible={modalIsOpen}
        onClose={closeModal}
        customStyles={customStyles}
      >
        <div>
          <form className="rodal-parent" onSubmit={(e) => handleRodalSubmit(e)}>
            <label className="name-label flex-col">
              <h2 className="formText">Enter Passcode</h2>
              <input
                className="name-input"
                type="text"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                  setPasscodeErrorMsg("");
                }}
              />
              {passcodeError ? (
                <h2 className="errorText">{passcodeErrorMsg}</h2>
              ) : (
                ""
              )}
            </label>
            <button className="rodal-submit-button" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </Rodal>
      <section className="video-container" style={{ height: "100vh" }}>
        <div className="titleContainer">
          <h2 className="title">How universe howls</h2>

          <div className="btnContainer">
            <CommonButton
              title="Desire To Fly"
              onClickHandler={() => navigate("/desiretofly")}
            />
            <CommonButton
              title="Not for you"
              onClickHandler={() => navigate("/notforyou")}
            />
          </div>
        </div>

        <ReactPlayer
          className="reactPlayer"
          url="/homevidnew.mp4"
          playing={true}
          controls={false}
          volume={null}
          muted={true}
          width="100%"
          height="100%"
          loop={true}
          playsinline={true}
          onReady={() => setLoading(false)}
        />
      </section>

      <div
        className="fnfSectionBanner"
        id="fnfSection"
        ref={props.fnfSectionRef}
      >
        <h2 className="fndTitle">friends and family</h2>
        <CommonButton title="LOG IN HERE" onClickHandler={fnfClickHandler} />
      </div>
    </div>
  );
}

export default LandingPage;
