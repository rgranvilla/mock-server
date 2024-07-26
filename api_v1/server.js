/**
 * Require necessary libraries
 */
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import jsonServer from "json-server";
import jwt from "jsonwebtoken";

// JWT confing data
const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Create server
const server = jsonServer.create();

// Use CORS
server.use(cors());

// Create router
const router = jsonServer.router("./api_v1/db.json");

// Users database
const database = JSON.parse(fs.readFileSync("./api_v1/db.json", "UTF-8"));
const userdb = JSON.parse(fs.readFileSync("./api_v1/users.json", "UTF-8"));

// Default middlewares
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Logging middleware for requests
server.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  console.log("Query Params:", req.query);
  next();
});

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) =>
        user.email === email && bcrypt.compareSync(password, user.password)
    ) !== -1
  );
}

/**
 * Method: POST
 * Endpoint: /auth/login
 */
server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const user = userdb.users.find((user) => user.email === email);
  const token = createToken({ email, password });
  const data = {
    name: user.name,
    email: user.email,
    token,
    accessUser: ["*"],
    expires_at: new Date().getTime() + 20 * 60 * 1000, // 20 minutes
  };
  res.status(200).json({
    status: true,
    mensagem: "Login realizado com sucesso",
    data,
  });
});

/**
 * Middleware: Check authorization
 */
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

// Middleware: Pagination and response formating
server.use(/^(?!\/auth).*$/, (req, res, next) => {
  const page = req.query.page ? Number(req.query.page) : undefined;
  const perPage = req.query.perPage ? Number(req.query.perPage) : undefined;
  const searchValue = req.query.searchValue ? req.query.searchValue : undefined;

  res.sendResponse = res.send;
  if (page && perPage) {
    res.send = (body) => {
      const start = (page - 1) * perPage;
      const end = page * perPage;

      let data = JSON.parse(body);

      // Filtra os dados com base no searchValue, se estiver presente
      const total = data.length;

      // Ordena os dados por id
      const orderedById = JSON.parse(body).sort((a, b) => a.id - b.id);

      let filtered = searchValue
        ? orderedById.filter((item) =>
            Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(searchValue.toLowerCase())
            )
          )
        : orderedById;

      // console.log(`Paginating response: page ${page}, per_page ${perPage}`, {
      //   status: true,
      //   message: "Sucesso",
      //   data: filtered.slice(start, end),
      //   currentPage: page,
      //   perPage,
      //   total,
      // });

      res.sendResponse(
        JSON.stringify({
          status: true,
          message: "Sucesso",
          data: filtered.slice(start, end),
          currentPage: page,
          perPage,
          total,
        })
      );
    };
  } else {
    res.send = (body) => {
      res.sendResponse(
        JSON.stringify({
          status: true,
          mensagem: "Sucesso",
          data: JSON.parse(body),
        })
      );
    };
  }
  next();
});

// Server mount
server.use(router);
server.listen(3000, () => {
  console.log("Auth API server running on port 3000 ...");
});
