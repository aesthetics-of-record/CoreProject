const express = require("express");
const app = express();
const path = require("path");
const session = require('express-session');
const cookieParser = require('cookie-parser');

// 환경변수 사용설정
require("dotenv").config();

// cors 설정
const cors = require("cors");
app.use(cors());

// 데이터를 받기 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 리액트 사용을 위한 설정
app.use(express.static(path.join(__dirname, process.env.BASE_URL)));

// mongo db 사용설정
const { ObjectId, MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_URI)
db = client.db("core_data");
// mongo db collection
post = db.collection("post");
user = db.collection("user");





// 서버 열기
app.listen(process.env.PORT, function () {
  console.log(`listening on ${process.env.PORT}`);
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));


// 라우터
app.use('/homepost', require('./routes/home_post.js'))
app.use('/user', require('./routes/user.js'))












// 리액트 라우터 사용을 위한, 기본 url
// 가장 하단에 적어야한다.
app.get("*", function (req, res) {
  console.log(path.join(__dirname, "../front/build/index.html"));
  res.sendFile(path.join(__dirname, process.env.BASE_URL, "/index.html"));
});
