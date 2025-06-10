class Grilla {
    constructor(juego, anchoCelda) {
        this.juego = juego;
        this.anchoCelda = anchoCelda;
        this.celdaALoAncho = Math.ceil(this.juego.tamanioBase / this.anchoCelda);
        this.celdaALoAlto = Math.ceil(this.juego.tamanioBase / this.anchoCelda);

        this.celdas = {};

        this.initGrilla();
    }
    initGrilla() {
        for (let x = 0; x < this.celdaALoAncho; x++) {
        for (let y = 0; y < this.celdaALoAlto; y++) {
            const celda = new Celda(this.juego, this.anchoCelda, x, y);
            const hash = this.obtenerHashDePosicion(x, y);
            this.celdas[hash] = celda;
        }
        }
        console.log("grilla inicializada", this.celdas);
    }

    obtenerHashDePosicion(x, y) {
        return "x_" + x + "_y_" + y;
    }

    obtenerCeldaEnPosicion(x, y) {
        const nuevaX = Math.floor(x / this.anchoCelda);
        const nuevaY = Math.floor(y / this.anchoCelda);
        const hash = this.obtenerHashDePosicion(nuevaX, nuevaY);

        let celda = this.celdas[hash];

        if (!celda) {
            console.log("la celda no existe");
        // console.log("nueva celda", nuevaX, nuevaY);
        celda = this.celdas[hash] = new Celda(
            this.juego,
            this.anchoCelda,
            nuevaX,
            nuevaY
        );
        }

        return celda;
    }
}  