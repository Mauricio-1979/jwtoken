const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
    try {
        // req.user has the payload
        //res.json(req.user);

        const user = await pool.query("SELECT * FROM users WHERE users_id = $1", [req.user]) 
        console.log(user.rows[0].users_id);
        res.json(user.rows[0].users_id);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})

module.exports = router;