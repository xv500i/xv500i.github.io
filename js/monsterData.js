const bestiaryData = [
  {
    nombre: "Aboleth",
    descripcion: [
      "Aberración Grande, Legal maligno",
      "Esta alargada criatura pisciforme dotada de tres musculosos tentáculos y una formidable cola es el señor indiscutible de las aguas más tenebrosas desde épocas pretéritas. Su cuerpo escamoso exuda un negro icor que contamina el agua, mientras que sus crueles ojos destellan rojos, especialmente cuando usa su poderosa mente para subyugar a cuanto humanoide encuentre. Lo último que ven sus presas al dirigirse al agua con una boba sonrisa son sus fauces, dotada de hilera tras hilera de largos y puntiagudos dientes.",
    ],
    ca: "17 (armadura natural)",
    pg: "135 (18d10+36)",
    velocidad: "10 pies, nadando 40 pies",
    habilidades: "Historia +12, Percepción +10",
    desafio: 10,
    sentidos: "Visión en la oscuridad 120 pies, Percepción pasiva 20",
    idiomas: "Habla profunda, telepatía 120 pies",
    acciones: [
      {
        nombre: "Multiataque",
        descripcion: "El aboleth hace tres ataques de tentáculos.",
      },
      {
        nombre: "Tentáculos",
        descripcion:
          "Ataque de arma cuerpo a cuerpo: +9 al ataque, alcance 10 pies, un objetivo. Impacto: 12 (2d6+5) puntos de daño contundente. Si el objetivo es una criatura, debe superar una tirada de salvación de Constitución CD 14 para no quedar enferma. La enfermedad empieza a tener efecto después de 1 minuto, tiempo durante el cual se puede eliminar mediante cualquier magia que cure una enfermedad. Después de 1 minuto, la piel de la criatura enferma se vuelve translúcida y viscosa, la criatura no puede recuperar puntos de golpe a menos que se encuentre bajo el agua y la enfermedad solo se puede eliminar con Sanar u otro conjuro de nivel 6 o superior que cure enfermedades. Cuando la criatura está fuera del agua, recibe 6 (1d12) puntos de daño por ácido cada 10 minutos a menos que se le aplique algo húmedo sobre la piel en ese tiempo.",
      },
      {
        nombre: "Cola",
        descripcion:
          "Ataque de arma cuerpo a cuerpo: +9 al ataque, alcance 10 pies, un objetivo. Impacto: 15 (3d6+5) puntos de daño contundente.",
      },
      {
        nombre: "Esclavizar (3/día)",
        descripcion:
          "El aboleth elige a una criatura que pueda ver a 30 pies o menos de él. El objetivo debe superar una tirada de salvación de Sabiduría CD 14 para no quedar hechizado mágicamente por el aboleth hasta que este muera o se encuentre en un plano de existencia diferente al plano en el que se encuentre el objetivo. El objetivo hechizado está bajo el control del aboleth y no puede realizar reacciones, y ambos se pueden comunicar telepáticamente entre sí a cualquier distancia. Cuando el objetivo hechizado recibe daño, puede repetir la tirada de salvación. Si tiene éxito, el efecto termina. Una vez cada 24 horas, el objetivo puede repetir la tirada de salvación si está al menos a 1 milla de distancia del aboleth.",
      },
    ],
    salvacionCon: 6,
    salvacionRef: 8,
    salvacionVol: 6,
    fue: 5,
    des: -1,
    con: +2,
    int: 4,
    sab: +2,
    car: 4,
    rasgos: [
      {
        nombre: "Anfibio",
        descripcion: "El aboleth puede respirar aire y agua.",
      },
      {
        nombre: "Nube de mucosa",
        descripcion:
          "Mientras está bajo el agua, el aboleth está envuelto en una mucosa cambiante. Una criatura que toque al aboleth o que lo golpee con un ataque cuerpo a cuerpo mientras esté a 5 pies o menos de él debe hacer una tirada de salvación de Constitución CD 14. Si falla, queda enferma durante 1d4 horas. La criatura enferma solo puede respirar bajo el agua.",
      },
      {
        nombre: "Telepatía interrogatoria",
        descripcion:
          "Si una criatura que el aboleth pueda ver se comunica telepáticamente con el aboleth, este averigua sus mayores deseos.",
      },
    ],
    imagen: "img/aboleth.png",
    accionesLegendarias: {
      descripcion:
        "Puede realizar 3 acciones legendarias, solo una a la vez y al final del turno de otra criatura. Recupera las acciones legendarias gastadas al principio de su turno.",
      acciones: [
        {
          nombre: "Detectar",
          descripcion: "El aboleth hace una prueba de Sabiduría (Percepción).",
        },
        {
          nombre: "Coletazo",
          descripcion: "El aboleth hace un ataque de cola.",
        },
        {
          nombre: "Drenar psique (cuesta 2 acciones)",
          descripcion:
            "Una criatura hechizada por el aboleth recibe 10 (3d6) puntos de daño psíquico y el aboleth recupera tantos puntos de golpe como daño reciba la criatura.",
        },
      ],
    },
  },
];
