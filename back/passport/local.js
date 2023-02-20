const local = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

module.exports = () => {
  local.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "pw",
        session: true,
      },
      async (id, pw, done) => {
        try {
          const user = await User.findOne({ id: id });
          if (!user) {
            console.log(1);
            return done(null, false, { reason: "존재하지 않는 아이디입니다." });
          }
          const result = await bcrypt.compare(pw, user.pw);
          if (result) {
            console.log(2);
            return done(null, user);
          }
          console.log(3);
          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
