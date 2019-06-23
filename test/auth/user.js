'use strict';

const Lab = require('@hapi/lab');
const Code = require('code');
const Fixtures = require('../fixtures');
const { Server } = Fixtures;

const lab = exports.lab = Lab.script();

const { describe, it, before } = lab;
const { expect } = Code;

describe('GET /prosody/auth/user', () => {

  let server;

  before(async () => {

    server = await Server;
  });

  it('requires auth', () => {

    return server.inject({ method: 'GET', url: '/prosody/auth/user' })
      .then((res) => {

        expect(res.statusCode).to.equal(401);
      });
  });

  it('works', () => {

    const headers = {
      authorization: Fixtures.prosodyTokenHeader({ id: 'testUser' }, 'users')
    };
    return server.inject({ method: 'GET', url: '/prosody/auth/user', headers })
      .then((res) => {

        expect(res.statusCode).to.equal(200);
        expect(res.result).to.equal('true');
      });
  });
});
