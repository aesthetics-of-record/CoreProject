const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { isLogin, isNotLogin } = require("./middlewares/check_login");

const router = express.Router();

// 로그인 요청
router.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => {
    // 로그인 성공시 실행
    res.json({ success: true });
  }
);

// 회원가입 요청 post
router.post("/", async (req, res) => {
  id = await User.findOne({ id: req.body.id });
  // 아이디 존재여부 검사
  if (id) {
    res.json({ success: false, message: "존재하는 아이디 입니다." });
  } else {
    // 패스워드 암호화
    const hashed_password = await bcrypt.hash(req.body.pw, 10);

    //DB에 저장
    await User.insertOne({
      id: req.body.id,
      pw: hashed_password,
      nickname: req.body.nickname,
    });
    res.json({ success: true });
  }
});

router.get("/session", isLogin, (req, res) => {
  console.log("로그인 되어있습니다!");
  res.json({ logIn: true, id: req.user.id, nickname: req.user.nickname });
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      //세션 파괴
      res.clearCookie("connect.sid"); //쿠키 삭제
      res.send("success");
    });
  });
});

module.exports = router;
