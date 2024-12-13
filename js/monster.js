function _fNumber(x) {
  if (x >= 0) return "+" + x;
  else return x;
}

function _generateId(x) {
  return x.replace(" ", "_");
}

function prepareMonsters(placeholder, monsters) {
  monsters.forEach((element) => {
    const monster = _buildMonsterUI(element);
    placeholder.append(monster);
  });
}

function _buildMonsterUI(monsterData) {
  const comentario_ca = monsterData.comentario_ca
    ? " (" + monsterData.comentario_ca + ")"
    : "";
  const monsterDiv = $("<div>")
    .attr({
      id: "m_" + _generateId(monsterData.nombre),
      data_name: monsterData.nombre,
    })
    .addClass("monster-block")
    .append(_buildHorizontalLineScroll())
    .append($("<h1>").append(monsterData.nombre.toUpperCase()))
    .append($("<p>").append($("<i>").append(monsterData.descripcion)))
    .append(_buildHr())
    .append(
      $("<p>", { class: "colored-text" }).append(
        `<b>CA</b> ${monsterData.ca}${comentario_ca}, <b>PG</b> ${monsterData.pg}, <b>Mov</b> ${monsterData.mov}`
      )
    );
  monsterDiv.append(_buildMonsterStatBlock(monsterData));
  monsterDiv.append(
    $("<p>", { class: "colored-text" }).append(
      `<b>Al</b> ${monsterData.alineamiento}, <b>Niv</b> ${monsterData.niv}`
    )
  );

  _appendEntries(monsterData, monsterDiv);
  _appendActions(monsterData, monsterDiv);

  monsterDiv.append(_buildHorizontalLineScroll());
  return monsterDiv;
}

function _appendActions(monsterData, parent) {
  if (monsterData.ata.length > 0) {
    parent.append(_buildH3("Acciones"));
    parent.append(_buildHr());
  }

  monsterData.ata.forEach((x) => {
    parent.append(
      $("<p>").append(`<b><i>${x.name}</i></b>. ${x.description ?? ""}`)
    );
  });
}

function _appendEntries(monsterData, parent) {
  if (monsterData.entradas.length > 0) {
    parent.append(_buildH3("Características"));
    parent.append(_buildHr());
  }
  monsterData.entradas.forEach((x) => {
    parent.append(
      $("<p>").append(`<b><i>${x.nombre}</i></b>. ${x.descripcion}`)
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
