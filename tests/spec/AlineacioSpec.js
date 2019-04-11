describe("Alineacio", function() {
    let alineacio;
    let jugador1;
    let jugador2;
    let jugador3;
    let jugador4;
    let jugador5;

    beforeEach(function(){
        alineacio = new Alineacio();
        jugador1 = new Jugador();
        jugador2 = new Jugador();
        jugador3 = new Jugador();
        jugador4 = new Jugador();
        jugador5 = new Jugador();
        alineacio.jugadors = [jugador1, jugador2, jugador3, jugador4, jugador5];
    });

    describe("Puntuacio", function(){
        it("es mes gran si la puntuacio dels jugadors es mes gran", function(){
            let p1 = alineacio.CalculaPuntuacio();
            jugador1.atac += 1;
            let p2 = alineacio.CalculaPuntuacio();
            expect(p2).toBeGreaterThan(p1);
        });

        it("es mes gran si el màxim de puntuacio dels jugadors es mes gran", function(){
            jugador1.atac = 0
            jugador2.atac = 10
            let p1 = alineacio.CalculaPuntuacio();
            jugador1.atac = 5;
            jugador2.atac = 5;
            let p2 = alineacio.CalculaPuntuacio();
            expect(p1).toBeGreaterThan(p2);
        });

        it("es mes gran si el minim de puntuacio dels jugadors es mes gran", function(){
            jugador1.atac = 1;
            jugador2.atac = 1;
            jugador3.atac = 1;
            jugador4.atac = 1;
            jugador5.atac = 6;
            let p1 = alineacio.CalculaPuntuacio();
            jugador1.atac = 0;
            jugador2.atac = 0;
            jugador3.atac = 0;
            jugador4.atac = 4;
            jugador5.atac = 6;
            let p2 = alineacio.CalculaPuntuacio();
            expect(p1).toBeGreaterThan(p2);
        });
    });
});