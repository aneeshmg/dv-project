# DV Project ASU Spring 19

### Instructions to run app
* Install Node.js, MongoDB, Python3, Studio 3T
* Download Code and data files from Canvas. We have used Yelp data set from [https://www.yelp.com/dataset](https://www.yelp.com/dataset)
* Run MongoD:
* If Windows: Navigate in command line (cmd) to the Program Files\MongoDB\Server\4.0\bin, type MongoD and execute
* If Mac OS - Brew services -> start mongodb
* If Linux - Linux - type MongoD and execute in Terminal
* To Populate Databases, open Studio 3T and follow the below steps:
* Click Connect to connect to localhost server
* On Left hand side, select localhost:27017 and use menu bar -> Database-> Add Database -> Input Database name (say "dv") -> press ok.
* Select Database created above ("dv") -> Right Click -> ImportCollection-> Select CSV -> Import from CSV file(Right hand side) -> Navigate to Required CSV (main.csv and businesses.csv and businesses_with_positives.csv) -> Click Execute button (Its above Import from CSV file)
* Navigate to the code folder(download from Canvas) using command line/ terminal and open 2 separate terminal windows.
* In first window - Type ```npm i``` and then after processing finishes again type ```npm run server```
* In second window -  ```npm run client-w``` (for windows) or ```npm run client-l``` (for linux and macOS)
* Ensure MondoDB is running (mongod)
* Run server - ```npm run server```
* Run client (On Linux) - ```npm run client-l```
* Run client (On Windows) - ```npm run client-w```