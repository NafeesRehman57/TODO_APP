import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore/lite";
import { firestore } from "../../../config/firebase";

const initialState = {
  title: "",
  location: "",
  description: "",
};

const Hero = () => {

  const { user } = useContext(AuthContext);

  const [state, setstate] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setstate((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { title, location, description } = state;
    title = title.trim();
    location = location.trim();
    description = description.trim();

    if (title.length < 3) {
      return window.notify(
        "The title length should be at least 3 characters",
        "error"
      );
    }
    if (location.length < 3) {
      return window.notify("Enter your right location", "error");
    }
    if (description.length < 10) {
      return window.notify("Descripton length must be 10 characters", "error");
    }

    let formData = { title, location, description };

    formData.dateCreated = serverTimestamp();
    formData.id = window.getRandomId();
    formData.status = "active";
    formData.createdBy = {
      email: user.email,
      uid: user.uid
    };

    createDocument(formData)
  };

  const createDocument = async (formData)=>{

    setIsProcessing(true)
    
    try {
      await setDoc(doc(firestore, "todos", formData.id), formData);
      window.notify("Todo has been added successfully", "success" )
    } catch (error) {
      console.error(error)
      window.notify("Something went wrong todo isn't added", "error" )
    }
    setIsProcessing(false)
  }

  return (
    <div className="py-5 home d-flex justify-content-center align-items-center">
      <div className="container">
      <div className="row d-flex flex-wrap-reverse">
      <div className="col-12 col-md-7">
<div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 p-lg-5">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <h2 className="text-center mb-4">Add Todo</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Enter title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Enter location"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <textarea
                      className="form-control"
                      name="description"
                      rows="5"
                      placeholder="Enter descripton"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className="button-30 w-100" disabled={isProcessing}>
                      {!isProcessing ? (
                        "ADD TODO"
                      ) : (
                        <div className="spinner-border spinner-border-sm"></div>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
</div>
<div className="col-12 col-md-5"><img src="https://cdni.iconscout.com/illustration/premium/thumb/todo-list-5523307-4609476.png" class="img-fluid" alt="Responsive image" /></div>
      </div>

      </div>
    </div>
  );
};

export default Hero;
