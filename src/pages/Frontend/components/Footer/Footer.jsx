import React from 'react'

const Footer = () => {

  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark py-2">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="mb-0 text-center text-white">&copy; {year} All Right Reserved. Created by Nafees ur Rehman with ❤️</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer