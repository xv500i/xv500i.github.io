let selectedLevels = [];
let selectedNames = [];
let searchTerm = "";

function prepareFilter(placeholder, bestiaryData) {
  const accordionFilter = $("<div>")
    .addClass("hide_print")
    .addClass("accordion")
    .attr("id", "accordion-filter");

  _prepareNameFilter(accordionFilter, bestiaryData);
  _prepareLevelFilter(accordionFilter);
  _prepareFreeNameFilter(accordionFilter);

  placeholder.append(accordionFilter);
}

function _prepareLevelFilter(accordion) {
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
        _applyFilter();
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

      _applyFilter();
    });
  const buttonDiv = $("<div>", {}).append(resetButton);
  filterDiv.append(buttonDiv);

  const accordionItem = _buildAccordeonItem(
    accordion.attr("id"),
    "accordion-level-filter",
    "Filtro por nivel",
    filterDiv
  );

  accordion.append(accordionItem);
}

function _prepareFreeNameFilter(accordion) {
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
      _applyFilter();
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
      _applyFilter();
    });
  const buttonDiv = $("<div>", {}).append(resetButton);
  filterDiv.append(buttonDiv);

  const accordionItem = _buildAccordeonItem(
    accordion.attr("id"),
    "accordion-search-filter",
    "Filtro por búsqueda",
    filterDiv
  );

  accordion.append(accordionItem);
}

function _prepareNameFilter(accordion, bestiaryData) {
  const nameFilter = $("<div>");

  bestiaryData.forEach((x) => {
    const checkboxDiv = $("<div>")
      .addClass("form-check")
      .addClass("form-check-inline");

    const checkboxId = _generateId(x.nombre);
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
        _applyFilter();
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
        const id = _generateId(i.nombre);
        $(`#${id}`).prop("checked", true);
        selectedNames.push(i.nombre);
      }

      _applyFilter();
    });
  const buttonDiv = $("<div>", {}).append(resetButton);
  nameFilter.append(buttonDiv);

  const accordionItem = _buildAccordeonItem(
    accordion.attr("id"),
    "accordion-name-filter",
    "Filtro por nombre",
    nameFilter
  );

  accordion.append(accordionItem);
}

function _applyFilter() {
  $("[id^=m_]").each((i, e) => {
    const element = $(`#${e.id}`);
    const id = element.attr("data_name");
    const monster = bestiaryData.find((x) => x.nombre === id);
    if (
      selectedNames.includes(monster.nombre) &&
      selectedLevels.includes(monster.desafio) &&
      (searchTerm === "" || monster.nombre.toLowerCase().includes(searchTerm))
    ) {
      element.show();
    } else {
      element.hide();
    }
  });
}

function _buildAccordeonItem(accordionId, contentId, headerText, content) {
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
