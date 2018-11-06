import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import { User, Post } from '../models';

chai.should();
chai.use(chaiHttp);

export const testUser = new User({
  name: 'test user',
  password: 'password',
  email: 'test_user@test.com',
}).save();

export const testPost = new Post({
  title: 'test post',
  body: 'awesome new test post',
  userId: testUser._id,
}).save();

export let token;

describe('Auth', () => {
  describe('/POST register user', () => {
    it('it should POST new user', done => {
      const newUser = {
        name: 'new name',
        password: 'password',
        email: 'test_new@test.com',
      };
      chai
        .request(app)
        .post('/api/auth/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          done();
        });
    });
  });

  describe('/POST register user - missing data', () => {
    it('it should fail to POST new user', done => {
      const newUser = {
        name: 'new name',
      };
      chai
        .request(app)
        .post('/api/auth/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql(
              'User validation failed: password: Path `password` is required., email: Path `email` is required.'
            );
          done();
        });
    });
  });

  describe('/POST register user - existing name', () => {
    it('it should fail to POST new user', done => {
      const newUser = {
        name: 'new name',
        password: 'password',
        email: 'test_new@test.com',
      };
      chai
        .request(app)
        .post('/api/auth/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql('Sorry, that name and/or email is taken');
          done();
        });
    });
  });

  describe('/POST login user', () => {
    it('it should POST login user', done => {
      const user = {
        password: 'password',
        email: 'test_new@test.com',
      };
      chai
        .request(app)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          token = res.body.token;
          done();
        });
    });
  });

  describe('/POST login user - wrong credentials', () => {
    it('it should fail to POST login user', done => {
      const user = {
        password: 'password',
        email: 'testtest@test.com',
      };
      chai
        .request(app)
        .post('/api/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql('Invalid Email and/or Password');
          done();
        });
    });
  });
});
