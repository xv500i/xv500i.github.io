const rulesSection = "reglas";
const armiesSection = "ejercitos";
const homeSection = "inicio";
const comunitySection = "comunidad";
const listasAOFSection = "listasaof";

const armyListContainerId = "#armyListContainer";

const specialRulesData = [
  {
    key: "Héroe",
    description:
      "<p>Los héroes con hasta Resistente(6) pueden desplegarse como parte de una unidad de más de 1 miniatura que no tenga otro héroe.</p>" +
      "<p>El héroe puede realizar chequeos de moral para la unidad, pero debe usar la Defensa de la unidad hasta que todas las demás miniaturas hayan muerto.</p>",
  },
  {
    key: "Resistente",
    description:
      "<p>Esta miniatura debe recibir X heridas antes de morir.</p>" +
      "<p>Si una miniatura con resistente se une a una unidad sin ello, se le asignan heridas en último lugar.</p>" +
      "<p>Debes asignar las heridas a la miniatura resistente con más heridas en la unidad hasta que muera antes de comenzar a infligirlas a la siguiente miniatura resistente (a los héroes se les deben asignar las heridas al final).</p>",
  },
];

function prepare() {
  $(document).ready(() => {
    _hideAllSections();

    [rulesSection, armiesSection, homeSection, comunitySection, listasAOFSection].forEach((x) => {
      $(`#${x}`).click(() => {
        _hideAllSections();
        _showSection(x);
      });
    });

    _showSection(homeSection);

    $(".dropdown-menu a").click(function () {
      $("#aofArmyButton").text($(this).text());
      _showAOFList($("#aofArmyButton").text());
    });
  });
}

function _hideAllSections() {
  $("[id^=section-]").hide();
}

function _showSection(section) {
  $(`#section-${section}`).show();
}

function _showAOFList(armyName) {
  $(armyListContainerId).empty();
  if (armyName === "Imperio Humano") {
    var units = [
      {
        name: "Maestro de Batalla",
        baseCost: 40,
        miniatures: 1,
        quality: 4,
        defense: 4,
        specialRules: [
          { key: "Héroe" },
          {
            key: "Resistente",
            title: "Resistente(3)",
          },
        ],
      },
    ];

    units.forEach((x) => {
      var cardContent = $("<div/>")
        .attr("class", "card-body")
        .append($("<h5/>").attr("class", "card-title").text(`${x.name} [${x.miniatures}]`));

      if (x.baseCost) {
        cardContent.append($("<p/>").attr("class", "card-text").text(`${x.baseCost} ptos`));
      }

      if (x.baseCost) {
        cardContent.append($("<p/>").attr("class", "card-text").text(`Calidad ${x.quality}+ Defensa ${x.defense}+`));
      }

      if (x.specialRules) {
        var rules = $("<p/>").attr("class", "card-text");

        var rulesContent = x.specialRules.map((ruleContent) => {
          const ruleDescription = $("<span/>").text(ruleContent.key);
          const ruleData = specialRulesData.find((specialRuleData) => specialRuleData.key === ruleContent.key);
          if (ruleData) {
            ruleDescription
              .attr("data-bs-toggle", "tooltip")
              .attr("data-bs-placement", "top")
              .attr("data-bs-html", "true")
              .attr("data-bs-title", ruleData.description)
              .addClass("specialRule");
          }

          return ruleDescription;
        });
        rulesContent.filter((x) => x.attr("data-bs-toggle") === "tooltip").forEach((x) => new bootstrap.Tooltip(x));
        rules.append(rulesContent);
        cardContent.append(rules);
      }

      var card = $("<div/>").attr("class", "card").append(cardContent);
      $(armyListContainerId).append(card);
    });
  } else {
    var missingMessage = $("<p/>").attr("class", "text-center").text("Ejército no disponible");
    $(armyListContainerId).append(missingMessage);
  }
}
