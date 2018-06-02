/* eslint-disable no-unexpected-multiline */

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../');

chai.use(chaiHttp);
const expect = chai.expect;

const testReqUtil = method => (route, data = {}) =>
  chai
    .request(app)
    [method](`${route}`)
    .send(data);

const postReq = testReqUtil('post');
const deleteReq = testReqUtil('delete');
const getReq = testReqUtil('get');
const putReq = testReqUtil('put');

module.exports = {
  postReq,
  deleteReq,
  getReq,
  putReq,
};
