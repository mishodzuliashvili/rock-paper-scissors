import _ from "lodash";
import HMAC from "./HMAC.js";
import Rules from "./Rules.js";
import Table from "./Table.js";
import * as readline from "readline";

export default class Game {
  constructor(args) {
    this.args = args;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  validateArgs() {
    if (!Rules.hasMinimumArgsLength(this.args)) {
      console.log("Please enter at least 3 arguments");
      return false;
    }
    if (!Rules.isArgsLengthOdd(this.args)) {
      console.log("Please enter an odd number of arguments");
      return false;
    }
    if (!Rules.areArgsAllUnique(this.args)) {
      console.log("Please enter unique arguments");
      return false;
    }
    return true;
  }

  getUserInput() {
    return new Promise((resolve) => {
      this.rl.question("Enter your move: ", (input) => {
        resolve(input);
      });
    });
  }

  getResult(playerMove, computerMove) {
    if (Rules.isDraw(playerMove, computerMove)) {
      return "Draw!";
    } else if (Rules.isPlayerWinner(playerMove, computerMove, this.args)) {
      return "You win!";
    } else {
      return "You lose!";
    }
  }

  generateComputerMove() {
    return _.sample(this.args);
  }

  handleMove(playerMove, computerMove) {
    console.log(`Your move: ${playerMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(this.getResult(playerMove, computerMove));
  }

  isInputValid(input) {
    return (
      input === "?" ||
      input === "0" ||
      (parseInt(input) >= 1 && parseInt(input) <= this.args.length)
    );
  }

  endGame() {
    this.rl.close();
    process.exit(0);
  }

  async startInputLoop() {
    while (true) {
      let userInput = await this.getUserInput();
      if (userInput === "0") {
        this.endGame();
      } else if (userInput === "?") {
        Table.printTable(this.args);
      } else if (this.isInputValid(userInput)) {
        return userInput;
      } else {
        console.log("Invalid input");
      }
    }
  }

  async playRound() {
    console.log(
      "----------------------------------------------------------------"
    );
    let computerMove = this.generateComputerMove();
    let key = HMAC.generateKey();
    let hmac = HMAC.generateHMAC(computerMove, key);
    console.log(`HMAC: ${hmac}`);
    console.log("Available moves:");
    this.args.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");
    let userInput = await this.startInputLoop();
    const playerMove = this.args[parseInt(userInput) - 1];
    this.handleMove(playerMove, computerMove);
    console.log(`HMAC key: ${key}`);
  }

  async start() {
    if (!this.validateArgs()) {
      this.endGame();
    }
    while (true) {
      await this.playRound();
    }
  }
}
