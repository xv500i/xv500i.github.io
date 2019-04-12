class Alineacio {
    constructor() {
        this.jugadors = [];
    }
    
    CalculaPuntuacio() {
        if (this.jugadors.length == 0) {
            return 0;
        }
        let puntuacio = 0;
        let maxim = NaN;
        let minim = NaN;
        this.jugadors.forEach(function (jugador) {
            let puntuacioJugador = jugador.CalculaPuntuacio();
            if (isNaN(maxim)) {
                maxim = puntuacioJugador;
            }
            else {
                maxim = Math.max(maxim, puntuacioJugador);
            }
            if (isNaN(minim)) {
                minim = puntuacioJugador;
            }
            else {
                minim = Math.min(minim, puntuacioJugador);
            }
            puntuacio += puntuacioJugador;
        });
        return puntuacio + maxim + minim;
    }
}

