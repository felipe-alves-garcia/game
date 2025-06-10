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
    let direcao;
    switch (event.key){
        case 'a':
            p1.keys.a.pressed = true;
            p1.keys.d.pressed = false;
            p1.lastKey = "a";
        break;
        case 'd':
            p1.keys.d.pressed = true;
            p1.keys.a.pressed = false;
            p1.lastKey = "d";
        break;
        case 'w':
            p1.keys.w.pressed = true;
            p1.lastKey = "w";
            p1.eixoY = pulo(p1.keys.w.pressed, p1.pulo, p1.puloEstado, p1.eixoY);
            if(!p1.puloEstado)
                p1.puloEstado = true;
        break;
        case "b":
            p1.keys.b.pressed = true;
            p1.lastKey = "b";
            if (!p1.ataqueAtivoBaixo){
                direcao = "left";
                if (p1.dx - p2.dx <= 0)
                    direcao = "right"
                p1.ataque[p1.numAtaque] = ataque(
                    p1.dx,
                    p1.dy,
                    p1.dw,
                    p1.dh,
                    direcao,
                    "baixo",
                )
                p1.numAtaque++;  
                p1.ataqueAtivoBaixo = true;
                ataqueTime = setTimeout(() => {
                    p1.ataqueAtivoBaixo = false;
                }, 1000)
            }
        break;
        case "v":
            p1.keys.b.pressed = true;
            p1.lastKey = "b";
            if (!p1.ataqueAtivoAlto){
                direcao = "left";
                if (p1.dx - p2.dx <= 0)
                    direcao = "right"
                p1.ataque[p1.numAtaque] = ataque(
                    p1.dx,
                    p1.dy,
                    p1.dw,
                    p1.dh,
                    direcao,
                    "alto",
                )
                p1.numAtaque++;  
                p1.ataqueAtivoAlto = true;
                ataqueTime = setTimeout(() => {
                    p1.ataqueAtivoAlto = false;
                }, 1000)
            }
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
        case 'b':
            p1.keys.b.pressed = false
        break;
        case 'v':
            p1.keys.v.pressed = false
        break;
    }
});

//Controll Player 2

