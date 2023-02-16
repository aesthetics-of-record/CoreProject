const express = require("express");
const app = express();
const path = require("path");

// 환경변수 사용
require("dotenv").config();

// mongo db 사용설정
const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
let db;
let post;
let user;
MongoClient.connect(process.env.DB_URL, (err, client) => {
  db = client.db("core_data");
  post = db.collection("post");
  user = db.collection("user");
});

// cors 설정
const cors = require("cors");
app.use(cors());

// api통신을 위한 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, process.env.BASE_URL)));

// 서버 열기
app.listen(process.env.PORT, function () {
  console.log(`listening on ${process.env.PORT}`);
});

// api 데이터 요청 url
app.get("/api/post/read", async (req, res) => {
  console.log("api 요청이 왔습니다~");
  const result = await post.find().toArray();
  res.json(result);
});

// 데이터 삭제 url
app.delete("/delete/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);

  const result = await post.deleteOne({ _id: id });
  res.send("success");
});

// 데이터 추가 url
app.post("/add", async (req, res) => {
  console.log(req.body);

  //DB에 저장
  await post.insertOne({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  });
  res.send("success");
});

// 데이터 수정 url
// app.put("/edit/:id", (req, res) => {
//   const id = new ObjectId(req.params.id);
//
//   const result = post.updateOne(
//     { _id: id },
//     { $ser: { title: req.body.title, content: req.body.content } }
//   );
// });

//
// 로그인 방식 구현하기
//
const bcrypt = require("bcrypt");

// 로그인 요청 post
app.post("/login", async (req, res) => {
  const exUser = await user.findOne({ id: req.body.id });
  if (!exUser)
    return res.json({ success: false, message: "존재하지 않는 아이디입니다." });

  const result = await bcrypt.compare(req.body.pw, exUser.pw);

  if (!result)
    return res.json({ success: false, message: "비밀번호가 틀렸습니다." });

  if (result) return res.json({ success: true, user: exUser });
});

// 회원가입 요청 post
app.post("/register", async (req, res) => {
  // 패스워드 암호화
  const hashed_password = await bcrypt.hash(req.body.pw, 10);

  //DB에 저장
  await db.collection("user").insertOne({
    id: req.body.id,
    pw: hashed_password,
    nickname: req.body.nickname,
  });
  res.send("success");
});

// 언로그인 여부체크 get
app.get("/check/unlogin", check_unlogin, (req, res) => {
  res.send("unlogin");
});

// 로그인 여부체크 get
app.get("/check/login", check_login, (req, res) => {
  res.send("login");
});

// 로그인 체크 미들웨어
function check_login(req, res, next) {
  console.log("login:" + req.user);
  if (req.user) {
    next();
  } else {
    console.log("로그인이 안 되어 있습니다.");
  }
}

// 언로그인 체크 미들웨어
function check_unlogin(req, res, next) {
  console.log("login:" + req.user);
  if (req.user) {
    console.log("이미 로그인이 되어있습니다.");
  } else {
    next();
  }
}

// 리액트 라우터 사용을 위한, 기본 url
app.get("*", function (req, res) {
  console.log(path.join(__dirname, "../front/build/index.html"));
  res.sendFile(path.join(__dirname, process.env.BASE_URL, "/index.html"));
});
