const WIDTH = 640
const HEIGHT = 480

function setup() {
    let canvas = createCanvas(640, 480)
    canvas.parent('p5')
    angleMode(DEGREES)
    noLoop()
    // turtle.radians = radians
    turtle.push = push
    turtle.pop = pop
    turtle.Vector = p5.Vector
    turtle.line = line
    turtle.stroke = stroke
    turtle.noStroke = noStroke
    turtle.strokeWeight = strokeWeight
}

function draw() {
    background(255)
    turtle.reset()
    turtle.run()
    turtle.display()
}

function load(value) {
    let ix = 0
    try {
        value = value.replace(/repeat\(/g, (s) => {
            return "let ix" + ix + "=0;while(ix" + (ix++) + "++<"
        })
        eval(value)
    } catch (e) {
        if (e instanceof SyntaxError) {
            alert(e.message)
        }
        console.log(e)
    }
}

function reset() {
    turtle.program = []
    draw()
}

function saveImage() {
    turtle.hidden = true
    draw()
    save('turtle.png')
    turtle.hidden = false
    draw()
}

function saveText(value) {
    let textToWrite = value.replace(/\n/g, "\r\n")
    let textFileAsBlob = new Blob([textToWrite], {type:'text/plain'})
    let fileNameToSaveAs = "turtle.txt"
    let downloadLink = document.createElement("a")
    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = "LINKTITLE"
    window.URL = window.URL || window.webkitURL
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
    downloadLink.onclick = destroyClickedElement
    downloadLink.style.display = "none"
    document.body.appendChild(downloadLink)
    downloadLink.click()
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target)
}

///

function forward(d) {
    turtle.program.push(() => { turtle.forward(d) })
}
let fd = forward

function backward(d) {
    turtle.program.push(() => { turtle.backward(d) })
}
let bk = backward

function right(a) {
    turtle.program.push(() => { turtle.right(a) })
}
let rt = right

function left(a) {
    turtle.program.push(() => { turtle.left(a) })
}
let lt = left

function penup() {
    turtle.program.push(() => { turtle.penup() })
}
let pu = penup

function pendown() {
    turtle.program.push(() => { turtle.pendown() })
}
let pd = pendown

function pencolor(c) {
    turtle.program.push(() => { turtle.pencolor(c) })
}
let pc = pencolor

function penweight(w) {
    turtle.program.push(() => { turtle.penweight(w) })
}
let pw = penweight

///

class Turtle {

    constructor() {
        this.hidden = false
        this.program = []
        this.reset()
    }

    reset() {
        this.x = WIDTH/2
        this.y = HEIGHT/2
        this.a = 0
        this.color = 0
        this.weight = 1
        this.pdown = true
    }

    forward(d) {
        let v = this.Vector.fromAngle(this.radians(this.a - 90))
        let px = this.x
        let py = this.y
        this.x += v.x * d
        this.y += v.y * d
        turtle.line(px, py, this.x, this.y)
    }

    backward(d) {
        let v = this.Vector.fromAngle(this.radians(this.a - 90))
        let px = this.x
        let py = this.y
        this.x -= v.x * d
        this.y -= v.y * d
        turtle.line(px, py, this.x, this.y)
    }

    right(a) {
        this.a += a
    }

    left(a) {
        this.a -= a
    }

    penup() {
        this.pdown = false
        this.noStroke()
    }

    pendown() {
        this.pdown = true
        this.stroke(this.color)
    }

    pencolor(c) {
        this.color = c
        if (this.pdown) {
            this.pendown()
        }
    }

    penweight(w) {
        this.weight = w
        this.strokeWeight(w)
    }

    run() {
        this.push()
        if (this.pdown) {
            this.stroke(this.color)
        }
        this.strokeWeight(this.weight)
        for (let step of turtle.program) {
            step()
        }
        this.pop()
    }

    display() {
        // p5 only
        if (this.hidden) return
        push()
        stroke(0)
        strokeWeight(1)
        translate(this.x, this.y)
        rotate(this.a)
        triangle(0, -20, -10, 0, 10, 0)
        pop()
    }

    radians(degrees) {
        return degrees * (Math.PI / 180.0)
    }

}

const turtle = new Turtle()

if (typeof exports !== 'undefined') {
    exports.load = load
    exports.turtle = turtle
    exports.canvas_width = WIDTH
    exports.canvas_height = HEIGHT
}
