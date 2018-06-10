const Koa = require('koa')
const Router= require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const request = require('superagent')
const serve = require('koa-static')
const Promise = require('promise')

const app = new Koa()
const router = new Router()

// mongoDB URL string to connect server and database.
const dbUrl = 'mongodb://heroku_2s4j0w7t:qh2ufsv00ffs6f8d01287ua58i@ds147030.mlab.com:47030/heroku_2s4j0w7t'

// Serving static files in "/out" folder by using koa-static
app.use(serve(__dirname + '/out'))

// Setting request parameter to ctx.request.body
app.use(bodyParser())

/**
* Connect mongoDb and server.
* @param {String} dbUrl URL string value of mongodb storage.
* @param {Object} dbErr Error object returned if connecting to mongodb fails.
*/
mongoose.connect(dbUrl, dbErr => {
  if (dbErr) {
    console.log("Error at connecting mongoDB: " + dbErr)
  }
  else {
    console.log("DB connected")
  }
})

// Creating mongoose schema to set up log schema.
var Schema = mongoose.Schema
var logSchema = new Schema({
  user_input: String,
  bot_response: String,
  response_timestamp: String
})
var Logs = mongoose.model("Log", logSchema)

/**
* Find latest 10 logs based on response_timestamp, sort in descending.
* Return Promise object with array object containing 10 logs.
* @return {Object} promise Promise object to be called at .get('/history/list')
* @param {Object} logArray Array object containing 10 logs.
*/
function getPastLogs () {
  return new Promise((resolve, reject) => {
    Logs.find({}).sort({response_timestamp: 'desc'}).limit(10).exec(function (err, logArray){
      if(err) {
        console.log("Error finding logs in DB: " + err)
      }
      resolve(logArray)
    })
  })
}

/**
* This function send GET request to param URL, receive weather info, and pass it into resolve.
* @param  {String} url URL string value of livedoor weather API url.
* @return {Object} Promise Return promise object that has string telop of weather forcast.
*/
function getWeatherInfo (url){
  return new Promise((resolve, reject) => {
    //requesting GET via superagent to get weather info in string format
    request
    .get(url)
    .end((err, res) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res.body.forecasts[0].telop)
      }
    })
  })
}

/**
* Routing section to handle client request based on its types [GET, POST] and path.
*/

// Redirect to index.html if client request to root directory.
router
.get('/', function(ctx, next) {
  ctx.redirect('/index.html')
})

/**
* Triggered when client click "SEND" button and request is sent.
* Create new log and save in DB.
* Respond to client with new log with appropriate bot response.
*/
.post('/chat', async (ctx, next) => {
  // Japan time off set from UTC. Change this value if not JST
  var timezoneoffsetJapan = -9
  // Calculate current time in Japan
  var japanTime = new Date(Date.now() - (timezoneoffsetJapan * 60 - new Date().getTimezoneOffset()) * 60000)
  // Change date type to string type
  var timeStamp = japanTime.toLocaleString()
  // Assigning user request into JSON format object for readability
  var JsonRequest = ctx.request.body
  var botRespose = ""

  if(JsonRequest.user_input === "今何時？") {
    // Only get string value of hour
    var hour = timeStamp.slice(-8,-6)
    // Only get string value of minute
    var min = timeStamp.slice(-5,-3)
    botRespose = hour + "時" + min + "分です。"
  }
  else if(JsonRequest.user_input === "こんにちは") {
    botRespose = "こんにちは。"
  }
  else if(JsonRequest.user_input === "今日の東京の天気は？") {
    var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city='
    //Tokyo city ID. Change this value if you want to get weather info of other places.
    var cityId = '130010'
    await getWeatherInfo(url + cityId)
    .then((weather) => {
      botRespose = weather + "です。"
    })
    .catch((err) => {
      console.log("Error at getWeatherInfo function: " + err)
    })
  }

  // Creating new log for saving and returning to client
  var newLog = new Logs({
    user_input: JsonRequest.user_input,
    bot_response: botRespose,
    response_timestamp: timeStamp
  })

  // Respond new log to client
  ctx.body = newLog
  console.log(newLog)

  // Save new log in mongoDb
  await newLog.save(function(err, res) {
    if(err) {
      console.log("Error at saving new log:" + err)
    }
    else {
      console.log("New log successfully Saved!!")
    }
  })
})

/**
 * Triggered before logField is rendered.
 * Get log history from mongodb, and return it to client.
 */
.get('/history/list', async (ctx, next) => {
  await getPastLogs()
  .then((logArray) => {
    ctx.body = logArray
    console.log("Response logArray" + logArray)
  })
  .catch((err) => {
    console.log("Error at retrieving log history: " + err)
  })
})

// Use defined routers above.
app.use(router.routes()).use(router.allowedMethods())
// Listen to server.
app.listen(3000)
