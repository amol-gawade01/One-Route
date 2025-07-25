const http = require("http")
const app = require('./app')
const conneectToDB = require('./DB/db')
const port = process.env.PORT || 3000



const server = http.createServer(app)
conneectToDB();

server.listen(port,() => {
    console.log(`server is running on ${port}`);
});