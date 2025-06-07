let canvas = document.querySelector("#tela");
let ctx = canvas.getContext("2d");
let width = 1280;
let height = 720;

canvas.width = width;
canvas.height = height;

//-------------------------------------------------//



//-------------------------------------------------//

//Controll Player 1

window.addEventListener("keydown", (event) => {
    switch (event.key){
        case 'a':
            p1.keys.a.pressed = true;
            p1.lastKey = "a";
        break;
        case 'd':
            p1.keys.d.pressed = true;
            p1.lastKey = "d";
        break;
        case 'w':
            p1.keys.w.pressed = true;
            p1.lastKey = "w";
            p1.eixoY = pulo(p1.keys.w.pressed, p1.dy, p1.dh, p1.pulo, p1.eixoY);
        break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key){
        case 'a':
            p1.keys.a.pressed = false;
        break;
        case 'd':
            p1.keys.d.pressed = false;
        break;
        case 'w':
            p1.keys.w.pressed = false
        break;
    }
});

//Controll Player 2

window.addEventListener("keydown", (event) => {
    switch (event.key){
        case 'ArrowLeft':
            p2.keys.a.pressed = true;
            p2.lastKey = "ArrowLeft";
        break;
        case 'ArrowRight':
            p2.keys.d.pressed = true;
            p2.lastKey = "ArrowRight";
        break;
        case 'ArrowUp':
            p2.keys.w.pressed = true;
            p2.lastKey = "ArrowUp";
            p2.eixoY = pulo(p2.keys.w.pressed, p2.dy, p2.dh, p2.pulo, p2.eixoY);
        break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key){
        case 'ArrowLeft':
            p2.keys.a.pressed = false;
        break;
        case 'ArrowRight':
            p2.keys.d.pressed = false;
        break;
        case 'ArrowUp':
            p2.keys.w.pressed = false
        break;
    }
});

//-------------------------------------------------//

//Background

let bg = {
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    dx:0,
    dy:0,
    dw:width,
    dh:height,
    hitbox:"rgb(74, 165, 255)",
    update (){
        print(bg.dx, bg.dy, bg.dw, bg.dh, bg.hitbox)
    }
}

//Player 1

let p1 = {
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    dx:100,
    dy:0,
    dw:64,
    dh:128,
    keys: {
        a:{pressed:false},
        d:{pressed:false},
        w:{pressed:false},
    },
    lastKey:"",
    eixoX:0,
    eixoY:0,
    pulo:-400,
    velocidade:300,
    hitbox:"rgb(255, 0, 0)",
    update (fps){
        //Print
        print (p1.dx, p1.dy, p1.dw, p1.dh, p1.hitbox);

        //gravidade
        p1.eixoY = gravidade(p1.eixoY, fps, p1.dy, p1.dh);
        p1.dy += p1.eixoY * fps;

        //Movimentação
        if (p1.keys.a.pressed)
            (p1.dx >= 0) ? p1.eixoX = -p1.velocidade * fps : p1.eixoX = 0;
        else if (p1.keys.d.pressed)
            (p1.dx+p1.dw <= bg.dw) ? p1.eixoX = p1.velocidade * fps : p1.eixoX = 0;
        else if (! p1.keys.a.pressed && ! p1.keys.d.pressed)
            p1.eixoX = 0;
        p1.dx += p1.eixoX;

    }, 
}

//Player 2

let p2 = {
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    dx:bg.dw-100-64,
    dy:0,
    dw:64,
    dh:128,
    keys: {
        a:{pressed:false},
        d:{pressed:false},
        w:{pressed:false},
    },
    lastKey:"",
    eixoX:0,
    eixoY:0,
    pulo:-350,
    velocidade:350,
    hitbox:"rgb(0, 0, 255)",
    update (fps){
        //print
        print (p2.dx, p2.dy, p2.dw, p2.dh, p2.hitbox);

        //gravidade
        p2.eixoY = gravidade(p2.eixoY, fps, p2.dy, p2.dh);
        p2.dy += p2.eixoY * fps;

        //Movimentação
        if (p2.keys.a.pressed)
            (p2.dx >= 0) ? p2.eixoX = -p2.velocidade * fps : p2.eixoX = 0;
        else if (p2.keys.d.pressed)
            (p2.dx+p2.dw <= bg.dw) ? p2.eixoX = p2.velocidade * fps : p2.eixoX = 0;
        else if (! p2.keys.a.pressed && ! p2.keys.d.pressed)
            p2.eixoX = 0;
        p2.dx += p2.eixoX;

    }, 
}

//-------------------------------------------------//

function gravidade (eixoY, fps, y, h){
    let gravi = 800;
    if (y + h < bg.dh || eixoY < 0)
        return eixoY + (gravi * fps);
    else
        return 0; 
}

function pulo (key, y, h, pulo, eixoY){
    if (key && (y + h) >= bg.dh)
        return pulo;
    else
        return eixoY;
}

function print (x, y, w, h, style){
    ctx.fillStyle = style;
    ctx.fillRect(
        x,
        y,
        w,
        h,
    )
}

//-------------------------------------------------//

let lastFrame = 0;
let altera = false;

function loop (now){

    const deltaTime = (now - lastFrame) / 1000; // em segundos
    lastFrame = now;

    console.log("FPS = "+(1 / deltaTime)+" --- "+ deltaTime)

    //if(altera){
        bg.update();
        p1.update(deltaTime);
        p2.update(deltaTime);
    //}
    altera = !altera
    

    //---
    requestAnimationFrame(loop);
}

function carregarJogo() {
  requestAnimationFrame((tempoInicial) => {
    lastFrame = tempoInicial;
    loop(tempoInicial);
  });
} carregarJogo()