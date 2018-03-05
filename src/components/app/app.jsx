// @flow

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import Container from '../container/container';

// require('./app.css')

export default () => (
  <BrowserRouter>
    <div>
      <Header />
      <Container />
      <Footer />
    </div>
  </BrowserRouter>
);

