

function Jugador() {
    this.atac = 0;
    this.defensa = 0;
    this.assistencia = 0;
}

Jugador.prototype.CalculaPuntuacio = function() {
    return this.atac + this.defensa + this.assistencia;
};