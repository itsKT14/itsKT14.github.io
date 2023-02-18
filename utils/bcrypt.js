const bcrypt = require('bcryptjs');

const securePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const comparePassword = async (logPassword, UserPassword) => {
    const isValid = await bcrypt.compare(logPassword, UserPassword);
    return isValid;
}

module.exports = {
    securePassword,
    comparePassword
};