/*
1. Number of matches played per year of all the years in IPL.
2. Number of matches won of all teams over all the years of IPL.
3. For the year 2016 get the extra runs conceded per team.
4. For the year 2015 get the top economical bowlers.
5. Create your own scenario.    
*/


const fs = require("fs");
const { type } = require("os");
 
// (B) READ CSV INTO STRING
var matches_Data = fs.readFileSync("./matches.csv", "utf8");
 
// (C) STRING TO ARRAY
matches_Data = matches_Data.split("\r\n"); // SPLIT ROWS
for (let i in matches_Data) { // SPLIT COLUMNS
  matches_Data[i] = matches_Data[i].split(",");
}

var deliveries_Data = fs.readFileSync("./deliveries.csv", "utf8");
 
// (C) STRING TO ARRAY
deliveries_Data = deliveries_Data.split("\r\n"); // SPLIT ROWS
for (let i in deliveries_Data) { // SPLIT COLUMNS
  deliveries_Data[i] = deliveries_Data[i].split(",");
}

// Question 1
function Question_1 (){
  var count = {};
for (var i = 0; i<matches_Data.length;i++){
  
  let a = matches_Data[i][1];
  // console.log(a);
    if(a in count){
        count[a] += 1;
    }else{
      count[a] = 1;
    }
};
delete count['season'];
delete count['undefined'];
console.log(count);
};

// Question 1 ends


// Question 2 start
function Question_2(){
  var count1 = {};
for (var i = 1; i<matches_Data.length;i++){
  let a = matches_Data[i][10];
  if(a === 'winner' || a === ''){
    continue;
  }
    if(a in count1){
        count1[a] += 1;
    }else{
      count1[a] = 1;
    }
};
delete count1['undefined'];
console.log(count1);
};

// Question 2 ends

// Question 3 Starts
function Question_3(){
  var counting_id = [];
  var year = '2016';
  for(let i = 0; i < matches_Data.length;i++){
    let b = matches_Data[i][1];
    if(b === year){
      counting_id.push(matches_Data[i][0]);
    }
  };
  var extra_runs = {};
  for(let i = 0 ; i < deliveries_Data.length; i++){
    for(let j = 0 ; j < counting_id.length ; j++){
    if(deliveries_Data[i][0] === counting_id[j]){
      if(extra_runs.hasOwnProperty(deliveries_Data[i][2])){
        extra_runs[deliveries_Data[i][2]] += Number(deliveries_Data[i][16]);
      }else{
        extra_runs[deliveries_Data[i][2]] = Number(deliveries_Data[i][16]);
      }
    }
  }
  };
  console.log(extra_runs); 
};

// Question 3 ends

// 4. For the year 2015 get the top economical bowlers.
function Question_4(){
  var bowlers = [];
year = '2015';
for(let i = 0; i < matches_Data.length;i++){
  let b = matches_Data[i][1];
  if(b === year){
    bowlers.push(matches_Data[i][0]);
  }
};
var economical_bowlers = {};
var ball_bowled = {};
var economy = {};
for(let i = 1 ; i < deliveries_Data.length; i++){
  for(let j = 0 ; j < bowlers.length ; j++){
    if(deliveries_Data[i][0] === bowlers[j]){
      if(economical_bowlers.hasOwnProperty(deliveries_Data[i][8])){
        economical_bowlers[deliveries_Data[i][8]] += Number(deliveries_Data[i][17]);
        ball_bowled[deliveries_Data[i][8]] = deliveries_Data[i][5] === "1" ? ball_bowled[deliveries_Data[i][8]] + 1 : ball_bowled[deliveries_Data[i][8]];
      }else{
        economical_bowlers[deliveries_Data[i][8]] = Number(deliveries_Data[i][17]);
        ball_bowled[deliveries_Data[i][8]] = Number(deliveries_Data[i][4]);
      }
    }
  }
};
for(let key in economical_bowlers){
  // console.log(`${key} : ${economical_bowlers[key]}`);
  economy[`${key}`] = (`${economical_bowlers[key]}`/ `${ball_bowled[key]}`).toFixed(2);
}
const sorted = Object.keys(economy)
  .sort((key1, key2) => economy[key1] - economy[key2])
  .reduce((obj, key) => ({
    ...obj,
    [key]: economy[key]
  }), {})
console.log("Top economical blowers are in the Year 2015:");
for(var i = 0; i < 10; i++){
  console.log(Object.keys(sorted)[i] + "-->" + Object.values(sorted)[i]);
};
console.log("\n");
};

// Question 4 ends
function Question_5(){
  var wickets = [];
year = '2015';
for(let i = 0; i < matches_Data.length;i++){
  let b = matches_Data[i][1];
  if(b === year){
    wickets.push(matches_Data[i][0]);
  }
};

var top_Wickets = {};
for(let i = 1 ; i < deliveries_Data.length; i++){
  if(deliveries_Data[i][0] in wickets){
    if(deliveries_Data[i][8] in top_Wickets){
      top_Wickets[deliveries_Data[i][8]] += deliveries_Data[i][18] !== "" ? 1 : 0 ;
    }else{
      top_Wickets[deliveries_Data[i][8]] = deliveries_Data[i][18] !== "" ? 1 : 0 ;
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

Question_1();
Question_2();
Question_3();
Question_4();
Question_5();





/*
let str = String(deliveries_Data[i][0]);
      if(economical_bowlers.hasOwnProperty()){
        // economical_bowlers[deliveries_Data[i][8]] = [Number(deliveries_Data[i+1][17])+1,1+1];
        console.log(economical_bowlers[deliveries_Data[i][8]]);
      }else{
        economical_bowlers[deliveries_Data[i][8]] = [Number(deliveries_Data[i][17]),0];
      }
    }
  }
  // if(deliveries_Data[i][0] in bowlers){
  //   if(deliveries_Data[i][8] in economical_bowlers){
  //     economical_bowlers[deliveries_Data[i][8]] = [Number(economical_bowlers[deliveries_Data[i][8]][0]) + Number(deliveries_Data[i][17]) ,
  //      economical_bowlers[deliveries_Data[i][8]] === economical_bowlers[deliveries_Data[i+1][8]] ? economical_bowlers[deliveries_Data[i][8]] :
  //      economical_bowlers[deliveries_Data[i][8]][1] + 1 ];
  //   }else{
  //     economical_bowlers[deliveries_Data[i][8]] = [Number(deliveries_Data[i][17]),0];
*/