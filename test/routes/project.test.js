/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

const chai = require('chai');
const app = require('../../');
const code = require('../../utils/statusCodes');
const knex = require('../../db/knex');
const { getReq, postReq } = require('../testUtils');

const expect = chai.expect;

describe('Project', () => {
  beforeEach((done) => {
    knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        return knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback().then(() => {
      done();
    });
  });

  const seedData = {
    name: 'Graph Algorithm Visualizer',
    description: 'Fun way to visualize how common graph algorithms work.',
    is_complete: false,
  };

  describe('GET /api/projects', () => {
    const route = '/api/projects';

    it('should return all projects', async () => {
      const res = await getReq(route);

      expect(res).to.have.status(code.OK);
      expect(res.body[0].name).to.equal(seedData.name);
      expect(res.body[0].description).to.equal(seedData.description);
      expect(res.body[0].is_complete).to.equal(seedData.is_complete);
    });
  });

  describe('GET /api/projects/:id', () => {
    const validRoute = '/api/projects/1';
    const invalidRoute = '/api/projects/32';

    it('should return project with given id', async () => {
      const res = await getReq(validRoute);

      expect(res).to.have.status(code.OK);
      expect(res.body.id).to.be.a('number');
      expect(res.body.name).to.equal(seedData.name);
      expect(res.body.description).to.equal(seedData.description);
      expect(res.body.is_complete).to.equal(seedData.is_complete);
      expect(res.body.actions).to.have.length(4);
      expect(res.body.actions[0]).to.have.property('id');
      expect(res.body.actions[0]).to.have.property('notes');
      expect(res.body.actions[0]).to.have.property('description');
      expect(res.body.actions[0].project_id).to.be.undefined;
      expect(res.body.contexts).to.have.length(2);
      expect(res.body.contexts[0]).to.have.property('id');
      expect(res.body.contexts[0]).to.have.property('context');
    });

    it('should return an error message when given an invalid id', async () => {
      const res = await getReq(invalidRoute);

      expect(res).to.have.status(code.USER_ERROR);
      expect(res.body.error).to.be.true;
      expect(res.body.message).to.equal('Must provide a valid project ID.');
    });
  });

  describe('POST /api/projects', () => {
    const route = '/api/projects';
    const validData = {
      name: 'Compiler in C',
      description: 'Writing a compiler to understand memory allocation and low-level abstractions.',
    };
    const emptyName = { name: '', description: 'hello' };

    it('should create a new project', async () => {
      const res = await postReq(route, validData);

      expect(res).to.have.status(code.OK);
      expect(res.body.id).to.be.a('number');
      expect(res.body.success).to.be.true;
    });

    it('returns an error message when given an empty project name', async () => {
      const res = await postReq(route, emptyName);

      expect(res).to.have.status(code.USER_ERROR);
      expect(res.body.error).to.be.true;
      expect(res.body.message).to.equal('Must provide a project name.');
    });
  });
});
