const bestiaryData = [
  {
    nombre: "ACÓLITO",
    descripcion: "Iniciado religioso que conoce rituales y ritos básicos.",
    ca: 12,
    pg: 4,
    mov: "cerca",
    ata: [
      { name: "1 maza (cerca)", description: "+1 (1d6) o 1 hechizo" },
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

let selectedLevels = [];
let selectedNames = [];
let searchTerm = "";

function fNumber(x) {
  if (x >= 0) return "+" + x;
  else return x;
}

function generateId(x) {
  return x.replace(" ", "_");
}

function buildAccordeonItem(accordionId, contentId, headerText, content) {
  const accordionContentId = contentId;
  const idHeader = contentId + "-header";
  const accordionContent = $("<div>", {
    id: accordionContentId,
    class: "accordion-collapse collapse",
    "aria-labelledby": idHeader,
    "data-bs-parent": `#${accordionId}`,
  });
  const accordionItem = $("<div>").addClass("accordion-item");
  accordionItem.append(
    $("<h2>", { id: idHeader, class: "accordion-header" }).append(
      $("<button>", {
        class: "accordion-button collapsed",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": `#${accordionContentId}`,
        "aria-expanded": "false",
        "aria-controls": accordionContentId,
      }).append(headerText)
    )
  );

  accordionItem.append(accordionContent);

  const accordionBody = $("<div>", {
    class: "accordion-body",
  });
  accordionContent.append(accordionBody);

  accordionBody.append(content);
  return accordionItem;
}

function prepareNameFilter(accordion) {
  const nameFilter = $("<div>");

  bestiaryData.forEach((x) => {
    const checkboxDiv = $("<div>")
      .addClass("form-check")
      .addClass("form-check-inline");

    const checkboxId = generateId(x.nombre);
    const customNameMetadata = "data-l-name";
    const checkbox = $("<input>")
      .attr({
        type: "checkbox",
        name: checkboxId,
        id: checkboxId,
        class: "form-check-input",
      })
      .data(customNameMetadata, x.nombre)
      .prop("checked", true)
      .change(function () {
        const element = $(this);
        const name = element.data(customNameMetadata);
        if (element.is(":checked")) {
          selectedNames.push(name);
        } else {
          selectedNames = selectedNames.filter((y) => y !== name);
        }
        applyFilter();
      });
    const label = $("<label>")
      .attr({ for: checkboxId, class: "form-check-label" })
      .append(x.nombre.toUpperCase());
    checkboxDiv.append(checkbox);
    checkboxDiv.append(label);
    nameFilter.append(checkboxDiv);
    selectedNames.push(x.nombre);
  });

  const resetButton = $("<button>")
    .attr({ type: "button", class: "btn btn-danger" })
    .text("Reset")
    .on("click", function () {
      while (selectedNames.length > 0) {
        selectedNames.pop();
      }
      for (let i of bestiaryData) {
        const id = generateId(i.nombre);
        $(`#${id}`).prop("checked", true);
        selectedNames.push(i.nombre);
      }

      applyFilter();
    });
  const buttonDiv = $("<div>", {}).append(resetButton);
  nameFilter.append(buttonDiv);

  const accordionItem = buildAccordeonItem(
    accordion.attr("id"),
    "accordion-name-filter",
    "Filtro por nombre",
    nameFilter
  );

  accordion.append(accordionItem);
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

function prepareFreeNameFilter(accordion) {
  const filterDiv = $("<div>");
  const searchByNameId = "search_by_name";
  const input = $("<input>")
    .attr({
      type: "text",
      id: searchByNameId,
      name: searchByNameId,
      class: "form-control",
    })
    .on("input", function () {
      const element = $(this);
      searchTerm = element.val().toLowerCase();
      applyFilter();
    });
  const label = $("<label>", { for: searchByNameId }).append("Término");
  const terminoDiv = $("<div>", { class: "form-floating mb-3" })
    .append(input)
    .append(label);
  filterDiv.append(terminoDiv);
  const resetButton = $("<button>")
    .attr({ type: "button", class: "btn btn-danger" })
    .text("Reset")
    .on("click", function () {
      $(`#${searchByNameId}`).val("");
      searchTerm = "";
      applyFilter();
    });
  const buttonDiv = $("<div>", {}).append(resetButton);
  filterDiv.append(buttonDiv);

  const accordionItem = buildAccordeonItem(
    accordion.attr("id"),
    "accordion-search-filter",
    "Filtro por búsqueda",
    filterDiv
  );

  accordion.append(accordionItem);
}

function prepareLevelFilter(accordion) {
  const filterDiv = $("<div>");
  const maxLevel = 20;
  for (let i = 1; i <= maxLevel; i++) {
    const checkbox = $("<input>")
      .attr({
        type: "checkbox",
        name: i,
        id: i,
        class: "form-check-input",
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
    const label = $("<label>")
      .attr({ for: i, class: "form-check-label" })
      .append(i);
    const checkboxDiv = $("<div>")
      .addClass("form-check")
      .addClass("form-check-inline");

    checkboxDiv.append(checkbox);
    checkboxDiv.append(label);
    filterDiv.append(checkboxDiv);
    selectedLevels.push(i);
  }
  const resetButton = $("<button>")
    .attr({ type: "button", class: "btn btn-danger" })
    .text("Reset")
    .on("click", function () {
      while (selectedLevels.length > 0) {
        selectedLevels.pop();
      }
      for (let i = 1; i <= maxLevel; i++) {
        $(`#${i}`).prop("checked", true);
        selectedLevels.push(i);
      }

      applyFilter();
    });
  const buttonDiv = $("<div>", {}).append(resetButton);
  filterDiv.append(buttonDiv);

  const accordionItem = buildAccordeonItem(
    accordion.attr("id"),
    "accordion-level-filter",
    "Filtro por nivel",
    filterDiv
  );

  accordion.append(accordionItem);
}

function prepareMonsters(placeholder) {
  bestiaryData.forEach((element) => {
    const monster = buildMonsterUI(element);
    placeholder.append(monster);
  });
}

function buildMonsterUI(element) {
  const comentario_ca = element.comentario_ca
    ? " (" + element.comentario_ca + ")"
    : "";
  const monster = $("<div>")
    .attr({
      id: "m_" + generateId(element.nombre),
      data_name: element.nombre,
    })
    .addClass("monster-block")
    .append(buildHorizontalLineScroll())
    .append($("<h1>").append(element.nombre.toUpperCase()))
    .append($("<p>").append($("<i>").append(element.descripcion)))
    .append(buildHr())
    .append(
      $("<p>", { class: "colored-text" }).append(
        `<b>CA</b> ${element.ca}${comentario_ca}, <b>PG</b> ${element.pg}, <b>Mov</b> ${element.mov}`
      )
    );
  monster.append(
    $("<p>", { class: "colored-text" }).append(
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
    $("<p>", { class: "colored-text" }).append(
      `<b>Al</b> ${element.alineamiento}, <b>Niv</b> ${element.niv}`
    )
  );

  if (element.entradas.length > 0) {
    monster.append(buildH3("Características"));
    monster.append(buildHr());
  }
  element.entradas.forEach((x) => {
    monster.append(
      $("<p>").append(`<b><i>${x.nombre}</i></b>. ${x.descripcion}`)
    );
  });

  if (element.ata.length > 0) {
    monster.append(buildH3("Acciones"));
    monster.append(buildHr());
  }

  element.ata.forEach((x) => {
    monster.append(
      $("<p>").append(`<b><i>${x.name}</i></b>. ${x.description ?? ""}`)
    );
  });

  monster.append(buildHorizontalLineScroll());
  return monster;
}

function buildHorizontalLineScroll() {
  return $("<hr>", { class: "monster-block-bar", size: "10px" });
}

function buildHr() {
  return $("<hr>", { size: "5px", class: "rule" });
}

function buildH3(content) {
  return $("<h3>", { class: "actions" }).append(content);
}

function onReady() {
  const accordionFilterId = "accordion-filter";
  const placeholder = $("#placeholder");

  const accordionFilter = $("<div>")
    .addClass("hide_print")
    .addClass("accordion")
    .attr("id", accordionFilterId);

  prepareNameFilter(accordionFilter);
  prepareLevelFilter(accordionFilter);
  prepareFreeNameFilter(accordionFilter);

  placeholder.append(accordionFilter);

  prepareMonsters(placeholder);
}
