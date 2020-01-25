const TOTAL_WIDTH = 16, TOTAL_HEIGHT = 11
const PLOT_WIDTH = 12, PLOT_HEIGHT = 9
const X = (TOTAL_WIDTH - PLOT_WIDTH) / 2
const Y = (TOTAL_HEIGHT - PLOT_HEIGHT) / 2

const fs = require('fs')
const print = console.log
const PVector = require('./pvector')()
let {load, turtle, canvas_width, canvas_height} = require('./turtle')


// load turtle program
if (process.argv.length < 3) {
      print('node plot.js FILENAME')
      process.exit(1)
}
const filename = process.argv[2]

const program = fs.readFileSync(filename, 'utf8')
// print('OK: ' + filename)
// print(program)

// overload turtle draw functions
turtle.Vector = PVector
turtle.push = function() {}
turtle.pop = function() {}
turtle.stroke = function(n) {}
turtle.noStroke = function() {}
turtle.strokeWeight = function(n) {}

const header = `
from pyaxidraw import axidraw
ad = axidraw.AxiDraw()
ad.interactive()
ad.options.model = 2
ad.connect()
ad.moveto(0,0)
ad.moveto(${X + (PLOT_WIDTH/2)}, ${Y + (PLOT_HEIGHT/2)})
`
const footer = `
ad.moveto(0,0)
ad.plot_setup()
ad.options.mode = "align"
ad.plot_run()
ad.disconnect()
`

turtle.line = function(x1, y1, x2, y2) {
    let x = X + ((x2 / canvas_width) * PLOT_WIDTH)
    let y = Y + ((y2 / canvas_height) * PLOT_HEIGHT)
    if (turtle.pdown) {
        print('ad.lineto(' + x + ',' + y + ')')
    } else {
        print('ad.moveto(' + x + ',' + y + ')')
    }
}

// simulate the turtle steps
print(header)
load(program)
turtle.run()
print(footer)
