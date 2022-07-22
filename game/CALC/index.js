var w = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth,
    h = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight,
    wt = w < h ? w : h,
    answer,
    q1, 
    q2,
    maxt = 100,
    mint = -100,
    speed = 2,
    SPlane,
    sx,
    sy,
    h,
    place,
    bullet,
    bullets = [],
    que,
    ques = [],
    game = 1,
    TrueAnswerTime = Math.ceil(Math.random() * 5),
    score = 0,
    d = new Date()
    lasttime = d.getTime()

function setup(){
    createCanvas(wt,wt)
    sx = height /2
    sy = width - 150
    h = height
    bullet = loadImage('./res/bullet.png')
    SPlane = loadImage('./res/youplane.png')
    place = loadImage('./res/bg.png')
    que = loadImage('./res/question.png')
    document.addEventListener("keyup",function (){keyup(window.event)})
}

function draw(){
    var i
    var j
    if (game == 1){
        randQ()
        game = 2
        setTimeout(function (){
            ques.push(new question(answer))
        },TrueAnswerTime * 1000)
    }else if (game == 3){
        score ++
        game = 1
    }
    var showtime = random(90,300)
    if (d.getTime()-lasttime > showtime){
        ques.push(new question(Math.ceil(random(0,199))))
        lasttime = d.getTime()
    }
    background(0)
    image(place,0,0)
    for (i of bullets){
        i.move()
        image(bullet,i.x,i.y,15,30)
        if (i.y < 0){
            bullets.splice(bullets.indexOf(i),1)
        }
    }
    for (i of ques){
        i.move()
        i.show()
        if (i.y > h){
            ques.splice(bullets.indexOf(i),1)
        }
        for (j of bullets){
            if (hit(i,j)){
                ques.splice(bullets.indexOf(i),1)
            }
        }
    }
    move()
}

function randQ(){
    q1 = Math.ceil(Math.random()*(maxt+1)) - 1
    q2 = Math.ceil(Math.random()*99+q1) - 1
    answer = q1 + q2
}

function move(){
    sx = mouseX
    if (mouseX > (h - 40)){
        sx = h - 40
    }
    if (mouseX < 10){
        sx = 10
    }
    image(SPlane,sx,sy,SPlane.width/7,SPlane.height/7)
}

function keyup(event){
    var k = window.event ? event.keyCode : event.which
    if (k == 70){
        console.log('Fire!')
        var b = new Bullet()
        bullets.push(b)
    }
}

class Bullet{
    constructor(){
        this.x = sx + bullet.width / 2
        this.y = sy
        this.speed = 3
        bullets.push(this)
    }
    
    move(){
        this.y -= this.speed
    }
}

function hit(b,q){
    return collideRectRect(b.x,b.y,15,30,q.x,q.y,q.w,q.h)
}

class question{
    constructor(nr){
        this.nr = nr
        this.w = 90
        this.h = 90
        this.y = this.h - this.h * 2
        this.x = Math.ceil(Math.random() * wt) - this.w /2
        ques.push(this)
    }
        
    move(){
        this.y += speed
    }
        
    show(){
        image(que,this.x,this.y,this.w,this.h)
        text(this.nr,this.x + que.width/4,this.y + que.height/2)
    }
}
