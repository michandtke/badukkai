import build_rows from "./RowFactory";
import {owner_type} from "./OwnerType";
import Owner from "./Owner";

export default class PlayBuilder {
    constructor(boardType) {
        this.rows = build_rows(boardType)
    }

    white(id) {
        this.rows = this.play(id, this.rows, owner_type.white)
        return this
    }

    black(id) {
        this.rows = this.play(id, this.rows, owner_type.black)
        return this
    }

    play(id, rows, color) {
        return rows.map(row => row.map(cell => {
            if (cell.id === id)
                return new Owner(cell.id, cell.cellType, color)
            return cell
        }))
    }

    state() {
        return this.rows
    }
}