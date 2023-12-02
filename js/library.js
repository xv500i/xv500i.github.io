const rulesSection = "reglas";
const armiesSection = "ejercitos";
const homeSection = "inicio";

function prepare() {
  $(document).ready(() => {
    _hideAllSections();

    [rulesSection, armiesSection, homeSection].forEach((x) => {
      $(`#${x}`).click(() => {
        _hideAllSections();
        _showSection(x);
      });
    });

    _showSection(homeSection);
  });
}

function _hideAllSections() {
  $("[id^=section-]").hide();
}

function _showSection(section) {
  $(`#section-${section}`).show();
}
