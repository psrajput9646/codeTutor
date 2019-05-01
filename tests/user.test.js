const request = require("supertest");
const app = require("../app");
const db = require("../server/models");
const User = db.user;
const bcrypt = require("bcryptjs");
const Promise = require("bluebird");
Promise.promisifyAll(bcrypt);

describe("Test the Login", () => {
  const username = "usertesting";
  const password = "$1TestUser";

  beforeAll(() => {
    // Initialize Test User
    bcrypt
      .genSaltAsync(10)
      .then(salt => {
        return bcrypt.hashAsync(password, salt);
      })
      .then(hash => {
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

  test("It should log the user in", async () => {
    await new Promise((resolve, reject) => {
      request(app)
        .post("/api/auth/login")
        .send({ username, password })
        .set("Accept", "application/json")
        .then(response => {
          expect(response.statusCode).toBe(200);
          resolve();
        });
    });
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

/*   afterAll(() => {
    User.findOne({ where: { username } }).then(user => {
      return user.destroy({ force: true });
    });
  }); */
});

describe("Test the Registration", () => {
  // Intialize Default Testing Values
  const username = "testingaccountcreation";
  const password = "IMatchRequirements!1";
  const email = "testingguy@gmail.com";
  const firstName = "Tester";
  const lastName = "Tester";

  beforeAll(() => {
    // Initialize Test User
    return User.findOrCreate({
      where: {
        username: "thisuserexists"
      },
      defaults: {
        username: "thisuserexists",
        password: "random",
        email: "TestUser@testing.com",
        firstName: "Test",
        lastName: "Test"
      }
    });
  });

  test("It should create a user account", async () => {
    await new Promise((resolve, reject) => {
      request(app)
        .post("/api/user/create")
        .send({ username, password, email, firstName, lastName })
        .set("Accept", "application/json")
        .then(response => {
          expect(response.statusCode).toBe(201);
          resolve();
        });
    });
  });

  test("It should reject weak passwords", async () => {
    const response = await request(app)
      .post("/api/user/create")
      .send({ username, password: "weakstuff", email, firstName, lastName })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(400);
  });

  test("It should reject bad email addresses", async () => {
    const response = await request(app)
      .post("/api/user/create")
      .send({ username, password, email: "Iamnotenemail", firstName, lastName })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(400);
  });

  test("It should reject usernames that already exist", async () => {
    const response = await request(app)
      .post("/api/user/create")
      .send({
        username: "thisuserexists",
        password,
        email,
        firstName,
        lastName
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(409);
  });

  afterAll(() => {
    return User.findOne({ where: { username } }).then(user => {
      if (user) {
        user.destroy({ force: true });
      }
    });
  });
});
