var User = require('../models/user');

const maxCommentId = 40;

exports.indexGet = function (req, res) {
  User.getPlay(function (play) {
    User.getComment(function (comment) {
      for (var i = 0; i < play.length; i++) {
        play[i].finished = 0;
        play[i].total = 0;
      }
      for (var i = 0; i < comment.length; i++) {
        play[comment[i].showid - 1].total++;
        if (comment[i].C12 != null) {
          play[comment[i].showid - 1].finished++;
        }
      }
      res.render('index.jade', {
        flash: req.flash(),
        play: play,
        comment: comment,
      });
    });
  });
};

exports.playGet = function (req, res) {
  var id = parseInt(req.params.id);
  User.getPlay(function (play) {
    User.getComment(function (comment) {
      res.render('play.jade', {
        flash: req.flash(),
        play: play,
        comment: comment,
        id: id,
      });
    });
  });
};

exports.commentGet = function (req, res) {
  var showid = parseInt(req.params.showid);
  var commentid = parseInt(req.params.commentid);
  User.getPlay(function (play) {
    User.getComment(function (comment) {
      res.render('comment.jade', {
        flash: req.flash(),
        play: play,
        comment: comment,
        id: showid,
        commentid: commentid
      });
    });
  });
};

exports.commentPost = function (req, res) {
  var showid = parseInt(req.params.showid);
  var commentid = parseInt(req.params.commentid);
  var coding = {};
  coding.C1 = req.body.C1;
  coding.C2 = req.body.C2;
  coding.C3 = req.body.C3;
  coding.C4 = req.body.C4;
  coding.C5 = req.body.C5;
  coding.C6 = req.body.C6;
  coding.C7 = req.body.C7;
  coding.C8 = req.body.C8;
  coding.C9 = req.body.C9;
  coding.C10 = req.body.C10;
  coding.C11 = req.body.C11;
  coding.C12 = req.body.C12;
  User.update(showid, commentid, coding, function (err) {
    if (commentid < maxCommentId) {
      commentid++;
      return res.send({url: '/comment/' + showid + "/" + commentid});
    } else {
      return res.send({url: '/play/' + showid});
    }
  });
};

