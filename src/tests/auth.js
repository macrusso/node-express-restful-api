import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";

chai.should();
chai.use(chaiHttp);

export let token;

describe("Auth", () => {
  describe("/POST register user", () => {
    it("it should POST new user", done => {
      const newUser = {
        name: "testName",
        password: "password",
        email: "test@test.com"
      };
      chai
        .request(app)
        .post("/api/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          done();
        });
    });
  });

  describe("/POST register user - missing data", () => {
    it("it should POST new user", done => {
      const newUser = {
        name: "testName"
      };
      chai
        .request(app)
        .post("/api/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql(
              "User validation failed: password: Path `password` is required., email: Path `email` is required."
            );
          done();
        });
    });
  });

  describe("/POST register user - existing name", () => {
    it("it should POST new user", done => {
      const newUser = {
        name: "testName",
        password: "password",
        email: "test@test.com"
      };
      chai
        .request(app)
        .post("/api/auth/register")
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql("Sorry, that name and/or email is taken");
          done();
        });
    });
  });

  describe("/POST login user", () => {
    it("it should POST login user", done => {
      const user = {
        password: "password",
        email: "test@test.com"
      };
      chai
        .request(app)
        .post("/api/auth/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          token = res.body.token;
          done();
        });
    });
  });

  describe("/POST login user - wrong credentials", () => {
    it("it should POST login user", done => {
      const user = {
        password: "password",
        email: "testtest@test.com"
      };
      chai
        .request(app)
        .post("/api/auth/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have
            .property("message")
            .eql("Invalid Email and/or Password");
          done();
        });
    });
  });
});
