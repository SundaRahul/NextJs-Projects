const boxen = require("boxen").default;

const message = "Welcome to the Package Manager CLI!";
const title = "Package Manager CLI";

const log=console.log;

function makeBox(text, opts) {
    return boxen(text, opts);
}

const classicBox = makeBox(message, {
    title,
    titleAlignment: "center",
    padding: 1,
    margin: 1,
    borderStyle: "classic",
    borderColor: "green"
});

const singleDoubleBox = makeBox(message, {
    title,
    titleAlignment: "center",
    padding: 0,
    margin: 1,
    borderStyle: "singleDouble"
});

const roundBox = makeBox(message, {
    title,
    titleAlignment: "center",
    padding: 0,
    margin: 1,
    borderStyle: "round"
});

const coloredBox = makeBox(message, {
    title,
    titleAlignment: "center",
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "black"
});

const rahulBox =makeBox("Rahul Here, Need some coffee",{
    title:"Sunda's Terminal",
    titleAlignment:"center",
    padding:1,
    margin:1,
    borderStyle:"double",
    borderColor:"yellow",
    backgroundColor:"blue",
    

})

log(rahulBox)

console.log(classicBox);
console.log(singleDoubleBox);
console.log(roundBox);
console.log(coloredBox);