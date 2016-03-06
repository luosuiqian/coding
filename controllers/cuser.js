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

var iconv = require('iconv-lite');

exports.individualGet = function (req, res) {
  var condition = req.params.condition;
  User.getIndividual(condition, function (comment) {
    res.write(iconv.encode("剧集序号;评论序号;评论打分;有用数;", "GBK"));
    res.write(iconv.encode("身体特征;角色称谓;认识的人;角色认同;角色成败;拥有特征;认同剧情;触动感情;联系生活;剧情发展;情感类型;情感频次\n", "GBK"));
    for (var i = 0; i < comment.length; i++) {
      res.write(comment[i].showid + ";");
      res.write(comment[i].commentid + ";");
      res.write(comment[i].score + ";");
      res.write(comment[i].usefulness + ";");
      res.write(comment[i].C1 + ";");
      res.write(comment[i].C2 + ";");
      res.write(comment[i].C3 + ";");
      res.write(comment[i].C4 + ";");
      res.write(comment[i].C5 + ";");
      res.write(comment[i].C6 + ";");
      res.write(comment[i].C7 + ";");
      res.write(comment[i].C8 + ";");
      res.write(comment[i].C9 + ";");
      res.write(comment[i].C10 + ";");
      res.write(comment[i].C11 + ";");
      res.write(comment[i].C12 + "\n");
    }
    res.end();
  });
};
