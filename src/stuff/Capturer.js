import {owner_type} from "./OwnerType";
import Owner from "./Owner";

export default function capturer(id, rows, captured) {
    return removeCapturedStones(id, rows, captured)
}


function removeCapturedStones(id, rows, captured) {
    const toCheck = potentiallyCapturedStones(id, rows)
    const checked = []

    const toRemove = toCheck.map((cell) => check(cell, rows)).filter(x => x !== undefined)

    const result = rows.map(row => row.map(cell => {
        if (toRemove.includes(cell))
            return new Owner(cell.id, cell.cellType, owner_type.empty)
        return cell
    }))
    captured(toRemove.length)
    return result
}

function potentiallyCapturedStones(id, rows) {
    const owner = cellAtId(id, rows).owner
    const canCapture = owner === owner_type.white ? owner_type.black : owner_type.white
    const left = differentOwner(leftNeighbour(id, rows), canCapture)
    const right = differentOwner(rightNeighbour(id, rows), canCapture)
    const top = differentOwner(topNeighbour(id, rows), canCapture)
    const bottom = differentOwner(bottomNeighbour(id, rows), canCapture)
    const result = []
    if (top) result.push(top)
    if (left) result.push(left)
    if (right) result.push(right)
    if (bottom) result.push(bottom)
    return result
}

function differentOwner(cell, owner) {
    if (cell === undefined)
        return undefined
    return cell.owner === owner ? cell : undefined
}

function leftNeighbour(id, rows) {
    const column = Math.floor(id % rows.length)
    const columnNeighbour = Math.floor((id - 1) % rows.length)
    if (columnNeighbour < column)
        return cellAtId(id - 1, rows)
    return undefined
}

function rightNeighbour(id, rows) {
    const column = Math.floor((id) % rows.length)
    const columnNeighbour = Math.floor((id + 1) % rows.length)
    if (columnNeighbour > column)
        return cellAtId(id + 1, rows)
    return undefined
}

function topNeighbour(id, rows) {
    return cellAtId(id - rows.length, rows)
}

function bottomNeighbour(id, rows) {
    return cellAtId(id + rows.length, rows)
}

function cellAtId(id, rows) {
    const size = rows.length
    const rowNumber = Math.floor((id) / size)
    const currentNumber = id % size
    const row = rows[rowNumber]
    return row !== undefined ? row[currentNumber] : undefined
}

function check(cell, rows) {
    const toRemove = ((cell.owner === owner_type.black) ? owner_type.white : owner_type.black);
    const right = rightNeighbour(cell.id, rows)
    const bottom = bottomNeighbour(cell.id, rows)
    const top = topNeighbour(cell.id, rows)
    const left = leftNeighbour(cell.id, rows)
    if (((bottom === undefined) || (bottom.owner === toRemove)) &&
        ((top === undefined) || (top.owner === toRemove)) &&
        ((right === undefined) || (right.owner === toRemove)) &&
        ((left === undefined) || (left.owner === toRemove)))
        return cell
}