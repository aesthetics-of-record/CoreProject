// 로그인 체크 미들웨어
exports.isLogin = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.')
    }
}

// 낫로그인 체크 미들웨어
exports.isNotLogin = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
}