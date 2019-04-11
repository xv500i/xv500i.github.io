describe("Jugador", function() {
    var jugador;

    beforeEach(function(){
        jugador = new Jugador();
    });

    describe("Te valors de", function(){
        it("atac", function(){
            expect(jugador.atac).toBeDefined();
        });
    
        it("defensa", function(){
            expect(jugador.defensa).toBeDefined();
        });
    
        it("assistencia", function(){
            expect(jugador.assistencia).toBeDefined();
        });
    });

    describe("Puntuacio", function(){
        beforeEach(function(){
            jugador.atac = 0;
            jugador.defensa = 0;
            jugador.assistencia = 0;
        });

        it("es mes gran quan mes atac te", function(){
            let p1 = jugador.CalculaPuntuacio();
            jugador.atac += 1;
            let p2 = jugador.CalculaPuntuacio();
            expect(p2).toBeGreaterThan(p1);
        });

        it("es mes gran quan mes defensa te", function(){
            let p1 = jugador.CalculaPuntuacio();
            jugador.defensa += 1;
            let p2 = jugador.CalculaPuntuacio();
            expect(p2).toBeGreaterThan(p1);
        });

        it("es mes gran quan mes assistencia te", function(){
            let p1 = jugador.CalculaPuntuacio();
            jugador.assistencia += 1;
            let p2 = jugador.CalculaPuntuacio();
            expect(p2).toBeGreaterThan(p1);
        });

        it("l'atac es igual d'important que la defensa", function(){
            jugador.defensa += 1;
            let p1 = jugador.CalculaPuntuacio();
            jugador.defensa -= 1;
            jugador.atac += 1;
            let p2 = jugador.CalculaPuntuacio();
            expect(p2).toBe(p1);
        });

        it("l'atac es igual d'important que la assistencia", function(){
            jugador.atac += 1;
            let p1 = jugador.CalculaPuntuacio();
            jugador.atac -= 1;
            jugador.assistencia += 1;
            let p2 = jugador.CalculaPuntuacio();
            expect(p2).toBe(p1);
        });

        it("la defensa es igual d'important que la assistencia", function(){
            jugador.defensa += 1;
            let p1 = jugador.CalculaPuntuacio();
            jugador.defensa -= 1;
            jugador.assistencia += 1;
            let p2 = jugador.CalculaPuntuacio();
            expect(p2).toBe(p1);
        });
    });
});