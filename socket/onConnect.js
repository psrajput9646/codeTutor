let spawn = require('child_process').spawn;
let runningProcesses = {};

module.exports = {
    onConnect(socket){
        console.log("Socket connected")
        socket.on('run', (run) => { 
            runFile(run, socket)
        })
    }
}

function runFile(run, socket) {
    console.log(run)
    let child = spawn("bash", ["socket/compile", "projects/2/2/simple.py"])
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (data) => {
        console.log("Sending data")
        socket.emit("stdout", data)
    })

    socket.on('stdin', (stdin) => {
        console.log("Waiting on input")
        child.stdin.write(stdin)
    })

    child.on("close", (code) => {
        console.log("Closing process...")
        socket.emit("fileClose", code)
    })
}