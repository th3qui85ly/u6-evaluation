const http = require("http");
// const app = require("./app");
const app = require("./app");
const PORT = 1912;
const connectToDB = require("./MongoDb");

http.createServer(app).listen(PORT, () => {
  new connectToDB();
  console.log(`App running at PORT : ${PORT}`);
});