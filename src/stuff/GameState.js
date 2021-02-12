import Owner from "./Owner";

export default class GameState {
    constructor(parent, rows) {
        this.children = []
        this.parent = parent
        this.rows = [...rows]
    }

    getRows() {
        return this.rows
    }

    addMove(a, b, owner) {
        let childRows
        if (this.passed(a, b))
            childRows = [...this.rows]
        if (this.valid(a, b)) {
            const prev = this.rows[a][b]
            childRows = [...this.rows]
            childRows[a][b] = new Owner(prev.id, prev.cellType, owner)
        }
        if (childRows) {
            const newState = new GameState(this, childRows)
            this.children.push(newState)
        }
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
}