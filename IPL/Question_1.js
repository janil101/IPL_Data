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
}

function Question_1() {
    var count = {};
    for (var i = 0; i < matches_Data.length; i++) {

        let a = matches_Data[i][1];
        // console.log(a);
        if (a in count) {
            count[a] += 1;
        } else {
            count[a] = 1;
        }
    };
    delete count['season'];
    delete count['undefined'];
    console.log(count);
};

Question_1();