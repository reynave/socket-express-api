require('dotenv').config();
const mysqldump = require('mysqldump')
const app = require('express')();
const schedule = require('node-schedule');
const http = require('http').Server(app);
const port = process.env.PORT || process.env.PORT_JOB;
const ip = process.env.IP;

const mysqlCon = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}
// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo! masuk 2')
// })
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cron.html');
});

http.listen(port, () => {
    var d, n, unique;
   
    console.log(`Socket.IO server running at http://${ip}:${port}/`);
    setInterval(() => {
         d = new Date();
         n = d.toLocaleTimeString();
         console.log(n, padTo2Digits(d.getDate()));
    }, 1000);
    const job = schedule.scheduleJob('5 04 23 * * *', function () {
        console.log('The answer to life, the universe, and everything!');
        d = new Date();
        unique = d.getFullYear()+padTo2Digits(d.getMonth())+padTo2Digits(d.getDate());
        mysqldump({
            connection: mysqlCon,
            dumpToFile: './dump'+unique+'.sql',
        });
    });
});

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }