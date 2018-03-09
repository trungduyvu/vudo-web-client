// @flow

import React from 'react';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AWS } from '../../config';

type State = {
  name: string,
  email: string,
  password: string
};

export default class Register extends React.Component<{}, State> {
  constructor(props: Object) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange: Function;
  handleEmailChange: Function;
  handlePasswordChange: Function;
  handleSubmit: Function;

  handleEmailChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const email = event.target.value;

    this.setState(() => ({
      email,
    }));
  };

  handleNameChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const name = event.target.value;

    this.setState(() => ({
      name,
    }));
  };

  handlePasswordChange(event: SyntheticInputEvent<HTMLInputElement>) {
    const password = event.target.value;

    this.setState(() => ({
      password,
    }));
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const { email, password, name } = this.state;

    const userPool = new CognitoUserPool({
      UserPoolId: AWS.UserPoolId,
      ClientId: AWS.ClientId,
    });

    const attributeList =
      [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
        new CognitoUserAttribute({
          Name: 'name',
          Value: name,
        }),
      ];


    let cognitoUser;
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        return;
      }
      cognitoUser = result.user;
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="name">
          Name:
          <input
            id="name"
            placeholder="name"
            type="text"
            autoComplete="on"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </label>
        <label className="header" htmlFor="email">
          Email:
          <input
            id="email"
            placeholder="email"
            type="text"
            autoComplete="on"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
        </label>
        <label className="header" htmlFor="password">
          Password:
          <input
            id="password"
            placeholder="password"
            type="password"
            autoComplete="off"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </label>
        <button type="submit">
          Register!
        </button>
      </form>
    );
  }
}

Register.propTypes = {

};
