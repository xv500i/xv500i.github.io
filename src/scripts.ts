enum RoomOption {
  TrapRoom = "Trampa",
  MonsterRoom = "Monstruo",
  EmptyRoom = "Vacía",
}

class DungeonInfo {
  rooms: RoomInfo[];
}

class RectangularShape {
  x: number;
  y: number;
  w: number;
  h: number;
}

class RoomInfo extends RectangularShape {
  label: string;
  doors: DoorInfo[];
}

class DoorInfo extends RectangularShape {
  locked: boolean;
  opened: boolean;
}

class Dungeon {
  maxLevel: number;
  minLevel: number;
  maxRooms: number;
  minRooms: number;
  roomTypes: RoomOption[];
  roomWeights: number[];
  rooms: Room[];

  toString(): string {
    let description =
      `Nivel de dificultad mínimo: ${this.minLevel}\n` +
      `Nivel de dificultad máximo: ${this.maxLevel}\n` +
      `Número mínimo de habitaciones: ${this.minRooms}\n` +
      `Número máximo de habitaciones: ${this.maxRooms}\n`;

    this.roomTypes.forEach((element, index) => {
      description += `Habitación ${element} con peso ${this.roomWeights[index]}\n`;
    });

    description += "Habitaciones:\n";
    for (const room of this.rooms) {
      description += `- ${room.toString()}\n`;
    }

    return description;
  }
}

class Room {
  id: number;
  type: RoomOption;
  level?: number;
  doors: Door[];

  toString(): string {
    const levelDescription = this.level ? " dificultad " + this.level : "";
    return `Habitación ${this.id}: ${this.type} ${levelDescription}`;
  }
}

class Door {
  from: number;
  to: number;
}

const tileSize = 10;

function generate(): void {
  clearGenerated();
  const trapRoomsWeight = Number(getSelectedOption("room_types_trap"));
  const monsterRoomsWeight = Number(getSelectedOption("room_types_monster"));
  const emptyRoomsWeight = Number(getSelectedOption("room_types_empty"));
  const minLevel = Number(getSelectedOption("min_level"));
  const maxLevel = Number(getSelectedOption("max_level"));
  const minRooms = Number(getSelectedOption("min_rooms"));
  const maxRooms = Number(getSelectedOption("max_rooms"));

  let dungeon = new Dungeon();
  dungeon.minLevel = minLevel;
  dungeon.maxLevel = maxLevel;
  dungeon.maxRooms = maxRooms;
  dungeon.minRooms = minRooms;
  dungeon.rooms = [];
  dungeon.roomTypes = [];
  dungeon.roomWeights = [];

  const rooms = getRandomInteger(minRooms, maxRooms);

  dungeon.roomTypes = [
    RoomOption.EmptyRoom,
    RoomOption.MonsterRoom,
    RoomOption.TrapRoom,
  ];

  dungeon.roomWeights = [emptyRoomsWeight, monsterRoomsWeight, trapRoomsWeight];

  for (let index = 1; index <= rooms; index++) {
    let room = new Room();
    room.id = index;
    room.type = weightedRandom(dungeon.roomTypes, dungeon.roomWeights);
    switch (room.type) {
      case RoomOption.TrapRoom:
      case RoomOption.MonsterRoom:
        room.level = getRandomInteger(minLevel, maxLevel);
        break;
      case RoomOption.EmptyRoom:
        break;
    }
    dungeon.rooms.push(room);
  }

  addGeneratedText(dungeon.toString());
  drawMap(dungeon);
}

function elementIsChecked(id: string): boolean {
  return (document.getElementById(id) as any).checked;
}

function getSelectedOption(id: string): string {
  return (document.getElementById(id) as any).value;
}

function addGeneratedText(text: string): void {
  const generatedElement = getGeneratedElement();
  const codeElement = document.createElement("code");
  codeElement.innerHTML = text.split("\n").join("<br>");
  generatedElement.appendChild(codeElement);
}

function clearGenerated(): void {
  const generatedElement = getGeneratedElement();
  generatedElement.textContent = "";
}

function getGeneratedElement(): HTMLElement {
  return document.getElementById("generated_content");
}

function getRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSliderText(id: string, value: number) {
  document.getElementById(id).textContent = value.toString();
}

function weightedRandom<T>(items: Array<T>, weights: Array<number>): T {
  if (items.length !== weights.length) {
    throw new Error("Items and weights must be of the same size");
  }
  if (!items.length) {
    throw new Error("Items must not be empty");
  }
  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }
  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();
  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return items[itemIndex];
    }
  }

  return null;
}

function drawMap(dungeon: Dungeon) {
  const generatedElement = getGeneratedElement();
  const canvasElement = document.createElement("canvas");
  canvasElement.setAttribute("width", "500px");
  canvasElement.setAttribute("height", "500px");
  generatedElement.appendChild(canvasElement);
  const ctx = canvasElement.getContext("2d");

  const canvasWidth = 500;
  const canvasHeight = 500;

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvasWidth, canvasHeight);

  for (let index = 0; index < canvasWidth / tileSize; index++) {
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(index * tileSize, 0);
    ctx.lineTo(index * tileSize, canvasHeight);
    ctx.stroke();
  }
  for (let index = 0; index < canvasHeight / tileSize; index++) {
    ctx.strokeStyle = "grey";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, index * tileSize);
    ctx.lineTo(canvasWidth, index * tileSize);
    ctx.stroke();
  }

  let dungeonInfo = generateDungeonInfo(dungeon);

  dungeonInfo.rooms.forEach((element) => {
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.strokeRect(element.x, element.y, element.w, element.h);

    ctx.lineWidth = 1;
    ctx.strokeText(element.label, element.x, element.y);
  });
}

function generateDungeonInfo(dungeon: Dungeon): DungeonInfo {
  let dungeonInfo = new DungeonInfo();
  dungeonInfo.rooms = [];

  let y = 10;
  const roomMargin = 10;
  const roomHorizontalLimit = 5;
  let roomHorizontalIndex = 0;

  for (const element of dungeon.rooms) {
    let roomInfo = new RoomInfo();
    roomInfo.label = element.id.toString();
    roomInfo.x = roomMargin + roomHorizontalIndex * 50 + (roomHorizontalIndex) * roomMargin;
    roomInfo.y = y;

    const roomXTiles = getRandomInteger(2, 5);
    const roomYTiles = getRandomInteger(2, 5);
    roomInfo.w = tileSize * roomXTiles;
    roomInfo.h = tileSize * roomYTiles;

    dungeonInfo.rooms.push(roomInfo);

    roomHorizontalIndex++;
    if (roomHorizontalIndex === roomHorizontalLimit) {
      roomHorizontalIndex = 0;
      y += 50 + roomMargin;
    }
  }

  return dungeonInfo;
}
