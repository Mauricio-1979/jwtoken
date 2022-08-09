const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
    try {
        // req.user has the payload
        //res.json(req.user);

        const user = await pool.query(`SELECT todo_id, title, task, users.users_id, users.user_name FROM todo LEFT JOIN users ON todo.users_id = users.users_id WHERE todo.users_id = $1`, [req.user])
        
        console.log("es esto: ",user.rows);
        if(user.rows.length !== 0){
            res.json(user.rows);
        }else {
            const solo = await pool.query("SELECT users_id, user_name FROM users WHERE users_id = $1", [req.user])
            res.json(solo.rows)
        }
        //res.json(user.rows[0].users_id);
        

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Errorer");
    }
})

router.post("/todo", async (req, res) => {
    const {title, task, users_id} = req.body
    try{
        const newTask = await pool.query("INSERT INTO todo (title, task, users_id) VALUES($1, $2, $3) RETURNING *", [title, task, users_id])
        console.log(newTask.rows)
        res.status(200).json(newTask.rows)
    } catch (err){
        console.log(err.message)
        res.status(500).json("Error SQL")
    }
})

router.put("/todo/:id", async(req, res) => {
    const {id} = req.params;
    const {title, task} = req.body;
    try {
        const tareas = await pool.query("UPDATE todo SET title= $1 , task = $2 WHERE todo_id = $3",[title, task, id])
        res.status(200).json(tareas.rowCount)
    } catch (err) {
        console.log(err.message)
        res.status(500).json("id don't found")
    }
})

router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const eliminar = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.status(200).json(eliminar.rowCount)
    } catch (err){
        console.log(err)
        res.status(500).json("id to delete not found")
    }
})



module.exports = router;