import mongoose from "mongoose";
import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";
import { token } from "./auth";

chai.should();
chai.use(chaiHttp);

describe("User", () => {
  describe("/GET all users", () => {
    it("it should GET all users", done => {
      chai
        .request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`)
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
          res.body.error.should.have
            .property("message")
            .eql("Please log in first");
          done();
        });
    });
  });
});
