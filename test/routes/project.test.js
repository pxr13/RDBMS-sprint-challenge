/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

const chai = require('chai');
const app = require('../../');
const code = require('../../utils/statusCodes');
const { getReq } = require('../testUtils');

const expect = chai.expect;

describe('Project', () => {
  describe('GET /api/projects', () => {
    const route = '/api/projects';

    it('should return all shows', async () => {
      const res = await getReq(route);

      expect(res).to.have.status(code.OK);
      expect(res.body.success).to.be.true;
    });
  });
});
