import capturer from "./Capturer";
import PlayBuilder from "./PlayBuilder";

test('no stone on first line should change nothing', () => {
    // given
    const id = 0
    const rows = smallBoard().black(id).state()

    // when + then
    expect(capturer(0, 0, rows, () => {
    })).toStrictEqual(rows)
})

test('stone on last line should change nothing', () => {
    // given
    const rows = smallBoard().black(0, 2).state()

    // when + then
    expect(capturer(0, 2, rows, () => {
    })).toStrictEqual(rows)
})

test('should be able to capture top left corner', () => {
    // given
    const rows = smallBoard().black(1, 0).white(0, 0).black(0, 1).state()
    const rowsWithoutWhite = smallBoard().black(1, 0).black(0, 1).state()

    // when
    const result = capturer(0, 1, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture top right corner', () => {
    // given
    const rows = smallBoard().black(2, 1).white(2, 0).black(1, 0).state()
    const rowsWithoutWhite = smallBoard().black(2, 1).black(1, 0).state()

    // when
    const result = capturer(1, 0, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture bottom left corner', () => {
    // given
    const rows = smallBoard().black(1, 2).white(0, 2).black(0, 1).state()
    const rowsWithoutWhite = smallBoard().black(1, 2).black(0, 1).state()

    // when
    const result = capturer(0, 1, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture bottom right corner', () => {
    // given
    const rows = smallBoard().black(2, 1).white(2, 2).black(1, 2).state()
    const rowsWithoutWhite = smallBoard().black(2, 1).black(1, 2).state()

    // when
    const result = capturer(1, 2, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should be able to capture in the middle', () => {
    // given
    const rows = smallBoard().black(1, 0).black(1, 2).black(0, 1).white(1, 1).black(2, 1).state()
    const rowsWithoutWhite = smallBoard().black(1, 0).black(1, 2).black(0, 1).black(2, 1).state()

    // when
    const result = capturer(2, 1, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should not capture if top is empty', () => {
    // given
    const rows = smallBoard().black(1, 2).black(0, 1).white(1, 1).black(2, 1).state()

    // when
    const result = capturer(2, 1, rows, () => {
    })

    // then
    expect(result).toStrictEqual(rows)
})

test('should call capture count function with 0 when captured nothing', () => {
    // given
    const rows = smallBoard().black(1, 2).black(0,1).white(1, 1).black(2, 1).state()
    let captureCount = 0
    let captureCalled = false

    // when
    capturer(2, 1, rows, (captured) => {
        captureCount = captured
        captureCalled = true
    })

    // then
    expect(captureCount).toBe(0)
    expect(captureCalled).toBe(true)
})

test('should call capture count function when captured something', () => {
    // given
    const rows = smallBoard().black(1, 0).white(0, 0).black(0, 1).state()
    let captureCount = 0
    let captureCalled = false

    // when
    capturer(0, 1, rows, (captured) => {
        captureCount = captured
        captureCalled = true
    })

    // then
    expect(captureCount).toBe(1)
    expect(captureCalled).toBe(true)
})

test('should be able to capture two stones in the top left corner', () => {
    // given
    const rows = smallBoard().white(0, 0).white(1, 0).black(2, 0).black(0, 1).black(1, 1).state()
    const rowsWithoutWhite = smallBoard().black(2, 0).black(0, 1).black(1, 1).state()

    // when
    const result = capturer(1, 1, rows, () => {})

    // then
    expect(result).toStrictEqual(rowsWithoutWhite)
})

test('should count all the captures', () => {
    // given
    const rows = smallBoard().white(0, 0).white(1, 0).black(2, 0).black(0, 1).black(1, 1).state()
    let captureCount = 0
    let captureCalled = false

    // when
    capturer(1, 1, rows, (captured) => {
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
