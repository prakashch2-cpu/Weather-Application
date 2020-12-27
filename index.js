const http = require('http');
const fs = require('fs');


const requests = require('requests');




const homeFile = fs.readFileSync('home.html', "utf-8");
function replaceVal(temporaryVal,originalVal){
       let temperature=temporaryVal.replace("{%tempval%}",originalVal.main.temp);
        temperature=temperature.replace("{%location%}",originalVal.name);
        temperature=temperature.replace("{%country%}",originalVal.sys.country);
        temperature=temperature.replace("{%tempmin%}",originalVal.main.temp_min);
        temperature=temperature.replace("{%tempmax%}",originalVal.main.temp_max);
        temperature=temperature.replace("{%tempStatus%}",originalVal.weather[0].main);
    return temperature;
      
}

const server = http.createServer((req, res) => {
   
    if (req.url == "/") {

        requests('http://api.openweathermap.org/data/2.5/weather?q=simla&appid=977b20f268127bc7b44146286f45a3a6&units=metric')
            .on('data', function (chunk) {
                const objdata=JSON.parse(chunk);
                const arrdata=[objdata];
                // console.log(arrobj[0].main.temp);
                const realTimeData=arrdata.map((val)=>replaceVal(homeFile,val)).join("");
               
                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                res.end();
            });
    }
}).listen(8000, "127.0.0.1");

