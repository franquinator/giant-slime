class Eventos{
    constructor(juego){
        this.juego = juego;
        this.iniciar();
    }
    iniciar(){
        window.onmousemove = (evento) => {
            this.cuandoSeMueveElMouse(evento);
        };
        window.addEventListener('mousedown', (evento) => {
            this.cuandoSePresionaElMouse(evento);
        });

        window.addEventListener('mouseup', (evento) => {
            this.cuandoSeSueltaElMouse(evento);
        });
    
        window.addEventListener('keydown', (evento) => {
            this.cuandoSePresionaUnaTecla(evento)
        });
    
        window.addEventListener('wheel', (evento) => {
            this.cuandoSeGiraLaRueda(evento);
        }, { passive: false });
    }

    cuandoSeMueveElMouse(evento) {
        this.juego.mouse = { x: evento.x, y: evento.y };
    }

    cuandoSeGiraLaRueda(evento) {
        //this.juego.camara.ajustarTamanio(evento.deltaY / 1000);
    }

    cuandoSePresionaUnaTecla(evento) {
        let key = evento.key.toLowerCase();
        if (key === 'r' && this.juego.finalizado) {
            reiniciarJuego();
        }
        if (key === 'd') {
            this.juego.hud.togglePanelDebug();
        }
        if(key === '+'){
            this.juego.slime.crecer(5)
        }
    }

    cuandoSePresionaElMouse(evento) {
        this.juego.mousePresionado = true;
    }

    cuandoSeSueltaElMouse(evento) {
        this.juego.mousePresionado = false;
    }
}