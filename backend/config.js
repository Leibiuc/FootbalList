const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    endpoint: process.env.end_point,
    path: process.env.path_program,
    port: process.env.PORT
}