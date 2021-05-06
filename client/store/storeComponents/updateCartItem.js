/* eslint no-underscore-dangle: 'off' */
/* eslint no-console: 'off' */

import axios from 'axios';

// action types
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

// action creator
// const _updateCartItem = (cart) => ({
//   type: UPDATE_CART_ITEM,
//   cart,
// });
const _updateCartItem = (cartLineItem, cart) => ({
  type: UPDATE_CART_ITEM,
  cartLineItem,
  cart,
});

// thunk
const updateCartItem = (lineID, quantity, cartId, userId) => async (dispatch) => {
  try {
    const lineData = {
      lineId: lineID,
      quantity,
    };
    console.log(lineID, 'cart line id to change');
    const response = await axios.put(`api/cart/${cartId}/updateQuantity`, lineData);
    // const userCart = response.data;
    const cart = await axios.get(`/api/users/${userId}/cart`);
    console.log(cart, 'users cart');
    const cartLineItem = response.data;

    dispatch(_updateCartItem(cartLineItem, cart.data));
  } catch (err) {
    console.log(err.response);
    console.log(err);
  }
};

export { updateCartItem, UPDATE_CART_ITEM };
