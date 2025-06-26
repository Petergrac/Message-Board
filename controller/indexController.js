const db = require("../db/query");

// List all users
async function getUsers(req, res) {
  const messages = await db.getAllUsers();
  res.render("index", {
    title: "Message Board",
    messages,
  });
}
// Adding Users
async function addUsers(req,res){
    const {userName: user, messageText: text} = req.body;
    await db.addAUser(user, text);
    res.redirect('/');
}
// Deleting a user
async function removeUser(req, res) {
  const { id } = req.params;
  await db.deleteUser(id);
  res.redirect('/');
}
module.exports = {
  getUsers,
  addUsers,
  removeUser
};
