// @flow

import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Home from '../home/home';
import SignIn from '../sign-in/sign-in';
import Register from '../register/register';


export default () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </main>
);

