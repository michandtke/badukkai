import capturer from "./Capturer";
import build_rows from "./RowFactory";
import Owner from "./Owner";
import {owner_type} from "./OwnerType";
import PlayBuilder from "./PlayBuilder";

test('no stone on first line should change nothing', () => {
    // given
    const id = 0
    const rows = smallBoard().black(id).state()

    // when + then
    expect(capturer(id, rows, () => {
    })).toStrictEqual(rows)
})

test('no stone on last line should change nothing', () => {
    // given
    const id = 3 * 3 - 1
    const rows = smallBoard().black(id).state()

    // when + then
    expect(capturer(id, rows, () => {
    })).toStrictEqual(rows)
})

test('should be able to capture top left corner', () => {
    // given
    const id = 3
    const rows = smallBoard().black(1).white(0).black(id).state()
    const rowsWithoutWhite = smallBoard().black(1).black(id).state()

    // when
    const result = capturer(id, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture top right corner', () => {
    // given
    const id = 1
    const rows = smallBoard().black(5).white(2).black(id).state()
    const rowsWithoutWhite = smallBoard().black(5).black(id).state()

    // when
    const result = capturer(id, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture bottom left corner', () => {
    // given
    const id = 3
    const rows = smallBoard().black(7).white(6).black(id).state()
    const rowsWithoutWhite = smallBoard().black(7).black(id).state()

    // when
    const result = capturer(id, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture bottom right corner', () => {
    // given
    const id = 7
    const rows = smallBoard().black(5).white(8).black(id).state()
    const rowsWithoutWhite = smallBoard().black(5).black(id).state()

    // when
    const result = capturer(id, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture in the middle', () => {
    // given
    const id = 5
    const rows = smallBoard().black(1).black(7).black(3).white(4).black(5).state()
    const rowsWithoutWhite = smallBoard().black(1).black(7).black(3).black(id).state()

    // when
    const result = capturer(id, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should not capture if top is empty', () => {
    // given
    const id = 5
    const rows = smallBoard().black(7).black(3).white(4).black(id).state()

    // when
    const result = capturer(id, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rows)
})

test('should call capture count function with 0 when captured nothing', () => {
    // given
    // given
    const id = 5
    const rows = smallBoard().black(7).black(3).white(4).black(id).state()
    let captureCount = 0
    let captureCalled = false

    // when
    capturer(id, rows, (captured) => {
        captureCount = captured
        captureCalled = true
    })

    // then
    expect(captureCount).toBe(0)
    expect(captureCalled).toBe(true)
})

test('should call capture count function when captured something', () => {
    // given
    const id = 3
    const rows = smallBoard().black(1).white(0).black(id).state()
    let captureCount = 0
    let captureCalled = false

    // when
    capturer(id, rows, (captured) => {
        captureCount = captured
        captureCalled = true
    })

    // then
    expect(captureCount).toBe(1)
    expect(captureCalled).toBe(true)
})

test('should be able to capture two stones in the top left corner', () => {
    // given
    const id = 4
    const rows = smallBoard().white(0).white(1).black(2).black(3).black(id).state()
    const rowsWithoutWhite = smallBoard().black(2).black(3).black(id).state()

    // when
    const result = capturer(id, rows, () => {})

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should count all the captures', () => {
    // given
    const id = 4
    const rows = smallBoard().white(0).white(1).black(2).black(3).black(id).state()
    let captureCount = 0
    let captureCalled = false

    // when
    capturer(id, rows, (captured) => {
        captureCount = captured
        captureCalled = true
    })

    // then
    expect(captureCount).toBe(2)
    expect(captureCalled).toBe(true)
})

function smallBoard() {
    return new PlayBuilder(3)
}
