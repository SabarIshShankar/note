const path = require("path")
const fs = require("fs")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser =  require("body-parser")
const cookieParser = require("cookie-parser")
const multer =  require("multer")
const dotenv = require("dotenv")
dotenv.config();

const pagesRoutes = require("./routes/pages")
const usersRoutes = require("./routes/users")

const fileStorage - multer.diskStorage({
	destination: (req, file, cb) => {
		try{
			const pageId = req.query.pageId;
			if(!pageId){
				const err = new Error("Cannot upload images, no id provided");
				err.stausCode = 422;
				throw err;
			}
			const dir = `images/${pageId}`;
			fs.access(dir, (err) => {
				if(err){
					return fs.mkdir(dir, (err)=> cb(err, dir));
				}
				else {
					return cb(null, dir);
				}
			});
		} catch(err){
		console.log(err);
		return cb(err, dir)
	}
},
filename: (req, file, cb) => {
	const hash = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
	cb(null, hash + "-" + file.originalname);
},
});

const fileFilter = (req, file, cb) => {
	if(
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/png' ||
		file.mimetype === "image/jpeg"
	){
		cb(null, true)
	} else {
		cb(null, false);
	}
};

const app = express();