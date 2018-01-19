const math = require("./math.js");
const fs = require("fs");

 const myObj = {
  name: "Will",
  score: 92,
  speak: (name) => {
    //string interpolation for javascript
    return `Hello ${name}`;
  },
  nums: [1,2,3]

}
// console.log(myObj.speak("Mary"));

// console.log(myObj["color"]);
// myObj.color = "Green";

// console.log(myObj["color"]);
//
// console.log(math);
// console.log(math.add(1,2));

/////////////////////////////////////////////

//turn object into string
// const strObj = JSON.stringify(myObj)
//
// //turn string back into object
// const new_obj = JSON.parse(strObj)

const strObj = JSON.stringify(myObj)
fs.writeFileSync("output.json", strObj)
const newObjUnformatted = fs.readFileSync("./output.json")
const formattedObj = JSON.parse(newObjUnformatted)
console.log(formattedObj)
