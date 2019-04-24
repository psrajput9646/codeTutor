const request = require("supertest");
const app = require("../app");
const db = require("../server/models");
const config = require("../server/config");
const User = db.user;
const Project = db.project;
const jwt = require('jsonwebtoken')

describe("Test Project methods.", () => {
  const user1 = "TestUser1";
  const user2 = "TestUser2";
  const password = "$1TestUser";
  const name = "ProjectTesting";
  const description = "This is a test description.";

  let token;
  let projectId1;
  let userId;

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
        let tokenBody = {
          id: user.id,
          username: user.username
        };
        return jwt.sign(tokenBody, config.secret, {
          expiresIn: 1209600 // 2 weeks
        });
      })
      .then(createdToken => {
        token = createdToken;
      })
      .catch(err => {
        console.log(err);
      });
  });

  test("It should reject without a token", async () => {
    const response = await request(app)
      .post("/api/project/create")
      .send({ name, description })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(403);
  });

  test("It should create a project", async () => {
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

  afterEach(() => {
    Project.findAll({ where: { name: name } }).then(projects => {
      projects.map(function(project) {
        if (project) {
          project.destroy({ force: true });
        }
      });
    });
  });
});
