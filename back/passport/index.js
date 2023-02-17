const passport = require('passport');
const local = require('./local');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await user.findOne({ id: id })
            done(null, user); // req.user
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};