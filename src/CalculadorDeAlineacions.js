class CalculadorDeAlineacions {
    constructor() {
        this.alineacions = [];
    }

    Calcula(jugadors) {
        let jugadorsAlineats = new Set();
        let jugadorsDisponibles = new Set(jugadors);
        
        jugadorsDisponibles.forEach(jugador => {
            this.AlineaJugadorRecursiu(jugador, jugadorsDisponibles, jugadorsAlineats)
        });
    }

    AlineaJugadorRecursiu(jugador, jugadorsDisponibles, jugadorsAlineats) {
        let jugadorsAlineatsLocal = new Set(jugadorsAlineats);
        let jugadorsDisponiblesLocal = new Set(jugadorsDisponibles);
        jugadorsAlineatsLocal.add(jugador);
        jugadorsDisponiblesLocal.delete(jugador);

        if(jugadorsAlineatsLocal.size == 5) {
            this.ConsideraCandidat(jugadorsAlineatsLocal);
        } else {
            jugadorsDisponiblesLocal.forEach(jugador => {
                this.AlineaJugadorRecursiu(jugador, jugadorsDisponiblesLocal, jugadorsAlineatsLocal);
            });
        }
    }

    ConsideraCandidat(novaAlineacio) {
        let jaLaConte = false;
        this.alineacions.forEach(alineacio => {
            if (alineacio.size == novaAlineacio.size) {
                let jugadors = Array.from(novaAlineacio.values());
                let equivalent = true;
                jugadors.forEach(jugador => {
                    if (!alineacio.has(jugador)) {
                        equivalent = false;
                    }
                });
                if (equivalent) {
                    jaLaConte = true;
                }
            }
        });
        if(!jaLaConte) {
            this.alineacions.push(novaAlineacio);
        }
    }
}
