import capturer from "./Capturer";
import build_rows from "./RowFactory";
import Owner from "./Owner";
import {owner_type} from "./OwnerType";

test('no stone on first line should change nothing', () => {
    // given
    const id = 0
    const rows = black(id, build_rows(3))

    // when + then
    expect(capturer(id, rows)).toStrictEqual(rows)
})

test('no stone on last line should change nothing', () => {
    // given
    const id = 3 * 3 - 1
    const rows = black(id, build_rows(3))

    // when + then
    expect(capturer(id, rows)).toStrictEqual(rows)
})

test('should be able to capture top left corner', () => {
    // given
    const id = 3
    const rows = black(id, white(0, black(1, build_rows(3))))
    const rowsWithoutWhite = black(id, black(1, build_rows(3)))

    // when
    const result = capturer(id, rows)

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture top right corner', () => {
    // given
    const id = 1
    const rows = black(id, white(2, black(5, build_rows(3))))
    const rowsWithoutWhite = black(id, black(5, build_rows(3)))

    // when
    const result = capturer(id, rows)

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture bottom left corner', () => {
    // given
    const id = 3
    const rows = black(id, white(6, black(7, build_rows(3))))
    const rowsWithoutWhite = black(id, black(7, build_rows(3)))

    // when
    const result = capturer(id, rows)

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture bottom right corner', () => {
    // given
    const id = 7
    const rows = black(id, white(8, black(5, build_rows(3))))
    const rowsWithoutWhite = black(id, black(5, build_rows(3)))

    // when
    const result = capturer(id, rows)

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture in the middle', () => {
    // given
    const id = 5
    const rows = black(id, white(4, black(3, black(7, black(1, build_rows(3))))))
    const rowsWithoutWhite = black(id, black(3, black(7, black(1, build_rows(3)))))

    // when
    const result = capturer(id, rows)

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should not capture if top is empty', () => {
    // given
    const id = 5
    const rows = black(id, white(4, black(3, black(7, build_rows(3)))))

    // when
    const result = capturer(id, rows)

    // then
    expect(result).toStrictEqual(rows)
})

function black(id, rows) {
    return play(id, rows, owner_type.black)
}

function white(id, rows) {
    return play(id, rows, owner_type.white)
}

function play(id, rows, color) {
    return rows.map(row => row.map(cell => {
        if (cell.id === id)
            return new Owner(cell.id, cell.cellType, color)
        return cell
    }))
}
