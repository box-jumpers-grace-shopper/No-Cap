/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint jsx-quotes: "off" */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../store/storeComponents/loginUser';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  async onSubmit(ev) {
    try {
      ev.preventDefault();
      this.props.loginUser(this.state);
      this.props.history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { onChange, onSubmit } = this;
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input value={email} onChange={onChange} name="email" />
          <label htmlFor="password">Password</label>
          <input value={password} onChange={onChange} name="password" />
          <button type="submit">Login In</button>
        </form>
        <Link to="/register">
          <button type="button">Register</button>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
