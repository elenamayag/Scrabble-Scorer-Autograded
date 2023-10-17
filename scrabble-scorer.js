// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.


const input = require("readline-sync");


const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";
   for (let i = 0; i < word.length; i++) {


      for (const pointValue in oldPointStructure) {
         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }

   }
   return letterPoints;
}


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let question = "";
function initialPrompt() {
   question = input.question("Let's play some scrabble! Enter a word: ");

   return question;
};





/*let newPointStructure = {
   a: 1,
   e: 1,
   i: 1,
   o: 1,
   u: 1,
   l: 1,
   n: 1,
   r: 1,
   s: 1,
   t: 1,
   d: 2,
   g: 2,
   b: 3,
   c: 3,
   m: 3,
   p: 3,
   f: 4,
   h: 4,
   v: 4,
   w: 4,
   y: 4,
   k: 5,
   j: 8,
   x: 8,
   q: 10,
   z: 10
};*/




function simpleScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   score = Number(word.length);

   return score;


};






function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   let vowelScorer = ["A", "E", "I", "O", "U"];


   for (let i = 0; i < word.length; i++)
      if (vowelScorer.includes(word[i])) {
         score += 3;
      } else {
         score++;
      }
   return score;
};






function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
   }
   return score;
};






let scoringAlgorithms = [
   {
      name: "Simple",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },


   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },


   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   },
];






function scorerPrompt() {
   let selectedScorerPrompt = input.question("Which scoring algorithm would you like to use? \n 0 - Simple Scorer: One point per character \n 1 - Vowel Bonus Scorer: Vowels are worth 3 points \n 2 - Scrabble Scorer: Uses scrabble point system \n\nEnter 0, 1, or 2: ");

   if (selectedScorerPrompt === "0") {
      return scoringAlgorithms[0];
   }
   else if (selectedScorerPrompt === "1") {
      return scoringAlgorithms[1];
   }
   else if (selectedScorerPrompt === "2") {
      return scoringAlgorithms[2];
   }
   else {
      return console.log(`SNEAKY SNEAKY, please select a valid number!`);
   }
};



function transform(oldPointStructure) {

   let newPointStructure = {}
   for (let points in oldPointStructure) {
      let score = Number(points);


      for (let letter of oldPointStructure[points]) {
         newPointStructure[letter.toLowerCase()] = score;
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure)


function runProgram() {
   initialPrompt();
   let selectedAlgorithm = scorerPrompt();
   
   if (selectedAlgorithm) {
      const score = selectedAlgorithm.scorerFunction(question)
      console.log (`Selected scorer: ${question} : ${score}`)
   }
};


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};

