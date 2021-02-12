import build_rows from "./RowFactory";
import {owner_type} from "./OwnerType";
import Owner from "./Owner";

export default class PlayBuilder {
    constructor(boardType) {
        this.rows = build_rows(boardType)
    }

    white(x, y) {
        this.rows = this.play(x, y, this.rows, owner_type.white)
        return this
    }

    black(x, y) {
        this.rows = this.play(x, y, this.rows, owner_type.black)
        return this
    }

    play(x, y, rows, color) {
        return rows.map(row => row.map(cell => {
            if ((cell.x === x) && cell.y === y)
                return cell.changeTo(color)
            return cell
        }))
    }

    state() {
        return this.rows
    }
}