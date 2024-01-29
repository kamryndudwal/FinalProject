// accessing the JSON file for node.js
//const jsonData = require('./test1.json');
// accessing the JSON file using web browser
let jsonData;

let count = 0;
/*
    // ACCESSING ALL ELEMENTS OF 'TAGS IN JSON
    jsonData.elements.forEach(element => {
    console.log(element.id, ':', element.tags);
    });
    //LENGTH OF JSON ELEMENTS
    //console.log(jsonData.elements.length);
*/

/*
    // CHECK IF 'AMENITY' KEY EXISTS IN ANY OF THE ELEMENTS
    const hasSpecificTag = jsonData.elements.some(element => {
        if(element.tags.operator != undefined){
            console.log(element.id, ':', element.tags.operator);
            count++;
        }
    });
    console.log(count); // checking correct number of tags are outputting
*/

//CHECKING IF THE SPECIFIC WORD IS IN THE TAGS
// const desiredValue = "gate"; // Replace this with the value you want to check

// // Check if elements property exists
// if (jsonData.hasOwnProperty("elements") && Array.isArray(jsonData.elements)) {
//     const elements = jsonData.elements;

//     // Iterate over elements
//     for (const element of elements) {
//         // Check if tags property exists in each element
//         if (element.hasOwnProperty("tags")) {
//             const tags = element.tags;
//             // Iterate over tags
//             for (const key in tags) {
//                 if (tags.hasOwnProperty(key) && tags[key] === desiredValue) {
//                     console.log("Match found!");
//                     count++;

//                 }
//             }
//         }
//     }
// }
// console.log(count);

//TESTING EVERYTHING COMBINED
//SEARCHED FOR ELEMENT IN SPECIFIC LOCATION
//ITERATES THROUGH KEYWORDS AD ASSIGNS VALANCE & AROUSAL
//CALCULATE WHICH QUADRANT THE USER IS IN TO PLAY THE CORRESPONDING MUSIC
//USES MULTIPLE TAGS
var totalVal = 0.0;
var totalAro = 0.0;
var numOfValues = 0;
var finalVal = 0;
var finalAro = 0;
// var lat = 0;
// var lon = 0;
var stopRepeat = 0;
var array = [
    { key: 'tree', val: 6.32, aro: 3.42 },
    { key: 'bench', val: 4.61, aro: 3.59 }
];

function pleaseWork(jsonData) {

    while (count < jsonData.elements.length) {
        jsonData.elements.forEach(element => {
            // console.log(lat + " " + lon);
            if (element.lat.toFixed(4) === lat && element.lon.toFixed(5) === lon) {

                for (let i = 0; i < array.length; i++) {

                    const desiredValue = array[i].key;
                    console.log(i);
                    if (jsonData.hasOwnProperty("elements") && Array.isArray(jsonData.elements)) {
                        const elements = jsonData.elements;

                        for (const element of elements) {

                            if (element.hasOwnProperty("tags")) {

                                const tags = element.tags;
                                for (const key in tags) {

                                    if (tags.hasOwnProperty(key) && tags[key] === desiredValue) {
                                        console.log(key);
                                        //console.log(elements.id);
                                        totalVal += array[i].val;
                                        totalAro += array[i].aro;
                                        stopRepeat++;
                                        numOfValues++;
                                        break;
                                    }
                                }
                                if (stopRepeat > 0) {
                                    stopRepeat = 0;
                                    break;
                                }
                            }

                        }
                        break;
                    }
                }
                //console.log(element.id, ':', element.tags);
            }
            count++;
        });

    }

    findAverage(numOfValues);
    checkQuad();
}

// function checkKeywords() {
//     for (var i = 0; i < array.length; i++) {
//         const desiredValue = array[i].key;
//         if (jsonData.hasOwnProperty("elements") && Array.isArray(jsonData.elements)) {
//             const elements = jsonData.elements;
//             for (const element of elements) {
//                 if (element.hasOwnProperty("tags")) {
//                     const tags = element.tags;
//                     for (const key in tags) {
//                         if (tags.hasOwnProperty(key) && tags[key] === desiredValue) {
//                             totalVal += array[i].val;
//                             totalAro += array[i].aro;
//                             numOfValues++;
//                             continue;
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

function findAverage(amount) {
    console.log(numOfValues);
    finalVal = (totalVal / amount).toFixed(3);
    finalAro = (totalAro / amount).toFixed(3);
    console.log("Valance " + finalVal);
    console.log("Arousal " + finalAro);
}

function checkQuad() {
    if (finalVal > 4.5 && finalAro > 4.5) {
        //(+,+) Q1
        console.log("Q1");
    } else if (finalVal > 4.5 && finalAro < 4.5) {
        //(+,-) Q2
        console.log("Q2");
    } else if (finalVal < 4.5 && finalAro > 4.5) {
        //(-,+) Q4 
        console.log("Q4");
    } else {
        //(+,+) Q3
        console.log("Q3");
    }

}
