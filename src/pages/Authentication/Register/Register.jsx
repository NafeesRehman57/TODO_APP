import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore/lite";
import { auth, firestore } from "../../../config/firebase";
import {AuthContext} from "../../../context/AuthContext"


const initialState = { email: "", password: "" };

const Register = () => {

  const {dispatch} = useContext(AuthContext)

  const [state, setstate] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setstate((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let { email, password } = state;

    setIsProcessing(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let user = userCredential.user;
        addDocument(user);
        console.log("user created");
      })
      .catch((error) => {
        console.error(error);
        setIsProcessing(false);
      })
  };

  const addDocument = async (user) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        firstName: "",
        lastName: "",
        uid: user.uid,
      });
      console.log("user document created at firestore")
      dispatch({ type: "LOGIN", payload: {user}})
    } catch (error) {
      console.error(error)
    }
    setIsProcessing(false);
  }


  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card p-2 p-md-3 p-lg-4">
              <div className="row">
                <div className="col">
                  <h2 className="text-center mb-4">REGISTER</h2>
                </div>
              </div>
              <form onSubmit={handleRegister}>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <button className="btn w-100" disabled={isProcessing}>
                      {!isProcessing ? (
                        "Register"
                      ) : (
                        <div className="spinner-border spinner-border-sm text-success"></div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col">
                  <span>
                    <p className="text-center">
                      Already have an account?
                      <Link to="/authentication/login" className="text-dark ">
                        Login
                      </Link>
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
