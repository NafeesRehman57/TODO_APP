import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
// import AuthContextProvider from "../../../context/AuthContext";


const initialState = { email: "", password: "" };

const Login = () => {

  // const {dispatch} = useContext(AuthContextProvider)

  const navigate = useNavigate();

  const [state, setstate] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setstate((s) => ({ ...s, [e.target.name]: e.target.value }));
  };


  const handleLogin = (e) => {
    e.preventDefault();
    let { email, password } = state;

    setIsProcessing(true);

    signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        let user = userCredential.user
        console.log(user)
        // dispatch({ type: "LOGIN", payload: {user} })
        navigate("/dashboard")
      }
    ).catch(err=>{
      console.error(err)
    }).finally(()=>{
      setIsProcessing(false);
    });

  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <div className="card p-2 p-md-3 p-lg-4">
              <div className="row">
                <div className="col">
                  <h2 className="text-center mb-4">LOGIN</h2>
                </div>
              </div>
              <form onSubmit={handleLogin}>
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
                <div className="row mb-3">
                  <div className="col">
                  <span><Link to="/">Forgot Password?</Link></span>

                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <button className="btn w-100" disabled={isProcessing}>
                    {!isProcessing
                    ?"LOGIN"
                    :<div className="spinner-border spinner-border-sm text-success"></div>
                    }
                    </button>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col">
                <span><p className="text-center">Not have a account? <Link to="/authentication/register" className="text-dark">Register</Link></p></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
