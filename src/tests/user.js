import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";

chai.should();
chai.use(chaiHttp);

describe("User", () => {
  let testUser = {};

  describe("/POST register user", () => {
    it("it should POST new user", done => {
      const newUser = {
        name: "new name4",
        password: "password",
        email: "test_new4@test.com",
      };
      chai
        .request(app)
        .post("/api/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          testUser = res.body;
          done();
        });
    });
  });

  describe("/GET all users", () => {
    it("it should GET all users", done => {
      chai
        .request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${testUser.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/GET all users - no token", () => {
    it("it should fail to GET all users", done => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message").eql("Please log in first");
          done();
        });
    });
  });

  describe("/PATCH update user", () => {
    it("it should PATCH update user", done => {
      const updatedUser = {
        name: "test user",
        profileImageUrl: "awesome new test user - updated",
      };
      chai
        .request(app)
        .patch(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send(updatedUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eql(updatedUser.name);
          done();
        });
    });
  });

  describe("/PATCH update user - no token", () => {
    it("it should fail to PATCH update user", done => {
      const updatedUser = {
        name: "test user",
        profileImageUrl: "awesome new test user - updated",
      };
      chai
        .request(app)
        .patch(`/api/users/${testUser._id}`)
        .send(updatedUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message").eql("Please log in first");
          done();
        });
    });
  });

  describe("/DEL delete user", () => {
    it("it should DEL delete user", done => {
      chai
        .request(app)
        .del(`/api/users/${testUser._id}`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(testUser._id);
          done();
        });
    });
  });

  describe("/DEL delete user - no token", () => {
    it("it should fail to DEL delete user", done => {
      chai
        .request(app)
        .del(`/api/users/${testUser._id}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message").eql("Please log in first");
          done();
        });
    });
  });
});
