let turtle
let program = []

function setup() {
    let canvas = createCanvas(640, 480)
    canvas.parent('p5')
    turtle = new Turtle()
    angleMode(DEGREES)
    frameRate(3)
}

function draw() {    
    print(program)
    background(255)
    turtle.reset()
    turtle.run()
    turtle.display()
    push()
    strokeWeight(2)
    noFill()
    rect(0, 0, width, height)
    pop()
}

function execute(value) {
    print(value)
    eval(value)
}

///

function forward(x) {
    for (let i=0; i<x; i++) {
        program.push(turtle.forward)
    }
}
let fd = forward

function backward(x) {
    for (let i=0; i<x; i++) {
        program.push(turtle.forward)
    }
}
let bk = backward

function right(x) {
    for (let i=0; i<x; i++) {
        program.push(turtle.right)
    }
}
let rt = right

function left(x) {
    for (let i=0; i<x; i++) {
        program.push(turtle.left)
    }
}
let lt = left

///

class Turtle {

    constructor() {

    }

    reset() {
        this.x = width/2
        this.y = height/2
        this.a = 0        
    }

    forward() {
        turtle.y -= 1
        turtle.bounds()
    }

    backward() {
        turtle.y += 1
        turtle.bounds()
    }

    bounds() {
        if (turtle.x < 0) {
            turtle.x = width - 1
        }
        if (turtle.x == width) {
            turtle.x = 0
        }
        if (turtle.y < 0) {
            turtle.y = height - 1
        }
        if (turtle.y == height) {
            turtle.y = 0
        }
    }

    right() {
        turtle.a += 1
    }

    left() {
        turtle.a -= 1
    }

    penup() {
        noStroke()
    }

    pendown() {
        stroke(0)
    }

    run() {
        for (let step of program) {
            step()
            stroke(0)
            point(this.x, this.y)
        }
    }

    display() {
        push()
        translate(this.x, this.y)
        rotate(this.a)
        triangle(0, 0, -10, 20, 10, 20)
        pop()
    }

}