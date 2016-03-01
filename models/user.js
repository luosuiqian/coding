var conn = require('./db').getConnection;

exports.getPlay = function (callback) {
  conn().query('SELECT id, name, url, year, country, comment FROM play',
               function (err, results) {
    if (err) throw err;
    return callback(results);
  });
};

exports.getComment = function (callback) {
  conn().query('SELECT showid, commentid, name, score, text, usefulness, \
               C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12 \
               FROM comment',
               function (err, results) {
    if (err) throw err;
    return callback(results);
  });
};

exports.update = function (showid, commentid, coding, callback) {
  conn().query('UPDATE comment SET ? WHERE showid = ? and commentid = ?',
               [coding, showid, commentid], function (err) {
    if (err) throw err;
    return callback(null);
  });
};

