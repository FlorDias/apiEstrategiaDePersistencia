const request = require("supertest");
const app = require("../app");

describe("GET materias", () => {
  it("obtiene las materias", (done) => {
    request(app)
      .get("/mat")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});

describe("GET user", () => {
  it("obtiene los usuarios", (done) => {
    request(app)
      .get("/usu")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});

describe("GET alumnos", () => {
  it("obtiene los alumnos", (done) => {
    request(app)
      .get("/alu")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});

describe("GET profesores", () => {
  it("obtiene los profesores", (done) => {
    request(app)
      .get("/pro")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});

describe("GET carreras", () => {
  it("obtiene las carreras", (done) => {
    request(app)
      .get("/car")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});

describe("GET alumnoMateria", () => {
  it("obtiene alumnoMateria", (done) => {
    request(app)
      .get("/alumat")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});

describe("GET profesorMateria", () => {
  it("obtiene profesorMateria", (done) => {
    request(app)
      .get("/promat")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200, done);
  });
});
