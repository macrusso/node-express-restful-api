import chaiHttp from "chai-http";
import chai from "chai";
import app from "../index";

chai.should();
chai.use(chaiHttp);

describe("Comment", () => {
  let testUser = {};
  let testPost = "";
  let testCommentId = "";

  describe("/POST register user", () => {
    it("it should POST new user", done => {
      const newUser = {
        name: "new name2",
        password: "password",
        email: "test_new2@test.com",
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

  describe("/POST create post", () => {
    it("it should POST create post", done => {
      const newPost = {
        title: "test post",
        body: "awesome new test post",
        userId: testUser._id,
      };
      chai
        .request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testUser.token}`)
        .send(newPost)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("title").eql(newPost.title);
          testPost = res.body;
          done();
        });
    });
  });

  describe("/GET all comments", () => {
    it("it should GET all comments", done => {
      chai
        .request(app)
        .get("/api/comments")
        .set("Authorization", `Bearer ${testUser.token}`)
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
          res.body.error.should.have.property("message").eql("Please log in first");
          done();
        });
    });
  });

  describe("/POST create comment", () => {
    it("it should POST create comment", done => {
      const newComment = {
        body: "awesome new test comment",
        postId: testPost._id,
        userId: testUser._id,
      };
      chai
        .request(app)
        .post("/api/comments")
        .set("Authorization", `Bearer ${testUser.token}`)
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("body").eql(newComment.body);
          testCommentId = res.body._id;
          done();
        });
    });
  });

  describe("/POST create comment - no token", () => {
    it("it should fail to POST create comment", done => {
      const newComment = {
        body: "awesome new test comment",
        postId: testPost._id,
        userId: testUser._id,
      };
      chai
        .request(app)
        .post("/api/comments")
        .send(newComment)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message").eql("Please log in first");
          done();
        });
    });
  });

  describe("/PATCH update comment", () => {
    it("it should PATCH update comment", done => {
      const updatedComment = {
        body: "awesome new test comment - updated",
        postId: testPost._id,
        userId: testUser._id,
      };
      chai
        .request(app)
        .patch(`/api/comments/${testCommentId}`)
        .set("Authorization", `Bearer ${testUser.token}`)
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
        userId: testUser._id,
      };
      chai
        .request(app)
        .patch(`/api/comments/${testCommentId}`)
        .send(updatedComment)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.have.property("message").eql("Please log in first");
          done();
        });
    });
  });

  describe("/DEL delete comment", () => {
    it("it should DEL delete comment", done => {
      chai
        .request(app)
        .del(`/api/comments/${testCommentId}`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id").eql(testCommentId);
          done();
        });
    });
  });

  describe("/DEL delete comment - no token", () => {
    it("it should fail to DEL delete comment", done => {
      chai
        .request(app)
        .del(`/api/comments/${testCommentId}`)
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
