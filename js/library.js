const bestiaryData = [
  {
    nombre: "ACÓLITO",
    descripcion: "Iniciado religioso que conoce rituales y ritos básicos.",
    ca: 12,
    pg: 4,
    mov: "cerca",
    ata: ["1 maza (cerca): +1 (1d6) o 1 hechizo"],
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
    ata: ["2 tentáculo (cerca): +5 (1d8 + maldición)"],
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
    ata: ["espada larga (cerca): +3 (1d8)"],
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
    ata: ["porra (cerca): +1 (1d4)", "arco corto (lejos): +0 (1d4)"],
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
    ata: ["mordisco (cerca): +2 (1d6)"],
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
    ata: ["2 garras (cerca): +4 (1d8)"],
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

function fNumber(x) {
  if (x >= 0) return "+" + x;
  else return x;
}

function generateId(x) {
  return x.replace(" ", "_");
}

function prepareNameFilter(filter) {
  const nameFilter = $("<div>");
  nameFilter.append($("<h3>").append("Por nombre"));

  bestiaryData.forEach((x) => {
    const checkbox = $("<input>")
      .attr({
        type: "checkbox",
        name: x.nombre,
        id: generateId(x.nombre),
      })
      .prop("checked", true)
      .change(function () {
        const element = $(this);
        const name = element.attr("name");
        if (element.is(":checked")) {
          selectedNames.push(name);
        } else {
          selectedNames = selectedNames.filter((y) => y !== name);
        }
        applyFilter();
      });
    const label = $("<label>")
      .attr({ for: x.nombre })
      .append(x.nombre.toUpperCase());
    nameFilter.append(checkbox);
    nameFilter.append(label);
    selectedNames.push(x.nombre);
  });
  filter.append(nameFilter);
}

function applyFilter() {
  $("[id^=m_]").each((i, e) => {
    const element = $(`#${e.id}`);
    const id = element.attr("data_name");
    const monster = bestiaryData.find((x) => x.nombre === id);
    if (
      selectedNames.includes(monster.nombre) &&
      selectedLevels.includes(monster.niv) &&
      (searchTerm === "" || monster.nombre.toLowerCase().includes(searchTerm))
    ) {
      element.show();
    } else {
      element.hide();
    }
  });
}

function prepareFreeNameFilter(filter) {
  const filterDiv = $("<div>");
  filterDiv.append($("<h3>").append("Por búsqueda de nombre"));
  const input = $("<input>")
    .attr({
      type: "text",
      id: "search_by_name",
    })
    .on("input", function () {
      const element = $(this);
      searchTerm = element.val().toLowerCase();
      applyFilter();
    });

  filterDiv.append(input);

  filter.append(filterDiv);
}

function prepareLevelFilter(filter) {
  const filterDiv = $("<div>");
  filterDiv.append($("<h3>").append("Por nivel"));
  for (let i = 1; i <= 20; i++) {
    const checkbox = $("<input>")
      .attr({
        type: "checkbox",
        name: i,
        id: i,
      })
      .prop("checked", true)
      .change(function () {
        const element = $(this);
        const number = Number(element.attr("id"));
        if (element.is(":checked")) {
          selectedLevels.push(number);
        } else {
          selectedLevels = selectedLevels.filter((y) => y !== number);
        }
        applyFilter();
      });
    const label = $("<label>").attr({ for: i }).append(i);
    filterDiv.append(checkbox);
    filterDiv.append(label);
    selectedLevels.push(i);
  }
  filter.append(filterDiv);
}

let selectedLevels = [];
let selectedNames = [];
let searchTerm = "";

function onReady() {
  const placeholder = $("#placeholder");

  const filter = $("<div>");
  filter.addClass("hide_print");
  filter.append($("<h2>").append("Filtro"));
  prepareNameFilter(filter);
  prepareLevelFilter(filter);
  prepareFreeNameFilter(filter);
  placeholder.append(filter);

  bestiaryData.forEach((element) => {
    const comentario_ca = element.comentario_ca
      ? " (" + element.comentario_ca + ")"
      : "";
    const monster = $("<div>")
      .attr({
        id: "m_" + generateId(element.nombre),
        data_name: element.nombre,
      })
      .append($("<h1>").append(element.nombre.toUpperCase()))
      .append($("<p>").append($("<i>").append(element.descripcion)))
      .append(
        $("<p>").append(
          `<b>CA</b> ${element.ca}${comentario_ca}, <b>PG</b> ${element.pg}, <b>Mov</b> ${element.mov}`
        )
      );
    element.ata.forEach((x) => {
      monster.append($("<p>").append(`<b>Ata</b> ${x}`));
    });
    monster.append(
      $("<p>").append(
        `<b>Fue</b> ${fNumber(element.fue)}, <b>Des</b> ${fNumber(
          element.des
        )}, <b>Con</b> ${fNumber(element.con)}, <b>Int</b> ${fNumber(
          element.int
        )}, <b>Sab</b> ${fNumber(element.sab)}, <b>Car</b> ${fNumber(
          element.car
        )}`
      )
    );
    monster.append(
      $("<p>").append(
        `<b>Al</b> ${element.alineamiento}, <b>Niv</b> ${element.niv}`
      )
    );
    element.entradas.forEach((x) => {
      monster.append($("<p>").append(`<b>${x.nombre}</b>: ${x.descripcion}`));
    });
    placeholder.append(monster);
  });
}
