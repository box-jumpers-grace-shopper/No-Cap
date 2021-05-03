/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import './styles/Cart.css';
import { removeCartItem } from '../store/storeComponents/removeCartItem';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: {},
      cartTotal: '',
      totalAmt: 0
    };
  }


  componentDidMount() {
    try {
        this.setState({ 
            ...this.state, 
            cart: this.props.cart, 
            totalAmt: this.props.cart.cart_line_items.length
        });
    } catch (err) {
      console.log(err);
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cart.cart_line_items.length !== this.props.cart.cart_line_items.length) {
        this.setState({ 
            cart: this.props.cart, 
            totalAmt: this.props.cart.cart_line_items.length
        });
    }
  }

  render() {
    const {removeCartItem} = this.props;
    const { cart_line_items, id } = this.state.cart;
    const { totalAmt} = this.state;
    return cart_line_items ? (
      <div>
        <div>Cart ({totalAmt})</div>
        <div id="cart-list">
          {cart_line_items.map((cartItem) => {
            return (
              <div className="cart-item" key={cartItem.id}>
                <img src={cartItem.product.photo} />
                <div className="cart-info">
                  <h3>{cartItem.product.name}</h3>
                  <h3>Price: {cartItem.product.price}</h3>
                  <h3>Quantity: {cartItem.quantity}</h3>
                  <h3>Total: {cartItem.subTotal}</h3>
                  <button id="delete" onClick={()=> removeCartItem(id, cartItem.id)}>Remove</button>
                </div>
              </div> 
            );
          })}
          <button>Checkout</button>
        </div>
      </div>
    ) : (
      'Loading'
    );
  }
}

const mapStateToProps = (state) => {
  return {
      cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCartItem: (cartId, lineId)=> dispatch(removeCartItem(cartId, lineId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
