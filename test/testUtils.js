/* eslint-disable no-unexpected-multiline */

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../');

chai.use(chaiHttp);
const expect = chai.expect;

const testReqUtil = method => (route, id = '', data = {}) =>
  chai
    .request(app)
    [method](`${route}/${id}`)
    .send(data);

const postReq = testReqUtil('post');
const deleteReq = testReqUtil('delete');
const getReq = testReqUtil('get');

module.exports = {
  postReq,
  deleteReq,
  getReq,
};
