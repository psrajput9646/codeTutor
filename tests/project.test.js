const request = require("supertest");
const app = require("../app");
const db = require("../server/models");
const User = db.user;
const Project = db.project;
const bcrypt = require("bcryptjs");

describe("Test Project methods.", () => {
  const user1 = "TestUser1";
  const user2 = "TestUser2";
  const password = "$1TestUser";
  const name = "ProjectTesting";
  const description = "This is a test description."

  let token;
  let projectId1;
  let userId;

  beforeAll(() => {
    // Initialize Test User1
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        return User.findOrCreate({
          where: {
            username: user1
          },
          defaults: {
            username: user1,
            password: hash,
            email: "TestUser1@testing.com",
            firstName: "Test",
            lastName: "Test"
          }
        });
      });
    });
  });

  test("It should log the user in and get token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username:user1, password })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    token = response.body.token;
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
      .post("/api/project/26")
      .set("Accept", "application/json")
      .set("x-access-token", token);
    expect(response.statusCode).toBe(400);
  });

  afterEach(() => {
    User.findOne({ where: {username: user1} })
    .then(user => {
        if (user) {
             user.destroy({force: true})
        }
    });

    Project.findAll({ where: {name: name} })
    .then(projects => {
      projects.map(function(project) {
        if (project) {
          project.destroy({force: true})
        }
      });
    });
})
});

afterAll(() => {
    // Close connection
    return db.sequelize.close();
  });
