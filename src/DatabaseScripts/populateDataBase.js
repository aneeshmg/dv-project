const mongoose = require('mongoose')
const models = require('./src/server/models/Models')
var csv = require("fast-csv")
const Business = mongoose.model('Business');
var fs = require('fs');
var csvfile = __dirname + "/src/server/data/Restaurant_business.csv";
var stream = fs.createReadStream(csvfile);
var mongoDB= 'mongodb://localhost:27017/dv'
mongoose.connect(mongoDB, { useNewUrlParser: true });

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var csvStream = csv()
        .on("data", function(data){
         
         var item = new Business({
              business_id: data[2],
              name: data[3],
              address: data[4],
              city: data[5],
              state:data[6],
              postal_code:data[7],
              latitude:parseFloat(data[8]),
              longitude:parseFloat(data[9]),
              stars:parseInt(data[10]),
              review_count:parseInt(data[11]),
              is_open:data[12],
              attributes:data[13],
              categories:data[14],
              hours:data[15]

         });
         //console.log(item);
          item.save(function(error){
            //console.log(item);
              if(error){
                   throw error;
              }
          });
    }).on("end", function(){
          console.log(" End of file import");
    });
  
    stream.pipe(csvStream);
