class Jugador {
    constructor() {
        this.nom = "";
        this.atac = 0;
        this.defensa = 0;
        this.assistencia = 0;
    }
    
    CalculaPuntuacio() {
        return this.atac + this.defensa + this.assistencia;
    }
}

