exports.error = function (err, req, res, next) {
  console.log(err.stack);
  next(err);
};

exports.notFound = function (req, res, next) {
  res.send('Sorry, 404!');
};

