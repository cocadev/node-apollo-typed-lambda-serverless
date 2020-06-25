var db = require('../db.js');
var ottoman = require('ottoman');

var SecurityQuestionsMdl = ottoman.model('SecurityQuestion', {
      question:'string',
      createdAt: { allowNull: false, type: 'Date', default:new Date() },
      updatedAt: { allowNull: false, type: 'Date' }
    },{
    index: {
      
    }
});

SecurityQuestionsMdl.pre("save", async function(user, next) {
    this.updatedAt = Date.now();
    next()
});

SecurityQuestionsMdl.createAndSave = function (question, done) {
    this.create({
                    question: question
                }, done);
}

module.exports = SecurityQuestionsMdl;
