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

function Question_5() {
    var wickets = [];
    year = '2015';
    for (let i = 0; i < matches_Data.length; i++) {
        let b = matches_Data[i][1];
        if (b === year) {
            wickets.push(matches_Data[i][0]);
        }
    };

    var top_Wickets = {};
    for (let i = 1; i < deliveries_Data.length; i++) {
        for (let j = 0; j < wickets.length; j++) {
            if (deliveries_Data[i][0] === wickets[j]) {
                if (top_Wickets.hasOwnProperty(deliveries_Data[i][8])) {
                    top_Wickets[deliveries_Data[i][8]] += deliveries_Data[i][18] !== "" ? 1 : 0;
                } else {
                    top_Wickets[deliveries_Data[i][8]] = deliveries_Data[i][18] !== "" ? 1 : 0;
                }
            }
        }
    };

    keys = Object.keys(top_Wickets)
    let i = keys.length;
    let len = keys.length;
    keys.sort((a, b) => top_Wickets[a] < top_Wickets[b] ? 1 : -1);


    // console.log("Top Wicket takers of 2015:")
    for (i = 0; i < 10; i++) {
        k = keys[i];
        console.log(k + ':' + top_Wickets[k]);
    };
};
Question_5();