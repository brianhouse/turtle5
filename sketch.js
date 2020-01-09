let turtle
let program = []

function setup() {
    let canvas = createCanvas(640, 480)
    canvas.parent('p5')
    turtle = new Turtle()
    angleMode(DEGREES)
    noLoop()
}

function draw() {    
    background(255)
    turtle.reset()
    turtle.run()
    turtle.display()
}

function execute(value) {
    eval(value)
    draw()
}

function reset() {
    program = []
    draw()
}

function saveImage() {
    print('saving image')
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

function forward(x) {
    program.push(() => { turtle.forward(x) })    
}
let fd = forward

function backward(x) {
    program.push(() => { turtle.backward(x) })    
}
let bk = backward

function right(a) {
    program.push(() => { turtle.right(a) })
}
let rt = right

function left(a) {
    program.push(() => { turtle.left(a) })
}
let lt = left

function penup() {
    program.push(() => { turtle.penup() })
}
let pu = penup

function pendown() {
    program.push(() => { turtle.pendown() })
}
let pd = pendown

function pencolor(c) {
    program.push(() => { turtle.pencolor(c) })
}
let pc = pencolor

function penweight(c) {
    program.push(() => { turtle.penweight(c) })
}
let pw = penweight

///

class Turtle {

    constructor() {
        this.hidden = false
        this.reset()
    }

    reset() {
        this.x = width/2
        this.y = height/2
        this.a = 0       
        this.color = 0 
    }

    forward(x) {
        let v = p5.Vector.fromAngle(radians(this.a - 90))
        for (let i=0; i<x; i++) {
            let px = this.x
            let py = this.y
            this.x += v.x
            this.y += v.y
            line(px, py, this.x, this.y)
            this.bounds()
        }
    }

    backward(x) {
        for (let i=0; i<x; i++) {
            c2 = sqrt(a2 + b2)
            this.y -= 1
            this.bounds()
        }
    }

    bounds() {
        if (this.x < 0) {
            this.x = width - 1 - (0 - this.x)
        }
        if (this.x >= width) {
            this.x = 0 + (this.x - width)
        }
        if (this.y < 0) {
            this.y = height - 1 - (0 - this.y)
        }
        if (this.y >= height) {
            this.y = 0 + (this.y - height)
        }
    }

    right(a) {
        this.a += a
    }

    left(a) {
        this.a -= a
    }

    penup() {
        noStroke()
    }

    pendown() {
        print(this.color)
        stroke(this.color)
    }

    pencolor(c) {
        this.color = c
        this.pendown()
    }

    penweight(s) {
        strokeWeight(s)
        this.pendown()
    }

    run() {
        push()
        stroke(this.color)
        strokeWeight(1)
        for (let step of program) {
            step()
        }
        pop()
    }

    display() {
        if (this.hidden) {
            print('hidden!')
            return
        } else {
            print('shown!')
        }
        push()
        stroke(0)
        strokeWeight(1)
        translate(this.x, this.y)
        rotate(this.a)
        triangle(0, -20, -10, 0, 10, 0)
        pop()
    }

}
