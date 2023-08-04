import _ from "lodash";

export default class Rules {
  static isPlayerWinner(playerMove, computerMove, args) {
    let half = Math.floor(args.length / 2);
    let playerIndex = args.indexOf(playerMove);
    let computerIndex = args.indexOf(computerMove);
    if (
      (playerIndex < computerIndex && playerIndex + half >= computerIndex) ||
      (playerIndex > computerIndex && computerIndex + half < playerIndex)
    ) {
      return true;
    }
    return false;
  }
  static isDraw(playerMove, computerMove) {
    return playerMove === computerMove;
  }
  static areArgsAllUnique(args) {
    return _.uniq(args).length === args.length;
  }
  static hasMinimumArgsLength(args) {
    return args.length >= 3;
  }
  static isArgsLengthOdd(args) {
    return args.length % 2 !== 0;
  }
}
