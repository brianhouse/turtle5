const fs = require('fs')
let {load, turtle} = require('./turtle')
const PVector = require('./pvector')()
const print = console.log


// load turtle program
if (process.argv.length < 3) {
      print('node plot.js FILENAME')
      process.exit(1)
}
const filename = process.argv[2]

const program = fs.readFileSync(filename, 'utf8')
print('OK: ' + filename)
print(program)


// overload turtle draw functions
turtle.Vector = PVector
turtle.push = function() {}
turtle.pop = function() {}
turtle.stroke = function(n) {}
turtle.noStroke = function() {}
turtle.strokeWeight = function(n) {}

turtle.line = function(x1, y1, x2, y2) {

}


// simulate the turtle steps

load(program)
turtle.run()
