#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255),
  username VARCHAR(20),
  added DATE
);

INSERT INTO messages (text, username, added) 
VALUES
  ('This is the first text in my db', 'Jason Statham', '2025-06-26');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://nemesis:3740@localhost:5432/messageboard",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
