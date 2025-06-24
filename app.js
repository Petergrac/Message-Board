const express = require("express");
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter")
require("dotenv").config();
const path = require('path');
// Reading port
const port = process.env.PORT;
// Creating express app
const app = new express();

// Parsing the form data to the body
app.use(express.urlencoded({ extended: true }));

// Setting up static files serving
app.use(express.static(path.join(__dirname,'public')));

// --- View Engine Setup ---
app.set('views', path.join(__dirname, 'views')); // Set the directory for your view templates
app.set('view engine', 'ejs'); // Set EJS as the view engine
// --- End View Engine Setup ---

// index route ->
app.use("/", indexRouter);

// /new route ->
app.use("/new", newRouter);


// Catch 404 and forward to error handler (optional but good for production)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Listening
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
