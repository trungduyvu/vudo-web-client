// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/" href="/">Home</Link></li>
        <li><Link to="/about" href="/about">About</Link></li>
        <li><Link to="/sign-up" href="/register">Register</Link></li>
        <li><Link to="/sign-in" href="/sign-in">Sign In</Link></li>
      </ul>
    </nav>
  </header>
);
