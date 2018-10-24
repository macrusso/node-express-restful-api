import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";
import { token, testUser, testPost } from "./auth";

chai.should();
chai.use(chaiHttp);

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
          done();
        });
    });
  });
});
