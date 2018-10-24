import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";
import { token, testUser, testPost } from "./auth";

chai.should();
chai.use(chaiHttp);

let commentId;

describe("Comment", () => {
  describe("/GET all comments", () => {
    it("it should GET all comments", done => {
      chai
        .request(app)
        .get("/api/comments")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/GET all comments - no token", () => {
    it("it should fail to GET all comments", done => {
      chai
        .request(app)
        .get("/api/comments")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql("Please log in first");
          done();
        });
    });
  });

  describe("/POST create comment", () => {
    it("it should POST create comment", done => {
      const newComment = {
        body: "awesome new test comment",
        postId: testPost._id,
        userId: testUser._id
      };
      chai
        .request(app)
        .post("/api/comments")
        .set("Authorization", `Bearer ${token}`)
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("body").eql(newComment.body);
          commentId = res.body._id;
          done();
        });
    });
  });

  describe("/POST create comment - no token", () => {
    it("it should fail to POST create comment", done => {
      const newComment = {
        body: "awesome new test comment",
        postId: testPost._id,
        userId: testUser._id
      };
      chai
        .request(app)
        .post("/api/comments")
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql("Please log in first");
          done();
        });
    });
  });

  describe("/PATCH update comment", () => {
    it("it should PATCH update comment", done => {
      const updatedComment = {
        body: "awesome new test comment - updated",
        postId: testPost._id,
        userId: testUser._id
      };
      chai
        .request(app)
        .patch(`/api/comments/${commentId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(updatedComment)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("body").eql(updatedComment.body);
          done();
        });
    });
  });

  describe("/PATCH update comment - no token", () => {
    it("it should fail to PATCH update comment - no token", done => {
      const updatedComment = {
        body: "awesome new test comment - updated",
        postId: testPost._id,
        userId: testUser._id
      };
      chai
        .request(app)
        .patch(`/api/comments/${commentId}`)
        .send(updatedComment)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql("Please log in first");
          done();
        });
    });
  });

  describe("/DEL delete comment", () => {
    it("it should DEL delete comment", done => {
      chai
        .request(app)
        .del(`/api/comments/${commentId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(commentId);
          done();
        });
    });
  });

  describe("/DEL delete comment - no token", () => {
    it("it should fail to DEL delete comment", done => {
      chai
        .request(app)
        .del(`/api/comments/${commentId}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql("Please log in first");
          done();
        });
    });
  });
});
