/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadCart } from "../store/storeComponents/loadCart";
import { removeCartItem } from "../store/storeComponents/removeCartItem";
import { updateCartItem } from '../store/storeComponents/updateCartItem';
import InputCounter from "./InputCounter";


class CartLineItem extends React.Component {
    constructor() {
      super();
      this.state = {
        quantity: 1
      };
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
    }

    componentDidMount() {
        try {
          this.setState({
            quantity: this.props.cartLineItem.quantity
          });
        } catch (err) {
          console.log(err);
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        const {updateCartItem, cartLineItem} = this.props;
        if (
          prevState.quantity !==
          this.state.quantity
        ) {
        
          this.setState({
            quantity: this.state.quantity
          });
          updateCartItem(cartLineItem.id,this.state.quantity, cartLineItem.cartId);
          
        }
      }

      increment() {
        this.setState({ quantity: this.state.quantity + 1 });
      }
      decrement() {
        if (this.state.quantity !== 1) {
          this.setState({ quantity: this.state.quantity - 1 });
        }
      }

    render(){
        const {cartLineItem} = this.props;
        const {removeCartItem} = this.props;
        return (
            <li className="cart-item" key={cartLineItem.id}>
            <img src={cartLineItem.product.photo} />
            <div className="cart-info">
                <h4>
            <Link to={`/Products/${cartLineItem.product.id}`}>
                <h4>{cartLineItem.product.name}</h4>
            </Link> 
            </h4>
                <h4>Price: ${cartLineItem.product.price}</h4>
                <h4>
                    <InputCounter
                    
                        increment={this.increment}
                        decrement={this.decrement}
                        quantity={this.state.quantity}
                        
                    />
                </h4>
                <h4>SubTotal: ${parseFloat(cartLineItem.subTotal).toFixed(2)}</h4>
                <button
                id="delete"
                onClick={() => removeCartItem(cartLineItem.cartId, cartLineItem.id)}
                >
                Remove
                </button>
            </div>
            </li>
        );

    }

};
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
      loadCart: (userId, productID, quantity) => {
        dispatch(loadCart(userId, productID, quantity));
      },
      removeCartItem: (cartId, lineId) => {
        dispatch(removeCartItem(cartId, lineId))
      },
      updateCartItem: (cartLineId, quantity, cartId)=> {
        dispatch(updateCartItem(cartLineId, quantity, cartId))
      }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CartLineItem);