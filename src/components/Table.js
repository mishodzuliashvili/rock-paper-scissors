import { table } from "table";
import Rules from "./Rules.js";

export default class Table {
  static gnerateDataForTable(args) {
    return [
      ["v PC\\User", ...args],
      ...args.map((computerMove) => [
        computerMove,
        ...args.map((playerMove) =>
          Rules.isDraw(playerMove, computerMove)
            ? "Draw"
            : !Rules.isPlayerWinner(playerMove, computerMove, args)
            ? "Win"
            : "Lose"
        ),
      ]),
    ];
  }
  static printTable(args) {
    console.log(
      "----------------------------------------------------------------"
    );
    const data = Table.gnerateDataForTable(args);
    const resultTable = table(data);
    console.log(resultTable);
  }
}
