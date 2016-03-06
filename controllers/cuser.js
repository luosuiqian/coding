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

// var iconv = require('iconv-lite');
// iconv.encode("剧集序号;评论序号;评论打分;有用数;", "GBK")

var OR = function (a, b) {
  if (a == 1) return 1;
  if (b == 1) return 1;
  return 0;
};

exports.generalGet = function (req, res) {
  var condition = req.params.condition;
  User.getGeneral(condition, function (play) {
    res.write("NO;Country;Drama;Action;Crime;ActionCrime;Fantasy;Adventure;FantasyAdventure;Horror;Crux;HorrorCrux;");
    res.write("Comedy;Romance;Family;History;Music;Homosexual;Season;Episode;Time;Score;NOE;Watching;Watched;Wanna;Noc;Now\n");
    for (var i = 0; i < play.length; i++) {
      res.write(play[i].id + ";");
      res.write(play[i].country + ";");
      res.write(play[i].featurefilm + ";");
      
      res.write(play[i].action + ";");
      res.write(play[i].crime + ";");
      
      var actionCrime = OR(play[i].action, play[i].crime);
      res.write(actionCrime + ";");
      
      res.write(play[i].sciencefiction + ";");
      res.write(play[i].venture + ";");
      
      var sciencefictionVenture = OR(play[i].sciencefiction, play[i].venture);
      res.write(sciencefictionVenture + ";");
      
      res.write(play[i].horror + ";");
      res.write(play[i].suspense + ";");
      
      var horrorSuspense = OR(play[i].horror, play[i].suspense);
      res.write(horrorSuspense + ";");
      
      res.write(play[i].comedy + ";");
      res.write(play[i].lovestory + ";");
      res.write(play[i].family + ";");
      res.write(play[i].history + ";");
      res.write(play[i].music + ";");
      res.write(play[i].homosexual + ";");
      res.write(play[i].season + ";");
      res.write(play[i].episode + ";");
      res.write(play[i].period + ";");
      res.write(play[i].score + ";");
      res.write(play[i].noe + ";");
      res.write(play[i].watching + ";");
      res.write(play[i].watched + ";");
      res.write(play[i].planned + ";");
      res.write(play[i].comment + ";");
      
      var Now = parseInt(play[i].watching) + parseInt(play[i].watched) + parseInt(play[i].planned)
      res.write(Now + "\n");
    }
    res.end();
  });
};

exports.individualGet = function (req, res) {
  var condition = req.params.condition;
  User.getIndividual(condition, function (comment) {
    res.write("NO1;NO2;Score;Appearance;Salutation;Acknowledge;IDC;Success;Wishful ID;IDP;EmotionP;AssociatedMemoryP;");
    res.write("Curiousness;Emotion Type;Emotion Strength;PSI;Identification;Transportation;Identificaiton2\n");
    for (var i = 0; i < comment.length; i++) {
      res.write(comment[i].showid + ";");
      res.write(comment[i].commentid + ";");
      res.write(comment[i].score + ";");
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
      res.write(comment[i].C12 + ";");
      
      var C13 = parseInt(comment[i].C2) + parseInt(comment[i].C3)
      var C14 = parseInt(comment[i].C1) + parseInt(comment[i].C4) + parseInt(comment[i].C5) + parseInt(comment[i].C6)
      var C15 = parseInt(comment[i].C7) + parseInt(comment[i].C8) + parseInt(comment[i].C9) + parseInt(comment[i].C10)
      var C16 = parseInt(comment[i].C4) + parseInt(comment[i].C5) + parseInt(comment[i].C6)
      res.write(C13 + ";");
      res.write(C14 + ";");
      res.write(C15 + ";");
      res.write(C16 + "\n");
    }
    res.end();
  });
};
