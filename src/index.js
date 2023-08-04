import Game from "./components/Game.js";

const args = process.argv.slice(2);
const main = new Game(args);
main.start();
