const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// 환경변수 사용설정
require("dotenv").config();

// cors 설정
const cors = require("cors");
const whitelist = [
  "http://localhost",
  "http://cbnucore.site",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error("Not Allowed Origin!")); // cors 비허용
    }
  },
  credentials: true,
};

app.use(cors(corsOptions)); // 옵션을 추가한 CORS 미들웨어 추가

// 데이터를 받기 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 리액트 사용을 위한 설정
app.use(express.static(path.join(__dirname, process.env.BASE_URL)));

// mongo db 사용설정
const { ObjectId, MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_URI);
db = client.db("core_data");
// mongo db collection
Post = db.collection("post");
User = db.collection("user");

// 서버 열기
app.listen(process.env.PORT, function () {
  console.log(`listening on ${process.env.PORT}`);
});

// 세션 로그인
const passportConfig = require("./passport");
passportConfig();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 라우터
app.use("/homepost", require("./routes/home_post.js"));
app.use("/user", require("./routes/user.js"));

// 리액트 라우터 사용을 위한, 기본 url
// 가장 하단에 적어야한다.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, process.env.BASE_URL, "/index.html"));
});
