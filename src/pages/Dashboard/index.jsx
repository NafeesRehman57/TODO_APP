import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './Home';
import Todos from './Todos';
import Header from '../Frontend/components/Header'
import Footer from '../Frontend/components/Footer'

const index = () => {
  return (
    <>
    <Header />
    <main>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="todos" element={<Todos />} />
      </Route>
    </Routes>
    </main>
    <Footer />
    </>
  );
}

export default index;
