import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../index';
import { token, testUser } from './auth';

chai.should();
chai.use(chaiHttp);

let postId;

describe('Post', () => {
  describe('/GET all posts', () => {
    it('it should GET all posts', done => {
      chai
        .request(app)
        .get('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/GET all posts - no token', () => {
    it('it should fail to GET all posts', done => {
      chai
        .request(app)
        .get('/api/posts')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql('Please log in first');
          done();
        });
    });
  });

  describe('/POST create post', () => {
    it('it should POST create post', done => {
      const newPost = {
        title: 'test post',
        body: 'awesome new test post',
        userId: testUser._id,
      };
      chai
        .request(app)
        .post('/api/posts')
        .set('Authorization', `Bearer ${token}`)
        .send(newPost)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(newPost.title);
          postId = res.body._id;
          done();
        });
    });
  });

  describe('/POST create post - no token', () => {
    it('it should fail to POST create post', done => {
      const newPost = {
        title: 'test post',
        body: 'awesome new test post',
        userId: testUser._id,
      };
      chai
        .request(app)
        .post('/api/posts')
        .send(newPost)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql('Please log in first');
          done();
        });
    });
  });

  describe('/PATCH update post', () => {
    it('it should PATCH update post', done => {
      const updatedPost = {
        title: 'test post',
        body: 'awesome new test post - updated',
        userId: testUser._id,
      };
      chai
        .request(app)
        .patch(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedPost)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(updatedPost.title);
          done();
        });
    });
  });

  describe('/PATCH update post - no token', () => {
    it('it should fail to PATCH update post', done => {
      const updatedPost = {
        title: 'test post',
        body: 'awesome new test post - updated',
        userId: testUser._id,
      };
      chai
        .request(app)
        .patch(`/api/posts/${postId}`)
        .send(updatedPost)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql('Please log in first');
          done();
        });
    });
  });

  describe('/DEL delete post', () => {
    it('it should DEL delete post', done => {
      chai
        .request(app)
        .del(`/api/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(postId);
          done();
        });
    });
  });

  describe('/DEL delete post - no token', () => {
    it('it should fail to DEL delete post', done => {
      chai
        .request(app)
        .del(`/api/posts/${postId}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.have
            .property('message')
            .eql('Please log in first');
          done();
        });
    });
  });
});
