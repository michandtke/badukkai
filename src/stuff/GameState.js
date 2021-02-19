import {owner_type} from "./OwnerType";
import capturer from "./Capturer";
import * as uuid from "uuid";
import Player from "./Player";


export default class GameState {
    newGame(rows, komi = "0", black = new Player("Black"), white = new Player("White")) {
        this.id = uuid.v4()
        this.ancestor = this
        this.player = owner_type.black
        this.capturesBlack = 0
        this.capturesWhite = 0
        this.komi = komi
        this.black = black
        this.white = white
        this.lastMove = "Have fun!"
        this.children = []
        this.parent = undefined
        this.rows = [...rows]
        return this
    }

    getRows() {
        return this.rows
    }

    addMove(x, y) {
        if (this.valid(x, y)) {
            let childRows, captures
            const rowsBeforeCapture = this.rows.map(row => row.map(cell => {
                if (cell.x === x && cell.y === y)
                    return cell.changeTo(this.player)
                return cell
            }));

            [childRows, captures] = capturer(x, y, rowsBeforeCapture)
            const lastMove = x + " " + y
            return this.addChildState(childRows, lastMove, captures)
        }
    }

    pass() {
        return this.addChildState(this.rows.map(row => [...row]), "Passed", 0)
    }

    createChild(rows, lastMove, captures) {
        const child = new GameState()
        child.id = uuid.v4()
        child.rows = rows
        child.ancestor = this.ancestor
        child.parentId = this.id
        child.player = this.calcNextPlayer()
        child.capturesBlack = this.capturesBlack
        child.capturesWhite = this.capturesWhite
        child.lastMove = lastMove
        child.children = []
        child.black = this.black
        child.white = this.white
        child.komi = this.komi
        if (this.player === owner_type.black)
            child.capturesBlack += captures
        else
            child.capturesWhite += captures
        return child
    }

    addChildState(childRows, lastMove, captures) {
        const known = this.children.find(child => child.lastMove === lastMove)
        if (known)
            return known
        const child = this.createChild(childRows, lastMove, captures)
        this.children.push(child)
        return child
    }

    passed(a, b) {
        return !a && !b
    }

    valid(a, b) {
        return (a || a === 0) && (b || b === 0) && a <= this.rows.length && b <= this.rows.length
    }

    getChildren() {
        return this.children
    }

    getLastMove() { return this.lastMove }

    getAncestor() { return this.ancestor }

    calcNextPlayer() {
        if (this.player === owner_type.black)
            return owner_type.white
        return owner_type.black
    }
}