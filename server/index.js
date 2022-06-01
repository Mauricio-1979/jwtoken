const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')

//midleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//ROUTES//

// Register and login routes

app.use("/auth", require('./routes/jwtAuth'));
app.use("/dashboard", require('./routes/dashboard'));

const PORT=5000;
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`)
})