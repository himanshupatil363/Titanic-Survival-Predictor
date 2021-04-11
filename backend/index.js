const express = require('express');
const bodyParser = require('body-parser');
const {spawn} = require("child_process");
require('dotenv').config()
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/',(req,res)=>{

    const pythonProcess = spawn('python',['./ml/model.py',JSON.stringify(req.body)]);
    pythonProcess.stdout.on('data',data => {
        res.json({"data":data.toString(),"success":true})
    })
    pythonProcess.stderr.on('data',(err)=>{
        console.log(`${err}`)
    })
})

app.listen(port, () => console.log(`Started server at http://localhost:${port}`));