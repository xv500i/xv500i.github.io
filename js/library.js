var totalSpan = $("#total");
var waterKey = $("#keys-water");
var waterAmount = 0;
var sodaKey = $("#keys-soda");
var sodaAmount = 0;
var sandWitchKey = $("#keys-sandwitch");
var sandWitchAmount = 0;
var total = 0;

function addItem(name) {
  switch (name) {
    case "water":
      waterAmount++;
      total += 1;
      break;
    case "soda":
      sodaAmount++;
      total += 3;
      break;
    case "sandWitch":
      sandWitchAmount++;
      total += 5;
      break;
  }
  updateUI();
}

function reset() {
  total = 0;
  waterAmount = 0;
  sodaAmount = 0;
  sandWitchAmount = 0;

  updateUI();
}

function updateUI() {
  totalSpan.text(total + "€");

  waterKey.children(".amount").text(waterAmount);
  sodaKey.children(".amount").text(sodaAmount);
  sandWitchKey.children(".amount").text(sandWitchAmount);
}
