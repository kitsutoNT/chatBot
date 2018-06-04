const Koa = require('koa');
const Router= require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
//const request = ('superagent');
const koaRequest = require('koa-http-request')

const app = new Koa();
const router = new Router();
const dbUrl = 'mongodb://heroku_2s4j0w7t:qh2ufsv00ffs6f8d01287ua58i@ds147030.mlab.com:47030/heroku_2s4j0w7t'



mongoose.connect(dbUrl, dbErr => {
  if (dbErr) {
    console.log(dbErr)
  }
  else console.log('db connected')
})

var Schema = mongoose.Schema;
var logSchema = new Schema({
  user_input: String,
  bot_response: String,
  response_timestamp: String
});

var Log = mongoose.model("Log", logSchema);

app
.use(bodyParser())

router
.post('/chat', (ctx, next) => {
  var timezoneoffset = -9
  var fakeUTC = new Date(Date.now() - (timezoneoffset * 60 - new Date().getTimezoneOffset()) * 60000);
  var timeStamp = fakeUTC.toLocaleString()
  console.log(timeStamp)
  let userInput = ctx.request.body
  var botRespose = ""
  console.log(userInput)
  if(userInput.user_input === "今何時？") {
    console.log(userInput.user_input + "IN TIME")
    var hour = timeStamp.slice(-8,-6)
    var min = timeStamp.slice(-5,-3)
    botRespose = hour + "時" + min + "分です。"
    console.log(botRespose)
  }
  else if(userInput.user_input === "こんにちは") {
    botRespose = "こんにちは。"
  }
  else if(userInput.user_input === "今日の東京の天気は？") {
    var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city='
    var cityId = '130010' //Tokyo city ID
    console.log("before statement")
    app.use(async ctx => {
      ctx.get(url + cityId)
      console.log(ctx.body)
      console.log(ctx.request)
      console.log(ctx.response)
      console.log("In weather statement")
    });
    botRespose = ""
  }
  var newLog = new Log({
    user_input: userInput.user_input,
    bot_response: botRespose,
    response_timestamp: timeStamp
  });

  newLog.save(function(err, res) {
    if(err) {
      console.log(err)
    }
    else {
      console.log("Save success!!")
    }
  })
  userInput.user_input = ""
})
.get('/history/list', (ctx, next) => {
  Log.find({},{sort:{created: -1},limit:10}, function (err, data){
    if(err) {
      console.log(err);
    }
    console.log(data);
  });
});


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000);
