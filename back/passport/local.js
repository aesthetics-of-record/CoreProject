const local = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

module.exports = () => {
    local.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
    }, async (id, pw, done) => {
        try {
            const user = await user.findOne({ id: id });
            if (!user) {
                return done(null, false, { reason: '존재하지 않는 아이디입니다.' });
            }
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }));
};