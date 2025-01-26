import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { IoPerson, IoMail } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";

function Footer(props) {
  const iconSize = 28;
  return (
    <section className="footerSection">
      <div className="socialmediaIcons d-flex justify-content-evenly w-100">
        <div>
          <a
            className="footerHyperlink"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:example@example.com"
          >
            <IoMail size={iconSize / 1.2} />
          </a>
        </div>
        <div>
          <a
            className="footerHyperlink"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/huh_ca/"
          >
            <AiOutlineInstagram size={iconSize} />
          </a>
          <a
            className="footerHyperlink"
            target="_blank"
            rel="noopener noreferrer"
            href="https://howuniversehowls.myportfolio.com/"
          >
            <IoPerson size={iconSize / 1.2} />
          </a>
          <a
            className="footerHyperlink"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/yourprofile"
          >
            <FaFacebook size={iconSize / 1.2} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Footer;
