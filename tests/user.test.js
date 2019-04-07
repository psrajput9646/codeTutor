const request = require("supertest");
const app = require("../app");
const db = require("../server/models");
const User = db.user;
const bcrypt = require("bcryptjs");

describe("Test the Login", () => {
  const username = "TestUser";
  const password = "$1TestUser";

  beforeAll(() => {
    // Initialize Test User
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        return User.findOrCreate({
          where: {
            username
          },
          defaults: {
            username,
            password: hash,
            email: "TestUser@testing.com",
            firstName: "Test",
            lastName: "Test"
          }
        });
      });
    });
  });

  test("It should log the user in", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username, password })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
  });

  test("It should Reject on incorrect username", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "NoWayThisUserExists", password })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(401);
  });

  test("It should Reject on incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ username, password: "$1Totallywrongpassword" })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(401);
  });
});

describe("Test the Registration", () => {
    // Intialize Default Testing Values
    const username = "TestingAccountCreation";
    const password = "IMatchRequirements!1"
    const email = "testingguy@gmail.com"
    const firstName = "Tester"
    const lastName = "Tester"

    test("It should create a user account", async () => {
        const response = await request(app)
        .post("/api/user/create")
        .send({username, password, email, firstName, lastName})
        .set("Accept", "application/json");
        expect(response.statusCode).toBe(201);
    })

    test("It should reject weak passwords", async () => {
        const response = await request(app)
        .post("/api/user/create")
        .send({username, password: "weakstuff", email, firstName, lastName})
        .set("Accept", "application/json");
        expect(response.statusCode).toBe(400);
    })

    test("It should reject bad email addresses", async () => {
        const response = await request(app)
        .post("/api/user/create")
        .send({username, password, email: "Iamnotenemail", firstName, lastName})
        .set("Accept", "application/json");
        expect(response.statusCode).toBe(400);
    })

    test("It should reject usernames that already exist", async () => {
        const response = await request(app)
        .post("/api/user/create")
        .send({username: "bly01854", password, email, firstName, lastName})
        .set("Accept", "application/json");
        expect(response.statusCode).toBe(409);
    })

    afterEach(() => {
        User.findOne({ where: {username} })
        .then(user => {
            if (user) {
              user.destroy({force: true})
            }
        })
    })
})

afterAll(() => {
    // Close connection
    return db.sequelize.close();
  });
