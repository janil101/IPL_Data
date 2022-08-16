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

function Question_3() {
    var counting_id = [];
    var year = '2016';
    for (let i = 0; i < matches_Data.length; i++) {
        let b = matches_Data[i][1];
        if (b === year) {
            counting_id.push(matches_Data[i][0]);
        }
    };
    var extra_runs = {};
    for (let i = 0; i < deliveries_Data.length; i++) {
        for (let j = 0; j < counting_id.length; j++) {
            if (deliveries_Data[i][0] === counting_id[j]) {
                if (extra_runs.hasOwnProperty(deliveries_Data[i][2])) {
                    extra_runs[deliveries_Data[i][2]] += Number(deliveries_Data[i][16]);
                } else {
                    extra_runs[deliveries_Data[i][2]] = Number(deliveries_Data[i][16]);
                }
            }
        }
    };
    console.log(extra_runs);
};

Question_3();