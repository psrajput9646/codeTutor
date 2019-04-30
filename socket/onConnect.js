let spawn = require("child_process").spawn;
let runningProcesses = {};

module.exports = {
  onConnect(socket) {
    console.log("Socket connected");
    socket.on("run", run => {
      runFile(run, socket);
    });
  }
};

function runFile(run, socket) {
  console.log(run);
  let child = spawn("bash", ["socket/compile", run]);
  // Kill after 30 seconds
  setTimeout(function() {
    child.kill();
  }, 30000);
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", data => {
    console.log("Sending data");
    socket.emit("stdout", data);
  });

  socket.on("stdin", stdin => {
    try {
      child.stdin.write(stdin);
    } catch (err) {}
  });

  child.on("close", code => {
    console.log("Closing process...");
    socket.emit("stdout", "Process finished")
    socket.emit("fileClose", code);
  });
}
