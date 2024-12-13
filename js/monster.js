function _fNumber(x) {
  if (x >= 0) return "+" + x;
  else return x;
}

function _generateId(x) {
  return x.replace(" ", "_");
}

function prepareMonsters(placeholder, monsters) {
  monsters.forEach((monsterData) => {
    const monsterUi = _buildMonsterUI(monsterData);
    placeholder.append(monsterUi);
  });
}

function _buildMonsterUI(monsterData) {
  const monsterDiv = $("<div>")
    .attr({
      id: "m_" + _generateId(monsterData.nombre),
      data_name: monsterData.nombre,
    })
    .addClass("monster-block")
    .append(_buildHorizontalLineScroll())
    .append($("<h1>").append(monsterData.nombre.toUpperCase()))
    .append(_buildMonsterDescription(monsterData))
    .append(_buildHr())
    .append(
      $("<p>", { class: "colored-text" }).append(`<b>CA</b> ${monsterData.ca}`)
    )
    .append(
      $("<p>", { class: "colored-text" }).append(`<b>PG</b> ${monsterData.pg}`)
    )
    .append(
      $("<p>", { class: "colored-text" }).append(
        `<b>Velocidad</b> ${monsterData.velocidad}`
      )
    )
    .append(_buildHr())
    .append(_buildMonsterStatBlock(monsterData))
    .append(_buildHr())
    .append(_buildSalvationBlock(monsterData))
    .append(
      $("<p>", { class: "colored-text" }).append(
        `<b>Habilidades</b> ${monsterData.habilidades}`
      )
    )
    .append(
      $("<p>", { class: "colored-text" }).append(
        `<b>Idiomas</b> ${monsterData.idiomas}`
      )
    )
    .append(
      $("<p>", { class: "colored-text" }).append(
        `<b>Desafío</b> ${monsterData.desafio}`
      )
    );

  _appendEntries(monsterData, monsterDiv);
  _appendActions(monsterData, monsterDiv);

  monsterDiv.append(_buildHorizontalLineScroll());
  return monsterDiv;
}

function _buildSalvationBlock(monsterData) {
  return $("<p>", { class: "colored-text" }).append(
    `<b>Salvaciones</b> Con ${_fNumber(
      monsterData.salvacionCon
    )}, Ref ${_fNumber(monsterData.salvacionRef)}, Vol ${_fNumber(
      monsterData.salvacionVol
    )}`
  );
}

function _buildMonsterDescription(monsterData) {
  const descriptionDiv = $("<div>", { class: "clearfix" });

  if (monsterData.imagen) {
    descriptionDiv.append(
      $("<img>", {
        class: "col-md-4 float-md-end mb-3 ms-md-3",
        src: monsterData.imagen,
      })
    );
  }

  const paragraphs = monsterData.descripcion.map((x) =>
    $("<p>", { class: "long-text" }).append($("<i>").append(x))
  );
  descriptionDiv.append(paragraphs);

  return descriptionDiv;
}

function _appendActions(monsterData, parent) {
  if (monsterData.acciones.length > 0) {
    parent.append(_buildH3("Acciones"));
    parent.append(_buildHr());
  }

  monsterData.acciones.forEach((x) => {
    parent.append(
      $("<p>", { class: "long-text" }).append(
        `<b><i>${x.nombre}</i></b>. ${x.descripcion ?? ""}`
      )
    );
  });
}

function _appendEntries(monsterData, parent) {
  if (monsterData.rasgos.length > 0) {
    parent.append(_buildH3("Rasgos"));
    parent.append(_buildHr());
  }
  monsterData.rasgos.forEach((x) => {
    parent.append(
      $("<p>", { class: "long-text" }).append(
        `<b><i>${x.nombre}</i></b>. ${x.descripcion}`
      )
    );
  });
}

function _buildMonsterStatBlock(element) {
  return $("<p>", { class: "colored-text" }).append(
    `<b>Fue</b> ${_fNumber(element.fue)}, <b>Des</b> ${_fNumber(
      element.des
    )}, <b>Con</b> ${_fNumber(element.con)}, <b>Int</b> ${_fNumber(
      element.int
    )}, <b>Sab</b> ${_fNumber(element.sab)}, <b>Car</b> ${_fNumber(
      element.car
    )}`
  );
}

function _buildHorizontalLineScroll() {
  return $("<hr>", { class: "monster-block-bar", size: "10px" });
}

function _buildHr() {
  return $("<hr>", { size: "5px", class: "rule" });
}

function _buildH3(content) {
  return $("<h3>", { class: "actions" }).append(content);
}
