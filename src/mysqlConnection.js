const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pratap",
  database: "pratap",
});

const queryHandeler = util.promisify(connection.query).bind(connection);

const executeQuery = async (query) => {
  try {
    const data = await queryHandeler(query);
    console.log(rows);
    return { staus: 200, data };
  } catch (e) {
    console.error("Error while executing query", e.message);
    return { status: 500, message: e.message };
  } finally {
    connection.end();
  }
};

/** Assume cart table has following schema
 *CREATE TABLE cart (
  id VARCHAR(1) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INT(11) NOT NULL
);
 */

module.exports = executeQuery;
