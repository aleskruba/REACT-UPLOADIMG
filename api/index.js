
const express = require("express")
const app = express()
const mysql = require("mysql2") 
const path = require("path") 
const cors = require('cors')
const bodyParser = require("body-parser")
const multer = require("multer") 
const port = process.env.PORT || 8080;

const connection = require('./config/database')

app.use(cors())

app.get("/", (req,res) => {
        res.json({msg:'welcome'})
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public_html/','uploads'),
        filename: function (req,file,cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
})

app.post('/imageupload', async (req,res) => {
    try {
        let upload = multer({storage:storage}).single('avatar')

        upload(req,res, function(err) {
            if(!req.file) {
                return res.send('Please select an Image to upload')
            } else if (err instanceof multer.MulterError) {
                return res.send(err)
            }
               else if (err) {
                return res.send(err)

               }
     
               const classifiedsadd = {
				image: req.file.filename
			};
            const sql = "INSERT INTO user SET ?";
            connection.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
				res.json({ success: 1 })    
            });
     
            });

    } catch (err) {console.log(err)}
})

app.listen(port, () => 
    console.log(`The server is running on port ${port}`)
)