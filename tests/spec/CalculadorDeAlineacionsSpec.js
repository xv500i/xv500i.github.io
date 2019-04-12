describe("CalculadorDeAlineacions", function() {
    let jugador1;
    let jugador2;
    let jugador3;
    let jugador4;
    let jugador5;
    let jugador6;
    let jugador7;
    let jugador8;
    let jugador9;
    let jugador10;
    let jugador11;
    let jugador12;
    let jugadors;
    let calculadorDeAlineacions;

    beforeEach(function(){
        jugador1 = new Jugador();
        jugador2 = new Jugador();
        jugador3 = new Jugador();
        jugador4 = new Jugador();
        jugador5 = new Jugador();
        jugador6 = new Jugador();
        jugador7 = new Jugador();
        jugador8 = new Jugador();
        jugador9 = new Jugador();
        jugador10 = new Jugador();
        jugador11 = new Jugador();
        jugador12 = new Jugador();
        jugador1.nom = "1";
        jugador2.nom = "2";
        jugador3.nom = "3";
        jugador4.nom = "4";
        jugador5.nom = "5";
        jugador6.nom = "6";
        calculadorDeAlineacions = new CalculadorDeAlineacions();
    });

    describe("ObteAlineacio", function(){
        it("nomes hi ha una alineacio possible amb 5 jugadors", function(){
            jugadors = [jugador1, jugador2, jugador3, jugador4, jugador5];
            calculadorDeAlineacions.Calcula(jugadors);
            expect(calculadorDeAlineacions.alineacions.length).toBe(1);
        });

        it("amb 6 jugadors, hi ha 6 alineacions", function() {
            jugadors = [jugador1, jugador2, jugador3, jugador4, jugador5, jugador6];
            calculadorDeAlineacions.Calcula(jugadors);
            expect(calculadorDeAlineacions.alineacions.length).toBe(6);
        });

        it("les alineacions son de 5 jugadors", function() {
            jugadors = [jugador1, jugador2, jugador3, jugador4, jugador5, jugador6];
            calculadorDeAlineacions.Calcula(jugadors);
            expect(calculadorDeAlineacions.alineacions[0].size).toBe(5);
        });
    });
});