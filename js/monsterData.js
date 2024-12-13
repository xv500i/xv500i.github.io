const bestiaryData = [
  {
    nombre: "ACÓLITO",
    descripcion: "Iniciado religioso que conoce rituales y ritos básicos.",
    ca: 12,
    pg: 4,
    mov: "cerca",
    ata: [
      { name: "1 maza (cerca)", description: "+1 (1d6)" },
      { name: "1 hechizo" },
    ],
    fue: 1,
    des: -1,
    con: +0,
    int: -1,
    sab: +2,
    car: 0,
    alineamiento: "L",
    niv: 1,
    entradas: [
      {
        nombre: "Toque curativo (Hechizo Sab)",
        descripcion: "CD 11. Cura 1d4 pg una criatura cerca.",
      },
    ],
  },
  {
    nombre: "ABOLETH",
    descripcion:
      "Enormes y antediluvianos peces con tentáculos cubiertos de limo. Odian a todos los seres inteligentes.",
    ca: 16,
    pg: 39,
    mov: "cerca (nadar)",
    ata: [{ name: "2 tentáculo (cerca)", description: "+5 (1d8 + maldición)" }],
    fue: 4,
    des: -1,
    con: +3,
    int: +4,
    sab: +2,
    car: +2,
    alineamiento: "C",
    niv: 8,
    entradas: [
      {
        nombre: "Maldición",
        descripcion:
          "Con CD 15 o el objetivo se transforma en un profundo durante 2d10 días.",
      },
      {
        nombre: "Esclavizar",
        descripcion:
          "En vez de atacar, una criatura hasta lejos debe salvar Sab CD 15 o el aboleth lo controla durante 1d4 rondas.",
      },
      {
        nombre: "Telepatía",
        descripcion: "Lee la mente de todas las criaturas hasta lejos.",
      },
    ],
  },
  {
    nombre: "Armadura Animada",
    descripcion:
      "Una vieja armadura mágicamente animada por un espíritu vengativo.",
    ca: 15,
    pg: 11,
    mov: "cerca",
    ata: [{ name: "espada larga (cerca)", description: "+3 (1d8)" }],
    fue: 3,
    des: -1,
    con: +2,
    int: -1,
    sab: +1,
    car: +0,
    alineamiento: "C",
    niv: 2,
    entradas: [
      {
        nombre: "Estatua",
        descripcion: "Cuando está quieta parece una armadura normal.",
      },
    ],
  },
  {
    nombre: "Bandido",
    descripcion:
      "Pícaro duro y andrajoso vestido con cuero y una capa con capucha.",
    ca: 13,
    comentario_ca: "escudo y armadura de cuero",
    pg: 4,
    mov: "cerca",
    ata: [
      { name: "porra (cerca)", description: "+1 (1d4)" },
      { name: "arco corto (cerca)", description: "+0 (1d4)" },
    ],
    fue: 1,
    des: 0,
    con: +0,
    int: -1,
    sab: +0,
    car: -1,
    alineamiento: "C",
    niv: 1,
    entradas: [
      {
        nombre: "Emboscada",
        descripcion:
          "Añade un dado extra de daño mientras no te hayan detectado.",
      },
    ],
  },
  {
    nombre: "Murciélago gigante",
    descripcion:
      "Un mamífero del tamaño de una águila interesado en la sangre.",
    ca: 12,
    pg: 9,
    mov: "cerca",
    ata: [{ name: "mordisco (cerca)", description: "+2 (1d6)" }],
    fue: -1,
    des: +2,
    con: +0,
    int: -3,
    sab: +1,
    car: -3,
    alineamiento: "N",
    niv: 2,
    entradas: [],
  },
  {
    nombre: "Oso",
    descripcion: "Una gran masa de pelo con garras más largas que un dedo.",
    ca: 13,
    pg: 25,
    mov: "cerca (escalar)",
    ata: [{ name: "2 garras (cerca)", description: "+4 (1d8)" }],
    fue: +4,
    des: +1,
    con: +3,
    int: -2,
    sab: +1,
    car: -2,
    alineamiento: "N",
    niv: 5,
    entradas: [
      {
        nombre: "Crujir",
        descripcion:
          "Añade un dado extra de daño si golpeas as mismo objetivo con las dos garras.",
      },
    ],
  },
];
