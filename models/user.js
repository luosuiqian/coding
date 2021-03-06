var conn = require('./db').getConnection;

exports.getPlay = function (callback) {
  conn().query('SELECT id, name, url, year, country, comment, B1B11, B12 FROM play order by id',
               function (err, results) {
    if (err) throw err;
    return callback(results);
  });
};

exports.getComment = function (callback) {
  conn().query('SELECT showid, commentid, name, score, text, usefulness, \
               C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12 \
               FROM comment order by showid, commentid',
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

exports.getGeneral = function (str, callback) {
  conn().query('SELECT id, country, featurefilm, action, sciencefiction, comedy, lovestory, family, \
               crime, history, horror, suspense, venture, music, homosexual, season, episode, period, \
               score, watching, comment, watched, planned, noe \
               FROM play where  ' + str + ' order by id',
               function (err, results) {
    if (err) throw err;
    return callback(results);
  });
};

exports.getIndividual = function (str, callback) {
  conn().query('SELECT showid, commentid, comment.score, usefulness, \
               C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, \
               country, featurefilm, action, sciencefiction, comedy, lovestory, family, \
               crime, history, horror, suspense, venture, music, homosexual, season, episode, period, \
               play.comment, noe \
               FROM play, comment where id = showid and ' + str + ' order by showid, commentid',
               function (err, results) {
    if (err) throw err;
    return callback(results);
  });
};

