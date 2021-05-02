/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/storeComponents/addToCart";
import { loadCart } from "../store/storeComponents/loadCart";
import "./styles/ProductCard.css";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.addClick = this.addClick.bind(this);
  }

  addClick(productID, userID) {
    this.props.addToCart(productID, userID);
    this.props.loadCart(userID);
  }

  render() {
    const { product } = this.props;
    return (
      <li key={product.id} className="product-card">
        <img src={product.photo} className="product-card-photo" alt="" />
        <section className="product-info">
          <Link to={`/Products/${product.id}`}>
            <h2>{product.name}</h2>
          </Link>
          <p>{product.price}</p>
          <button
            type="button"
            onClick={() => this.addClick(product.id, this.props.user.id)}
          >
            Add to Cart
          </button>
        </section>
      </li>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productID, userID) => {
      dispatch(addToCart(productID, userID));
    },
    loadCart: (userId) => {
      dispatch(loadCart(userId));
    },
  };
};

export default connect((state) => state, mapDispatchToProps)(ProductCard);
