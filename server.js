const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
// app.set('view engine', 'ejs');
// app.set('views', [__dirname + '/src/views'])


// ROUTER SECTION
const userRouter = require('./src/router/user.router');
app.use('/api', userRouter);




const DBdata = 'mongodb+srv://nayan:nayan123@cluster0.o2qoh.mongodb.net/tambolaGame'
mongoose.set('strictQuery', false);
mongoose.connect(DBdata, { useNewUrlParser: true, useUnifiedTopology: true }).then(connectData => {
    console.log('Connect with Database');
    app.listen(PORT, function () {
        console.log('Express app running on port ' + PORT)
        console.log(`http://127.0.0.1:${PORT}`)
    });
})