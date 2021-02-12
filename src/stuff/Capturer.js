import {owner_type} from "./OwnerType";

export default function capturer(x, y, rows, captured) {
    const toCheck = potentiallyCapturedStones(x, y, rows)

    const toRemove = [...new Set(toCheck.flatMap((cell) => check(cell, rows))
        .filter(x => x !== undefined)
        .map(ce => id(ce)))]

    const result = rows.map(row => row.map(cell => {
        if (toRemove.includes(id(cell)))
            return cell.changeTo(owner_type.empty)
        return cell
    }))
    captured(toRemove.length)
    return result
}

function id(cell) {
    return cell.x + " " + cell.y
}

function potentiallyCapturedStones(x, y, rows) {
    const owner = cellAt(x, y, rows).owner
    const canCapture = owner === owner_type.white ? owner_type.black : owner_type.white
    const left = differentOwner(leftNeighbour(x, y, rows), canCapture)
    const right = differentOwner(rightNeighbour(x, y, rows), canCapture)
    const top = differentOwner(topNeighbour(x, y, rows), canCapture)
    const bottom = differentOwner(bottomNeighbour(x, y, rows), canCapture)
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

function leftNeighbour(x, y, rows) {
    if (x > 0)
        return cellAt(x - 1, y, rows)
}

function rightNeighbour(x, y, rows) {
    if (x < rows.length)
        return cellAt(x + 1, y, rows)
}

function topNeighbour(x, y, rows) {
    if (y > 0)
        return cellAt(x, y - 1, rows)
}

function bottomNeighbour(x, y, rows) {
    if (y < rows.length)
        return cellAt(x, y + 1, rows)
}

function cellAt(x, y, rows) {
    const row = rows[y]
    return row !== undefined ? row[x] : undefined
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
    const right = rightNeighbour(cell.x, cell.y, rows)
    const bottom = bottomNeighbour(cell.x, cell.y, rows)
    const top = topNeighbour(cell.x, cell.y, rows)
    const left = leftNeighbour(cell.x, cell.y, rows)

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
    const right = rightNeighbour(cell.x, cell.y, rows)
    const bottom = bottomNeighbour(cell.x, cell.y, rows)
    const top = topNeighbour(cell.x, cell.y, rows)
    const left = leftNeighbour(cell.x, cell.y, rows)
    const hello = []
    if (right) hello.push(right)
    if (bottom) hello.push(bottom)
    if (top) hello.push(top)
    if (left) hello.push(left)
    return hello
}