// @flow

export const WDS_PORT = 5000;
export const APP_CONTAINER_CLASS = 'js-app';
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`;
export const IS_PROD = process.env.NODE_ENV === 'production';

export const AWS = {
  region: 'us-east-1',
  UserPoolId: 'us-east-1_4VMg0P1Kw',
  ClientId: '4bm6nrvklsoubk22i6om4qhq2c',
};
