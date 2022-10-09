const base = require("./webpack.config");

module.exports = {
    ...base,
    devtool: undefined,
    mode: 'production',
};
