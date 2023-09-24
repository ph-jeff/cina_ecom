const randomstring = require("randomstring");

const generate = () => {
    const string = randomstring.generate({
        length: 64,
    });
    return string;
}
module.exports = generate;

