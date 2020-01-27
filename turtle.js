const WIDTH = 640
const HEIGHT = 480

function setup() {
    let canvas = createCanvas(640, 480)
    canvas.parent('p5')
    angleMode(DEGREES)
    noLoop()
    turtle.push = push
    turtle.pop = pop
    turtle.Vector = p5.Vector
    turtle.line = line
    turtle.stroke = stroke
    turtle.noStroke = noStroke
    turtle.strokeWeight = strokeWeight
    turtle.background = background
    background(255)
    turtle.runInstant()
}

function run(code) {
    load(code)
    turtle.runAnimate()
}

function load(value) {
    turtle.program = []
    let ix = 0
    try {
        value = value.replace(/repeat\(/g, (s) => {
            return "let ix" + ix + "=0;while(ix" + (ix++) + "++<"
        })
        eval(value)
    } catch (e) {
        alert(e.message)
        console.log(e)
    }
}

function saveImage() {
    turtle.hidden = true
    turtle.runInstant()
    save('turtle.png')
    turtle.hidden = false
    turtle.runInstant()
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
    }

    home() {
        this.x = WIDTH/2
        this.y = HEIGHT/2
        this.a = 0
        this.pdown = true
        this.pencolor(0)
        this.penweight(1)
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

    runInstant() {
        this.background(255)
        this.push()
        if (this.pdown) {
            this.stroke(this.color)
        }
        this.strokeWeight(this.weight)
        turtle.home()
        for (let step of turtle.program) {
            step()
        }
        this.pop()
        this.display()
    }

    runAnimate() {
        for (let s in turtle.program) {
            let step = function () {
                this.background(255)
                this.push()
                if (this.pdown) {
                    this.stroke(this.color)
                }
                this.strokeWeight(this.weight)
                turtle.home()
                for (let p in turtle.program.slice(0, s)) {
                    turtle.program[p]()
                }
                this.pop()
                turtle.display()
            }
            setTimeout(step, s * 10)
        }
    }

    display() {
        // p5 only
        if (this.hidden) return
        push()
        stroke(0)
        strokeWeight(1)
        fill(245)
        translate(this.x, this.y)
        rotate(this.a)
        triangle(0, -20, -7, 0, 7, 0)
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
