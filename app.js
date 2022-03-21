const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html", (req, res) => {

        })
    })
    //post methid processes the form data
app.post("/", (req, res) => {
    var query = req.body.city
    const apiKey = "4824fc1471faf401f763e225f799432a"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
    https.get(url, (response) => {
        response.on("data", (d) => {
            const weatherData = JSON.parse(d)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            res.set("Content-Type", "text/html");
            res.write("<h4> Current weather in  " + query + " : " + weatherDescription + "</h4>")
            res.write("<h1>The temparature is " + temp + " degree celsius</h1>")
                //res.write("<img src='" + imageURL + "'</img>")
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    })
})


app.listen(3000, (req, res) => {
    console.log(`Server is listening on port 3000`)
})