import React, { useState } from "react";

import "../css/productDispDetail.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";
import Rodal from "rodal";
import { addItem, setCartIsOpen } from "../features/counter/cartSlice";
import "rodal/lib/rodal.css";

import itemData from "../shared/itemdata";

function DesireToFlyDetail() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("small");

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleSizeChart = (image) => {
    setIsModalOpen(true);
  };

  const handleAddToCart = (item) => {
    dispatch(addItem({ newItem: item, size: size, newQuantity: quantity }));
    dispatch(setCartIsOpen(true));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCustomStyles = () => {
    const smallScreenMediaQuery = '(max-width: 600px)';
    return {
      width: (window.matchMedia(smallScreenMediaQuery).matches) ? '90%' : '50%',
      height: (window.matchMedia(smallScreenMediaQuery).matches) ? '40%' : '70%',
      backgroundColor: "rgb(128, 128, 128, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      padding: 0,
    }
  };

  const customStyles = getCustomStyles();

  return (
    /* TODO: introduce media query for body container to not hide while screen is reduced. I think its resolved!! */
    <div className="detail-view">
      <Rodal
        visible={isModalOpen}
        onClose={closeModal}
        customStyles={customStyles}
      >
        <div>
          <img
            src={require(`../shared/asset.png`)}
            alt="enlarged"
            className="enlarged-image"
            style={{width: '100%'}}
          />
        </div>
      </Rodal>

      <div className="body-container">
        <div className="product-view">
          {/* <span className="verticalBar"></span> */}
          <p className="product-description">
            Desire to Fly (DTF) represents the embodiment of aspirations,
            symbolizing personal growth and the pursuit of new horizons. This
            concept carries a playful undertone that resonates well with pop
            culture. All HUH clothing is proudly manufactured in Bangladesh. The
            initial series, DTF and NFU, showcase oversized T-shirts made from
            100% cotton. Crafted with exceptional attention to detail, these
            premium garments have a weight of 400 GSM, ensuring unparalleled
            quality and unmatched comfort.
          </p>
        </div>
        <div className="product-form">
          <h3>DESIRE TO FLY</h3>
          <h4>{`CAD: $${itemData[0].priceInCad}`}</h4>
          <h4 style={{ paddingTop: "1rem", color: "grey" }}>Quantity</h4>
          <label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </label>
          <h4 style={{ paddingTop: "0.2rem", color: "grey" }}>Size</h4>
          <div className="dropdown">
            <FormControl sx={{ height: "30px", minWidth: 90 }} size="small">
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
          <br />
          <button
            className="button-cart-add"
            onClick={() => handleAddToCart(itemData[0])}
          >
            Add to Cart
          </button>
          <br />
          <button className="button-cart-size" onClick={handleSizeChart}>
            Size Chart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DesireToFlyDetail;
