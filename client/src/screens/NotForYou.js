import React, { useState, useMemo, useRef } from "react";
import Rodal from "rodal";
import { useDispatch } from "react-redux";
import { addItem, setCartIsOpen } from "../features/counter/cartSlice";
import itemData from "../shared/itemdata";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CommonButton from "../components/CommonButton";
import "../css/productDisp.css";
import "rodal/lib/rodal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const NotForYou = ({ sectionRef }) => {
  const dispatch = useDispatch();
  const [isModalOpenSize, setIsModalOpenSize] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("small");

  const shopSectionRef = useRef(null);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleSizeChart = () => {
    setIsModalOpenSize(true);
  };

  const handleAddToCart = (item) => {
    dispatch(addItem({ newItem: item, size: size, newQuantity: quantity }));
    dispatch(setCartIsOpen(true));
  };

  const closeModalSize = () => {
    setIsModalOpenSize(false);
  };

  const openImageModal = (imagePath) => {
    if (imagePath) {
      setSelectedImage(imagePath);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const smallScreenMediaQuery = "(max-width: 700px)";
  const customStyles = useMemo(
    () => ({
      width: window.matchMedia(smallScreenMediaQuery).matches ? "70%" : "50%",
      height: window.matchMedia(smallScreenMediaQuery).matches
        ? "35%"
        : "80.5%",
      borderRadius: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      padding: 0,
    }),
    []
  );


  const scrollToShopSection = () => {
    if (shopSectionRef.current) {
      shopSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="parent-div" className="parent-parent">
      <div className="rodal-parent">
        <Rodal
          visible={isModalOpen}
          onClose={closeModal}
          customStyles={customStyles}
        >
          <div>
            {selectedImage ? (
              <img
                src={require(`../shared/${selectedImage}`)}
                alt="Imagem ampliada"
                className="enlarged-image"
                style={{ width: "100%" }}
              />
            ) : (
              <p>Image not available</p>
            )}
          </div>
        </Rodal>
        <Rodal
          visible={isModalOpenSize}
          onClose={closeModalSize}
          customStyles={customStyles}
        >
          <div>
            <img
              src={require(`../shared/asset.png`)}
              alt="enlarged"
              className="enlarged-image"
              style={{ width: "100%" }}
            />
          </div>
        </Rodal>
      </div>

      <div className="displayProductContents">
        <section className="video-container" style={{ height: "100vh" }}>
          <div className="titleContainer">
            <h2 className="title">Not For you</h2>

            <div className="btnContainer">
              <CommonButton
                title={<FontAwesomeIcon icon={faAngleDown} />}
                onClickHandler={scrollToShopSection}
              />
            </div>
          </div>

          <img src="nfynew.jpg" className="newImg" alt="new dtf img"></img>
        </section>
        <div className="container" ref={sectionRef }>
          <div className="row justify-content-center" id="shopSection" ref={shopSectionRef} >
            <div className="col-12 col-md-6">
              <div onClick={() => openImageModal("7.png")}>
                <img
                  src={require(`../shared/7.png`)}
                  alt="product"
                  className="img-fluid"
                />
              </div>

              <div className="d-flex justify-content-center w-100">
                <p className="text-muted w-75">
                  Not for You (NFU) embodies the essence of individuality and
                  self-assuredness, embracing the notion that not every creation
                  is meant for everyone. This concept celebrates uniqueness and
                  encourages the freedom to be true to oneself. All HUH
                  clothing, including the NFU line, is meticulously manufactured
                  in Bangladesh. The NFU series features oversized T-shirts made
                  from 100% cotton, ensuring exceptional comfort and quality.
                  With a weight of 400 GSM, these garments are crafted to
                  provide a distinctive fashion statement.
                </p>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div onClick={() => openImageModal("8.png")}>
                <img
                  src={require(`../shared/8.png`)}
                  alt="product"
                  className="img-fluid"
                />
              </div>
              <div className="d-flex justify-content-center w-100">
                <div className="d-flex flex-column w-75">
                  <h3 className="text-center">NOT FOR YOU</h3>
                  <h4 className="text-center">{`CAD: $${itemData[1].priceInCad}`}</h4>

                  <div className="mb-3">
                    <label htmlFor="quantityInput" className="form-label">
                      Quantity
                    </label>
                    <input
                      id="quantityInput"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="demo-simple-select" className="form-label">
                      Size
                    </label>
                    <FormControl
                      sx={{ height: "30px", minWidth: 120 }}
                      size="small"
                      fullWidth
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={size}
                        onChange={handleSizeChange}
                      >
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <button
                      className="btn btn-primary mt-3 w-50"
                      onClick={() => handleAddToCart(itemData[1])}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="btn btn-link mt-2 w-50"
                      onClick={handleSizeChart}
                    >
                      Size Chart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotForYou;