window.addEventListener("keydown", (event) => {
    let direcao;
    switch (event.key){
        case 'ArrowLeft':
            p2.keys.a.pressed = true;
            p2.keys.d.pressed = false;
            p2.lastKey = "ArrowLeft";
        break;
        case 'ArrowRight':
            p2.keys.d.pressed = true;
            p2.keys.a.pressed = false;
            p2.lastKey = "ArrowRight";
        break;
        case 'ArrowUp':
            p2.keys.w.pressed = true;
            p2.lastKey = "ArrowUp";
            p2.eixoY = pulo(p2.keys.w.pressed, p2.pulo, p2.puloEstado, p2.eixoY);
            if(!p2.puloEstado)
                p2.puloEstado = true;
        break;
        case "p":
            p2.keys.p.pressed = true;
            p2.lastKey = "p";
            if (!p2.ataqueAtivoBaixo){
                direcao = "left";
                if (p2.dx - p1.dx <= 0)
                    direcao = "right"
                p2.ataque[p2.numAtaque] = ataque(
                    p2.dx,
                    p2.dy,
                    p2.dw,
                    p2.dh,
                    direcao,
                    "baixo",
                )
                p2.numAtaque++;  
                p2.ataqueAtivoBaixo = true;
                ataqueTime = setTimeout(() => {
                    p2.ataqueAtivoBaixo = false;
                }, 1000)
            }
        break;
        case "o":
            p2.keys.o.pressed = true;
            p2.lastKey = "o";
            if (!p2.ataqueAtivoAlto){
                direcao = "left";
                if (p2.dx - p1.dx <= 0)
                    direcao = "right"
                p2.ataque[p2.numAtaque] = ataque(
                    p2.dx,
                    p2.dy,
                    p2.dw,
                    p2.dh,
                    direcao,
                    "alto",
                )
                p2.numAtaque++;  
                p2.ataqueAtivoAlto = true;
                ataqueTime = setTimeout(() => {
                    p2.ataqueAtivoAlto = false;
                }, 1000)
            }
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
        case 'p':
            p2.keys.p.pressed = false;
        break;
        case 'o':
            p2.keys.o.pressed = false
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
    element:"jogador1",
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    dx:200,
    dy:100,
    dw:64,
    dh:128,
    ataque:[

    ],
    ataqueAtivoAlto:false,
    ataqueAtivoBaixo:false,
    numAtaque:0,
    keys: {
        a:{pressed:false},
        d:{pressed:false},
        w:{pressed:false},
        b:{pressed:false},
        v:{pressed:false}
    },
    lastKey:"",
    eixoX:0,
    eixoY:0,
    pulo:-400,
    puloEstado:false,
    velocidade:300,
    hitbox:"rgb(255, 0, 0)",
    update (fps){
        //Print
        print (p1.dx, p1.dy, p1.dw, p1.dh, p1.hitbox);

        //Pulo

        //gravidade
        p1.eixoY = gravidade(p1.eixoY, fps, p1.dx, p1.dy, p1.dw, p1.dh, p1.element);
        let colisaoPulo = colisao(p1.dx, p1.dy, p1.dw, p1.dh, p1.element);
        if(colisaoPulo && p1.eixoY >= 0)
            p1.puloEstado = false;
        p1.dy += p1.eixoY * fps;

        //Movimentação
        if (p1.keys.a.pressed){
            let colisaoEstado = colisao(p1.dx, p1.dy-1, p1.dw, p1.dh, p1.element);
            (! colisaoEstado) ? p1.eixoX = -p1.velocidade * fps : p1.eixoX = 0;
        } 
        else if (p1.keys.d.pressed){
            let colisaoEstado = colisao(p1.dx, p1.dy-1, p1.dw, p1.dh, p1.element);
            (! colisaoEstado) ? p1.eixoX = p1.velocidade * fps : p1.eixoX = 0;
        }
        else if (! p1.keys.a.pressed && ! p1.keys.d.pressed){
            p1.eixoX = 0;
        }
        let colisaoX = colisao(p1.dx + p1.eixoX, p1.dy -1, p1.dw, p1.dh, p1.element)
        if(!colisaoX){
            p1.dx += p1.eixoX;
        }
        else if(p1.eixoX > 0){
            p1.dx += (floor.dx - p1.dx - p1.dw - 1);
        }
        else if(p1.eixoX < 0){
            p1.dx += (floor.dx + floor.dw - p1.dx + 1);
        }

        //Ataque
        if (p1.numAtaque > 0){
            p1.ataque.forEach((at) => {
                if(at.ativo){
                    at.dx += at.eixoX * fps;

                    at.eixoY = gravidade(at.eixoY, fps, at.dx, at.dy, at.dw, at.dh, p1.element);
                    at.dy += at.eixoY * fps;
                }
                print(at.dx, at.dy, at.dw, at.dh, at.style)
            })
        }
    }, 
}

//Player 2

let p2 = {
    element:"jogador2",
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    dx:bg.dw-200-64,
    dy:100,
    dw:64,
    dh:128,
    ataque:[

    ],
    ataqueAtivoAlto:false,
    ataqueAtivoBaixo:false,
    numAtaque:0,
    keys: {
        a:{pressed:false},
        d:{pressed:false},
        w:{pressed:false},
        p:{pressed:false},
        o:{pressed:false},
    },
    lastKey:"",
    eixoX:0,
    eixoY:0,
    pulo:-350,
    puloEstado:false,
    velocidade:350,
    hitbox:"rgb(0, 0, 255)",
    update (fps){
        //print
        print (p2.dx, p2.dy, p2.dw, p2.dh, p2.hitbox);

        //gravidade
        p2.eixoY = gravidade(p2.eixoY, fps, p2.dx, p2.dy, p2.dw, p2.dh, p2.element);
        let colisaoPulo = colisao(p2.dx, p2.dy, p2.dw, p2.dh, p2.element);
        if(colisaoPulo && p2.eixoY >= 0)
            p2.puloEstado = false;
        p2.dy += p2.eixoY * fps;
        

        //Movimentação
        if (p2.keys.a.pressed){
            let colisaoEstado = colisao(p2.dx, p2.dy -1, p2.dw, p2.dh, p2.element);
            (! colisaoEstado) ? p2.eixoX = -p2.velocidade * fps : p2.eixoX = 0;
        } 
        else if (p2.keys.d.pressed){
            let colisaoEstado = colisao(p2.dx, p2.dy -1, p2.dw, p2.dh, p2.element);
            (! colisaoEstado) ? p2.eixoX = p2.velocidade * fps : p2.eixoX = 0;
        }
        else if (! p2.keys.a.pressed && ! p2.keys.d.pressed){
            p2.eixoX = 0;
        }
        let colisaoX = colisao(p2.dx + p2.eixoX, p2.dy -1, p2.dw, p2.dh, p2.element)
        if(!colisaoX){
            p2.dx += p2.eixoX;
        }
        else if(p2.eixoX > 0){
            p2.dx += (floor.dx - p2.dx - p2.dw - 1);
        }
        else if(p2.eixoX < 0){
            p2.dx += (floor.dx + floor.dw - p2.dx + 1);
        }

        //Ataque
        if (p2.numAtaque > 0){
            p2.ataque.forEach((at) => {
                if(at.ativo){
                    at.dx += at.eixoX * fps;

                    at.eixoY = gravidade(at.eixoY, fps, at.dx, at.dy, at.dw, at.dh, p1.element);
                    at.dy += at.eixoY * fps;
                }
                print(at.dx, at.dy, at.dw, at.dh, at.style)
            })
        }
    }, 
}

//Chão

let floor = {
    element:"chao",
    sx:0,
    sy:0,
    sw:0,
    sh:0,
    dx:150,
    dy:bg.dh-100,
    dw:bg.dw-300,
    dh:1000,
    hitbox:"rgb(50, 50, 50)",
    update(){
        print(floor.dx, floor.dy, floor.dw, floor.dh, floor.hitbox)
    }
}

//Colisao

let hb = [
    {
        element:"chao",
        x:floor.dx,
        y:floor.dy,
        w:floor.dw,
        h:floor.dh,
    },
]

//-------------------------------------------------//

function gravidade (eixoY, fps, x, y, w, h, element){
    let gravi = 800;
    let colisaoEstado = colisao(x, y, w, h, element)
    if (!colisaoEstado || eixoY < 0){
        if(
            ((eixoY + (gravi * fps)) * fps)+ y + h >= floor.dy &&
            x+w >= floor.dx &&
            x <= floor.dx+floor.dw
        ){
            return ((floor.dy - y - h) / fps);
        }
        return eixoY + (gravi * fps);
    }
    else
        return 0; 
}

function pulo (key, pulo, puloEstado, eixoY){
    if (key && !puloEstado)
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

function colisao (x, y, w, h, element){
    let colisaoEstado = false;
    let i = 0
    hb.forEach((item) => {
        if (item.element != element){
            if(
                x+w >= item.x &&
                x <= item.x+item.w &&
                y+h >= item.y &&
                y <= item.y+item.h
            ){
                colisaoEstado = true;
            }
        }
    });
    return colisaoEstado;
}

function ataque (x, y, w, h, direcao, tipo){
    let ataque = {
        dx:x+w,
        dy:y+(h/4),
        dw:16,
        dh:16,
        tipo:tipo,
        direcao:direcao,
        ativo:true,
        eixoX:0,
        eixoY:0,
        style:"rgb(255, 255, 0)"
    }
    if(ataque.tipo == "alto"){
        ataque.eixoX = 500;
        ataque.eixoY = -600;
    }
    else if(ataque.tipo == "baixo"){
        ataque.eixoX = 900;
        ataque.eixoY = -200;
    }
    if(ataque.direcao == "left"){
        ataque.eixoX = ataque.eixoX * -1;
        ataque.dx = x - ataque.dw;
    }
    return ataque;
}

//-------------------------------------------------//

let play = document.querySelector("#jogar");
play.addEventListener("click", () => {
    play.style.display = "none";
    carregarJogo();
});

let lastFrame = 0;
let altera = false;

function loop (now){

    const deltaTime = (now - lastFrame) / 1000; // em segundos
    lastFrame = now;

    //console.log("FPS = "+(1 / deltaTime)+" --- "+ deltaTime)

    //if(altera){
    bg.update();
    floor.update();
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
}