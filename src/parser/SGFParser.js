import GameState from "../stuff/GameState";
import build_rows from "../stuff/RowFactory";
import Player from "../stuff/Player";

export default class SGFParser {
    parse(toParse) {
        const cutted = toParse.substring(2, toParse.length - 1)
        const splitted = cutted.split("]")
        const tree = {moves: []}
        for (let i = 0; i < splitted.length; i++) {
            const [key, value] = splitted[i].split("[")
            if (key) {
                if (key === "B" || key === ";B")
                    tree["moves"].push({B: value})
                else if (key === "W" || key === ";W")
                    tree["moves"].push({W: value})
                else
                    tree[key] = value
            }
        }
        if (tree["FF"] !== "4")
            return new Error("Wrong format")
        if (tree["GM"] !== "1")
            return new Error("Wrong game")

        const boardSize = tree["SZ"]

        const black = new Player(tree["PB"], tree["BR"])
        const white = new Player(tree["PW"], tree["WR"])

        const komi = tree["KM"]

        let game = new GameState().newGame(build_rows(boardSize), komi, black, white)
        for (let i = 0; i < tree.moves.length; i++) {
            const move = tree.moves[i]
            if (move.B)
                game = this.black(move, game)
            else if (move.W)
                game = this.white(move, game)
            else
                game = game.pass()
        }

        return game
    }

    black(move, game) {
        const x = this.alphaVal(move.B[0])
        const y = this.alphaVal(move.B[1])
        return game.addMove(x, y)
    }

    white(move, game) {
        const x = this.alphaVal(move.W[0])
        const y = this.alphaVal(move.W[1])
        return game.addMove(x, y)
    }

    alphaVal(s) {
        return s.toLowerCase().charCodeAt(0) - 97
    }
}