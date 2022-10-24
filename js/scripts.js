var RoomOption;
(function (RoomOption) {
    RoomOption["TrapRoom"] = "TrapRoom";
    RoomOption["MonsterRoom"] = "MonsterRoom";
    RoomOption["EmptyRoom"] = "EmptyRoom";
})(RoomOption || (RoomOption = {}));
class Dungeon {
    toString() {
        let description = `Min level: ${this.minLevel}\n` +
            `Max level: ${this.maxLevel}\n` +
            `Min rooms: ${this.minRooms}\n` +
            `Max rooms: ${this.maxRooms}\n`;
        this.roomTypes.forEach((element, index) => {
            description += `${element} rooms weight ${this.roomWeights[index]}\n`;
        });
        description += "Rooms:\n";
        for (const room of this.rooms) {
            description += `- ${room.toString()}\n`;
        }
        return description;
    }
}
class Room {
    toString() {
        const levelDescription = this.level ? " level " + this.level : "";
        return `Room ${this.id}: ${this.type} ${levelDescription}`;
    }
}
class Door {
}
const trapRoomDescription = "Trap";
const monsterRoomDescription = "Monster";
const emptyRoomDescription = "Empty";
function generate() {
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
}
function elementIsChecked(id) {
    return document.getElementById(id).checked;
}
function getSelectedOption(id) {
    return document.getElementById(id).value;
}
function addGeneratedText(text) {
    const generatedElement = getGeneratedElement();
    const codeElement = document.createElement("code");
    codeElement.innerHTML = text.split("\n").join("<br>");
    generatedElement.appendChild(codeElement);
}
function clearGenerated() {
    const generatedElement = getGeneratedElement();
    generatedElement.textContent = "";
}
function getGeneratedElement() {
    return document.getElementById("generated_content");
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function updateSliderText(id, value) {
    document.getElementById(id).textContent = value.toString();
}
function weightedRandom(items, weights) {
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
//# sourceMappingURL=scripts.js.map