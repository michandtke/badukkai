import Owner from "./Owner";

export default class GameState {
    constructor(parent, rows, lastMove) {
        if (parent)
            this.ancestor = parent.getAncestor()
        else
            this.ancestor = this
        this.children = []
        this.parent = parent
        this.rows = [...rows]
        if (lastMove)
            this.lastMove = lastMove
        else
            this.lastMove = ""
    }

    getRows() {
        return this.rows
    }

    addMove(a, b, owner) {
        let childRows
        let lastMove
        if (this.passed(a, b)) {
            childRows = [...this.rows]
            lastMove = "Passed"
        }
        if (this.valid(a, b)) {
            const prev = this.rows[a][b]
            childRows = [...this.rows]
            childRows[a][b] = new Owner(prev.id, prev.cellType, owner)
            lastMove = a + " " + b
        }
        if (childRows) {
            this.addChildState(childRows, lastMove)
        }
    }

    addChildState(childRows, lastMove) {
        const newState = new GameState(this, childRows, lastMove)
        this.children.push(newState)
        return newState
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
}