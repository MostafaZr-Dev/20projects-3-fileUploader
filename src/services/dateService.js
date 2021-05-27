const dateTime = require('date-and-time');

exports.formatDate = (date) => {

    return dateTime.format(date, "YYYY-MM-DD HH:mm");

}