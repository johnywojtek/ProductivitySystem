import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import '../../assets/scss/style.scss';
import Aux from '../../hoc/_Aux';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import DEMO from '../../store/constant';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions';
const SignUp = (props) => {
    const [input, setInput] = useState({});

    const handleInputChange = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    const handleSubmit = () => {
        // console.log(input.email);
        props.signUp(input);
    };
    if (props.auth.uid) {
        return <Redirect to="/" />;
    }
    return (
        <Aux>
            <Breadcrumb />
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-user-plus auth-icon" />
                            </div>
                            <h3 className="mb-4">Sign up</h3>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name="userName"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-group mb-4">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleInputChange}
                                />
                            </div>
                            {/* <div className="form-group text-left">
                                <div className="checkbox checkbox-fill d-inline">
                                    <input
                                        type="checkbox"
                                        name="checkbox-fill-2"
                                        id="checkbox-fill-2"
                                    />
                                    <label
                                        htmlFor="checkbox-fill-2"
                                        className="cr">
                                        Send me the
                                        <a href={DEMO.BLANK_LINK}>

                                            Newsletter
                                        </a>
                                        weekly.
                                    </label>
                                </div>
                            </div> */}
                            <button
                                className="btn btn-primary shadow-2 mb-4"
                                onClick={handleSubmit}>
                                Sign up
                            </button>
                            <p className="mb-0 text-muted">
                                Allready have an account?{' '}
                                <NavLink to="/auth/signin-1">Login</NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
    };
};
export default connect(
    mapStateToProps,
    { signUp }
)(SignUp);
