const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { isLogin, isNotLogin } = require('./middlewares/check_login');

const router = express.Router();


// 로그인 요청
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),);


// 회원가입 요청 post
router.post("/register", async (req, res) => {
    // 패스워드 암호화
    const hashed_password = await bcrypt.hash(req.body.pw, 10);

    //DB에 저장
    await user.insertOne({
        id: req.body.id,
        pw: hashed_password,
        nickname: req.body.nickname,
    });
    res.send("success");
});

module.exports = router;