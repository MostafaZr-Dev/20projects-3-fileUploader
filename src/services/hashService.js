const {v4:uuid} = require("uuid");


exports.generateID = () => {
    return uuid();
}