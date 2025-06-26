const pool = require('./pool');

// Get all messages
async function getAllUsers() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

// Add users
async function addAUser(username, text, added = new Date()) {
    await pool.query(
        `INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)`,
        [username, text, added]
    );
}
// Delete a user
async function deleteUser(id) {
    await pool.query(`DELETE FROM messages WHERE id=$1`,[id])
}

module.exports = {
    getAllUsers,
    addAUser,
    deleteUser
};