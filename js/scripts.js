var RoomOption;
(function (RoomOption) {
    RoomOption[RoomOption["TrapRoom"] = 0] = "TrapRoom";
    RoomOption[RoomOption["MonsterRoom"] = 1] = "MonsterRoom";
    RoomOption[RoomOption["EmptyRoom"] = 2] = "EmptyRoom";
})(RoomOption || (RoomOption = {}));
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
    addGeneratedText(`Trap rooms weigth: ${trapRoomsWeight}`);
    addGeneratedText(`Monster rooms weigth: ${monsterRoomsWeight}`);
    addGeneratedText(`Empty rooms weigth: ${emptyRoomsWeight}`);
    addGeneratedText(`Min level: ${minLevel}`);
    addGeneratedText(`Max level: ${maxLevel}`);
    addGeneratedText(`Min rooms: ${minRooms}`);
    addGeneratedText(`Max rooms: ${maxRooms}`);
    const rooms = getRandomInteger(minRooms, maxRooms);
    addGeneratedText(`Rooms: ${rooms}`);
    let roomOptions = [
        RoomOption.EmptyRoom,
        RoomOption.MonsterRoom,
        RoomOption.TrapRoom,
    ];
    let roomOptionsWeights = [
        emptyRoomsWeight,
        monsterRoomsWeight,
        trapRoomsWeight,
    ];
    for (let index = 1; index <= rooms; index++) {
        let room = weightedRandom(roomOptions, roomOptionsWeights);
        let roomDescription = "";
        switch (room) {
            case RoomOption.TrapRoom:
                roomDescription += trapRoomDescription;
                roomDescription += ` level ${getRandomInteger(minLevel, maxLevel)}`;
                break;
            case RoomOption.MonsterRoom:
                roomDescription += monsterRoomDescription;
                roomDescription += ` level ${getRandomInteger(minLevel, maxLevel)}`;
                break;
            case RoomOption.EmptyRoom:
                roomDescription += emptyRoomDescription;
                break;
        }
        addGeneratedText(`Room ${index}: ${roomDescription}`);
    }
}
function elementIsChecked(id) {
    return document.getElementById(id).checked;
}
function getSelectedOption(id) {
    return document.getElementById(id).value;
}
function addGeneratedText(text) {
    const generatedElement = getGeneratedElement();
    const roomTypesTrap = document.createElement("p");
    roomTypesTrap.textContent = text;
    generatedElement.appendChild(roomTypesTrap);
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