class Slime {
    //HOLA
    constructor(posX,posY,radio,masa,juego){
        this.position = {x:posX, y:posY};

        this.radio = radio; 
        this.masa = masa;
        this.juego = juego;

        this.vel = {x:0, y:0};
        
        var graficos = new PIXI.Graphics()
        .circle(0, 0, this.radio)
        .fill({color: 0x00ff00});

        this.sprite = graficos;

        this.velocidad = 1;

        this.juego.app.stage.addChild(graficos);  
        
                        
    }
    asignarVelocidad(nuevaVelocidad){
        this.vel.x = nuevaVelocidad.x;
        this.vel.y = nuevaVelocidad.y;
    }
    asignarVelocidad(x,y){
        this.vel.x = x;
        this.vel.y = y;
    }
    irA(x,y){
        this.position.x = x;
        this.position.y = y;
    }
    frenar(){
        this.vel.x = 0;
        this.vel.y = 0;
    }
    update(){
        this.verifecarColisiones()
        this.aplicarFuerzaQueMeLlevaAlMouse();
        this.aplicarVelocidad();
    }
    aplicarFriccion(){
        this.vel.x *= 0.98;
        this.vel.y *= 0.98;
        if(vaMuyLento(vel)){
            this.frenar();
        }
    }
    aplicarVelocidad(){
        //console.log(this.position,this.vel);
        this.position.x += this.vel.x * this.juego.delta;
        this.position.y += this.vel.y * this.juego.delta;
    }
    aplicarFuerzaQueMeLlevaAlMouse(){
        this.verificarColisionConSlimesMalos();
        if(this.juego.mousePos === undefined) return;

        //console.log(this.position,this.juego.mousePos);
        //onsole.log(distancia(this.position,this.juego.mousePos));

        if(distancia(this.position,this.juego.mousePos) < 10){
            this.frenar();
            this.position.x = this.juego.mousePos.x;
            this.position.y = this.juego.mousePos.y;
            return;
        }

        const fuerza = getUnitVector(
            this.juego.mousePos,
            this.position
            
        );

        this.asignarVelocidad(fuerza.x * this.velocidad , fuerza.y * this.velocidad);
    }
    verifecarColisiones(){
        for (let i = 0; i < this.juego.slimeTontos.length; i++) {
            const slimeTonto = this.juego.slimeTontos[i];
            if(distancia(this.position,slimeTonto.position) < this.radio + slimeTonto.radio){
                
                var area = Math.PI * this.radio ** 2;
                var area2 = Math.PI * slimeTonto.radio ** 2;
                var radioNuevo = Math.sqrt((area + area2) / Math.PI);

                this.sprite.setSize(radioNuevo * 2);

                this.radio = radioNuevo;

                console.log(this.sprite.scale.x);

                this.juego.app.stage.removeChild(slimeTonto);
                slimeTonto.destroy();
                this.juego.slimeTontos.splice(i, 1);
                i--;
            }
        }

    
    }
    render(){
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }
    verificarColisionConSlimesMalos() {
        for (let i = 0; i < this.juego.slimesMalos.length; i++) {
          const malo = this.juego.slimesMalos[i];
          if (distancia(this.position, malo.position) < this.radio + malo.radio) {
            this.juego.slimesMalos.splice(i, 1);
            malo.destroy();
            this.juego.perderVida();
            break;
          }
        }
      }
}

class SlimeTonto {

    constructor(posX,posY,radio,masa,juego){
        this.position = {x:posX, y:posY};

        this.radio = radio; 
        this.masa = masa;
        this.juego = juego;

        this.direction = {x:0, y:0};
        console.log(Math.random() * 2 - 1);
        this.asignarDireccion(Math.random() * 2 - 1,Math.random() * 2 - 1);
        console.log(this.direction);
        
        const graficos = new PIXI.Graphics()
        .circle(0, 0, this.radio)
        .fill({color: 0xff0000});

        this.sprite = graficos;

        this.velocidad = 0.5;

        this.juego.app.stage.addChild(graficos);  

        setInterval(() => {
            this.velocidad = Math.random() * 0.4 + 0.1;
        }, 1000);
                        
    }
    asignarDireccion(x,y){
        const direcciónNormalizada = normalizar(x,y);
        //console.log(direcciónNormalizada);
        this.direction.x = direcciónNormalizada.x;
        this.direction.y = direcciónNormalizada.y;
    }

    update(){
        
        this.rebotar();
        this.aplicarDireccion();
    }

    rebotar(){
        if(this.position.y + this.radio > this.juego.alto || this.position.y - this.radio < 0){
            this.direction.y *= -1;
            if(this.position.y< 0){
                this.position.y = 0;
            }
            if(this.position.y > this.juego.alto){
                this.position.y = this.juego.alto;
            }
            //console.log("reboto"+ performance.now())
        }
        if(this.position.x + this.radio  > this.juego.ancho || this.position.x - this.radio  < 0){
            this.direction.x *= -1;
            if(this.position.x < 0){
                this.position.x = 0;
            }
            if(this.position.x > this.juego.ancho){
                this.position.x = this.juego.ancho;
            }
            //console.log("reboto"+ performance.now());
        }
    }

    aplicarDireccion(){
        //console.log(this.position,this.vel);
        this.position.x += this.direction.x * this.juego.delta * this.velocidad;
        this.position.y += this.direction.y * this.juego.delta * this.velocidad;
    }
    render(){
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }
    destroy(){
        this.sprite.destroy();
    }
}
class SlimeMalo {
    constructor(x, y, radio, juego) {
      this.position = { x, y };
      this.radio = radio;
      this.juego = juego;
  
      this.sprite = new PIXI.Graphics()
        .circle(0, 0, this.radio)
        .fill({ color: 0x0000ff }); // AZUL
  
      this.juego.app.stage.addChild(this.sprite);
  
      this.direccion = normalizar(Math.random() * 2 - 1, Math.random() * 2 - 1);
      this.velocidad = 0.7;
    }
  
    update() {
      this.position.x += this.direccion.x * this.juego.delta * this.velocidad;
      this.position.y += this.direccion.y * this.juego.delta * this.velocidad;
  
      // Rebote contra bordes
      if (this.position.x < 0 || this.position.x > this.juego.ancho) this.direccion.x *= -1;
      if (this.position.y < 0 || this.position.y > this.juego.alto) this.direccion.y *= -1;
    }
  
    render() {
      this.sprite.x = this.position.x;
      this.sprite.y = this.position.y;
    }
  
    destroy() {
      this.sprite.destroy();
    }
  }
  