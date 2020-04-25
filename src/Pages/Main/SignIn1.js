import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/style.scss';
import Aux from '../../hoc/_Aux';
import Breadcrumb from '../../App/layout/AdminLayout/Breadcrumb';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions';
import { Redirect } from 'react-router-dom';

const SignUp1 = (props) => {
    const [input, setInput] = useState({});

    const handleInputChange = (e) =>
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    const handleSubmit = () => {
        // console.log(input.email);
        props.signIn(input);
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
                        {props.authError && (
                            <h5 className="text-danger text-center mb-0">
                                {props.authError}
                            </h5>
                        )}

                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            <h3 className="mb-4">Login</h3>
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
                            {/* Save credentials */}
                            {/* <div className="form-group text-left">
                                <div className="checkbox checkbox-fill d-inline">
                                    <input
                                        type="checkbox"
                                        name="checkbox-fill-1"
                                        id="checkbox-fill-a1"
                                    />
                                    <label
                                        htmlFor="checkbox-fill-a1"
                                        className="cr">
                                        {' '}
                                        Save credentials
                                    </label>
                                </div>
                            </div> */}
                            <button
                                className="btn btn-primary shadow-2 mb-4"
                                onClick={handleSubmit}>
                                Login
                            </button>
                            <p className="mb-2 text-muted">
                                Forgot password?{' '}
                                <NavLink to="/auth/reset-password-1">
                                    Reset
                                </NavLink>
                            </p>
                            <p className="mb-0 text-muted">
                                Don’t have an account?{' '}
                                <NavLink to="/auth/signup-1">Signup</NavLink>
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
    { signIn }
)(SignUp1);
