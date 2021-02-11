import {owner_type} from "./OwnerType";
import Owner from "./Owner";

export default function capturer(id, rows, captured) {
    const toCheck = potentiallyCapturedStones(id, rows)

    const toRemove = [...new Set(toCheck.flatMap((cell) => check(cell, rows))
        .filter(x => x !== undefined)
        .map(ce => ce.id))]

    const result = rows.map(row => row.map(cell => {
        if (toRemove.includes(cell.id))
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
    const all = island(cell, rows, [cell])

    const neighbour = all.flatMap(ce => neighbours(ce, rows))
    const foreign = neighbour.filter(ce => ce.owner !== cell.owner)
    const owners = foreign.map(ce => ce.owner)
    const free = owners.includes(owner_type.empty)
    const takeThemAll = !free

    return takeThemAll ? all : []
}

function island(cell, rows, known) {
    const right = rightNeighbour(cell.id, rows)
    const bottom = bottomNeighbour(cell.id, rows)
    const top = topNeighbour(cell.id, rows)
    const left = leftNeighbour(cell.id, rows)

    const recent = []
    if (right && right.owner === cell.owner && !known.includes(right))
        recent.push(right)
    if (bottom && bottom.owner === cell.owner && !known.includes(bottom))
        recent.push(bottom)
    if (top && top.owner === cell.owner && !known.includes(top))
        recent.push(top)
    if (left && left.owner === cell.owner && !known.includes(left))
        recent.push(left)
    known.push(...recent)
    recent.map(ce => island(ce, rows, known))
    return known
}

function neighbours(cell, rows) {
    const right = rightNeighbour(cell.id, rows)
    const bottom = bottomNeighbour(cell.id, rows)
    const top = topNeighbour(cell.id, rows)
    const left = leftNeighbour(cell.id, rows)
    const hello = []
    if (right) hello.push(right)
    if (bottom) hello.push(bottom)
    if (top) hello.push(top)
    if (left) hello.push(left)
    return hello
}