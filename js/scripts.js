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
    const trapRooms = elementIsChecked("room_types_trap");
    const monsterRooms = elementIsChecked("room_types_monter");
    const emptyRooms = elementIsChecked("room_types_empty");
    const minLevel = Number(getSelectedOption("min_level"));
    const maxLevel = Number(getSelectedOption("max_level"));
    const minRooms = Number(getSelectedOption("min_rooms"));
    const maxRooms = Number(getSelectedOption("max_rooms"));
    addGeneratedText(`Trap rooms: ${trapRooms}`);
    addGeneratedText(`Monster rooms: ${monsterRooms}`);
    addGeneratedText(`Empty rooms: ${emptyRooms}`);
    addGeneratedText(`Min level: ${minLevel}`);
    addGeneratedText(`Max level: ${maxLevel}`);
    addGeneratedText(`Min rooms: ${minRooms}`);
    addGeneratedText(`Max rooms: ${maxRooms}`);
    const rooms = getRandomInteger(minRooms, maxRooms);
    addGeneratedText(`Rooms: ${rooms}`);
    let roomOptions = [];
    if (trapRooms) {
        roomOptions.push(RoomOption.TrapRoom);
    }
    if (monsterRooms) {
        roomOptions.push(RoomOption.MonsterRoom);
    }
    if (emptyRooms) {
        roomOptions.push(RoomOption.EmptyRoom);
    }
    for (let index = 1; index <= rooms; index++) {
        let room = roomOptions[getRandomInteger(0, roomOptions.length - 1)];
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
//# sourceMappingURL=scripts.js.map