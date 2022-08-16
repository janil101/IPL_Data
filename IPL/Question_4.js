const fs = require("fs");
const { type } = require("os");

// (B) READ CSV INTO STRING
var matches_Data = fs.readFileSync("./IPL/matches.csv", "utf8");

// (C) STRING TO ARRAY
matches_Data = matches_Data.split("\r\n"); // SPLIT ROWS
for (let i in matches_Data) { // SPLIT COLUMNS
    matches_Data[i] = matches_Data[i].split(",");
}

var deliveries_Data = fs.readFileSync("./IPL/deliveries.csv", "utf8");

// (C) STRING TO ARRAY
deliveries_Data = deliveries_Data.split("\r\n"); // SPLIT ROWS
for (let i in deliveries_Data) { // SPLIT COLUMNS
    deliveries_Data[i] = deliveries_Data[i].split(",");
};

function Question_4() {
    var bowlers = [];
    year = '2015';
    for (let i = 0; i < matches_Data.length; i++) {
        let b = matches_Data[i][1];
        if (b === year) {
            bowlers.push(matches_Data[i][0]);
        }
    };
    var economical_bowlers = {};
    var ball_bowled = {};
    var economy = {};
    for (let i = 1; i < deliveries_Data.length; i++) {
        for (let j = 0; j < bowlers.length; j++) {
            if (deliveries_Data[i][0] === bowlers[j]) {
                if (economical_bowlers.hasOwnProperty(deliveries_Data[i][8])) {
                    economical_bowlers[deliveries_Data[i][8]] += Number(deliveries_Data[i][17]);
                    ball_bowled[deliveries_Data[i][8]] += deliveries_Data[i][8] !== deliveries_Data[i + 1][8] ? 1 : 0;
                } else {
                    economical_bowlers[deliveries_Data[i][8]] = Number(deliveries_Data[i][17]);
                    ball_bowled[deliveries_Data[i][8]] = 0;
                }
            }
        }
    };

    for (let key in economical_bowlers) {
        // console.log(`${key} : ${economical_bowlers[key]}`);
        economy[`${key}`] = (`${economical_bowlers[key]}` / `${ball_bowled[key]}`).toFixed(2);
    }
    const sorted = Object.keys(economy)
        .sort((key1, key2) => economy[key1] - economy[key2])
        .reduce((obj, key) => ({
            ...obj,
            [key]: economy[key]
        }), {})
    console.log("Top economical blowers are in the Year 2015:");
    for (var i = 0; i < 10; i++) {
        console.log(Object.keys(sorted)[i] + "-->" + Object.values(sorted)[i]);
    };
    console.log("\n");
};

Question_4();