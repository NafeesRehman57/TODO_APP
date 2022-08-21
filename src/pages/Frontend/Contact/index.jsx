import React from 'react'

const index = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col"><h2 className="fw-bolder text-center text-uppercase">Contact Me</h2></div>
      </div>
      <div className="row">
        <div className="col mt-5">
          <div className="card">
          <form className="p-4">
                <div className="row">
                  <div className="col">
                    <h2 className="text-center mb-4"></h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Your Name"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Your Email"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <textarea
                      className="form-control"
                      name="description"
                      rows="5"
                      placeholder="Your Message"
                      // onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="button-30 w-100">Send message</div>
              </form>
          </div>
        </div>
        <div className="col mt-5">
          <img src="https://img.freepik.com/free-vector/organic-flat-customer-support-illustration_23-2148899173.jpg?w=1380&t=st=1659507792~exp=1659508392~hmac=ffaf19ce6f9d22ca12004b2c6813a8235e63a5612b3b2e48116b08939181f5e3" className="img-fluid center" alt="contact pic" />
        </div>
      </div>
    </div>
  )
}

export default index