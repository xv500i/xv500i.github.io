var totalSpan = $("#total");

var glassKey = "glass";
var waterKey = "water";
var sodaKey = "soda-beer0";
var beerKey = "beer-wine";
var combinedKey = "combined";
var combinedRedBullKey = "combined-redbull";
var liquorKey = "liquor-ice";
var snackKey = "snack";
var sandwichKey = "sandwich";
var sandwichPizzaKey = "sandwich-pizza-hot";

var total = 0;
var items = GetDefaultItems();

var uiFontSize = 30;
try {
  var savedUiFontSize = localStorage.getItem("font-size");
  if (savedUiFontSize) {
    uiFontSize = parseInt(savedUiFontSize);
  }
} catch {}

$("#ui-font-slider").val(uiFontSize);

updateFontSize();

function setFont(value) {
  uiFontSize = value;
  localStorage.setItem("font-size", value);
  updateFontSize();
}

function updateFontSize() {
  $("button").css("font-size", uiFontSize + "px");
  $("span").css("font-size", uiFontSize + "px");
}

function addItem(name) {
  items[name]++;
  switch (name) {
    case glassKey:
      total += 1;
      break;
    case waterKey:
      total += 1;
      break;
    case sodaKey:
      total += 2;
      break;
    case beerKey:
      total += 3;
      break;
    case combinedKey:
      total += 6;
      break;
    case combinedRedBullKey:
      total += 8;
      break;
    case liquorKey:
      total += 5;
      break;
    case snackKey:
      total += 3;
      break;
    case sandwichKey:
      total += 4;
      break;
    case sandwichPizzaKey:
      total += 5;
      break;
  }
  updateUI();
}

function reset() {
  total = 0;
  items = GetDefaultItems();
  updateUI();
}

function updateUI() {
  totalSpan.text(total + "€");

  for (var k in items) {
    updateKeyText(k);
  }
}

function updateKeyText(keyId) {
  $("#keys-" + keyId)
    .children(".amount")
    .text(items[keyId]);
}

function GetDefaultItems() {
  return {
    [sodaKey]: 0,
    [glassKey]: 0,
    [waterKey]: 0,
    [beerKey]: 0,
    [combinedKey]: 0,
    [combinedRedBullKey]: 0,
    [liquorKey]: 0,
    [snackKey]: 0,
    [sandwichKey]: 0,
    [sandwichPizzaKey]: 0,
  };
}
