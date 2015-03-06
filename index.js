var five = require("johnny-five"),
    http = require("http"),
    ws = require("nodejs-websocket"),
    fs = require("fs"),
    board, photoresistor, luxValue;

board = new five.Board();

board.on("ready", function() {
  var server = ws.createServer(function (connection) {

    photoresistor.on("data", function() {
      console.log(this.value);
      luxValue = this.value / 10;

      server.connections.forEach(function (connection) {
        connection.sendText(luxValue.toString())
      })
    });
  })
  server.listen(8081)
  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor


});


http.createServer(function (req, res) {
  fs.createReadStream("index.html").pipe(res)
}).listen(8080)
