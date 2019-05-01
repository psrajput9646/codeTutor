const request = require("supertest");
const app = require("../app");
const db = require("../server/models");
const config = require("../server/config");
const User = db.user;
const Project = db.project;
const Comment = db.comment;
const jwt = require("jsonwebtoken");

describe("Test commenting.", () => {
  const user1 = "testusercomment";
  const user2 = "TestUser2";
  const password = "$1TestUser";
  const name = "ProjectTesting";
  const description = "This is a test description.";

  let token;
  let projectId;
  let userId;
  let commentId;

  beforeAll(() => {
    // Initialize Test User1
    return User.findOrCreate({
      where: {
        username: user1
      },
      defaults: {
        username: user1,
        password: password,
        email: "TestUser1@testing.com",
        firstName: "Test",
        lastName: "Test"
      }
    })
      .then(user => {

        userId = user[0].dataValues.id;
        let tokenBody = {
          id: userId,
          username: user.username
        };
        return jwt.sign(tokenBody, config.secret, {
          expiresIn: 1209600 // 2 weeks
        })
      })
      .then(createdToken => {
        token = createdToken;
        return Project.findOrCreate({
          where: {
            userId
          },
          defaults: {
            name: "TestingProject",
            userId
          }
        }).then(project => {
          projectId = project[0].dataValues.id;
          return Comment.findOrCreate({
            where: {
              projectId
            },
            defaults: {
              content: "testing",
              projectId,
              userId
            }
          }).then(comment => {
            commentId = comment[0].dataValues.id;
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  test("It should get all comments on a project", async () => {
    await new Promise((resolve, reject) => {
      request(app)
        .get("/api/comment/comments/" + projectId)
        .set("Accept", "application/json")
        .set("x-access-token", token)
        .then(response => {
          expect(response.body.length).toBeGreaterThan(0);
          resolve();
        });
    });
  });

  test("It should create a comment", async () => {
    await new Promise((resolve, reject) => {
      request(app)
        .post("/api/comment/create")
        .send({content: "testing", projectId})
        .set("Accept", "application/json")
        .set("x-access-token", token)
        .then(response => {
          expect(response.statusCode).toBe(200);
          resolve()
        });
    })
  })

  test("It should be able to upvote a comment", async () => {
    await new Promise((resolve, reject) => {
      request(app)
      .post("/api/comment/vote/" + commentId)
      .set("Accept", "application/json")
      .set("x-access-token", token)
      .then(response => {
        expect(response.statusCode).toBe(200);
        resolve()
      });
    })
  })

  /*   test("It should create a project", async () => {
    const response = await request(app)
      .post("/api/project/create")
      .send({ name, description })
      .set("Accept", "application/json")
      .set("x-access-token", token);
    expect(response.statusCode).toBe(200);
    projetId1 = response.body.id;
  });

  test("It should reject without project id", async () => {
    const response = await request(app)
      .post("/api/project/")
      .set("Accept", "application/json")
      .set("x-access-token", token);
    expect(response.statusCode).toBe(404);
  });
 */

  afterAll(() => {
    Project.findAll({ where: { name: "TestingProject" } })
      .then(projects => {
        projects.map(function(project) {
          return project.destroy({ force: true });
        });
      })
      .then(() => {
        User.findAll({ where: { username: "testusercomment" } }).then(users => {
          users.map(user => {
            return user.destroy({ force: true });
          });
        });
      })
      .then(() => {
        Comment.findAll({ where: { content: "testing" } }).then(comments => {
          comments.map(comment => {
            return comment.destroy({ force: true });
          });
        });
      });
  });
});
