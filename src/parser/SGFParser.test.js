import SGFParser from "./SGFParser";
import PlayBuilder from "../stuff/PlayBuilder";

test("should parse board size", () => {
    // given
    const expectedBoardSize = 19
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[1]SZ[19])"

    // when
    const parsed = parser.parse(sgf)
    const size = parsed.rows.length

    // then
    expect(size).toStrictEqual(expectedBoardSize)
})

test("should return error on wrong format", () => {
    // given
    const formatError = Error("Wrong format")
    const parser = new SGFParser()
    const sgf = "(;FF[3]GM[1]SZ[19])"

    // when
    const parsed = parser.parse(sgf)

    // then
    expect(parsed).toStrictEqual(formatError)
})

test("should return error on wrong game", () => {
    // given
    const gameError = Error("Wrong game")
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[2]SZ[19])"

    // when
    const parsed = parser.parse(sgf)

    // then
    expect(parsed).toStrictEqual(gameError)
})

test("should parse black player", () => {
    // given
    const blackPlayerName = "Ke Jie"
    const blackPlayerRank = "9p"
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[1]SZ[19]PB[Ke Jie]BR[9p]PW[Shin Minjun]WR[9p])"

    // when
    const parsed = parser.parse(sgf)

    // then
    expect(parsed.black.name).toStrictEqual(blackPlayerName)
    expect(parsed.black.rank).toStrictEqual(blackPlayerRank)
})

test("should parse white player", () => {
    // given
    const whitePlayerName = "Shin Minjun"
    const whitePlayerRank = "9p"
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[1]SZ[19]PB[Ke Jie]BR[9p]PW[Shin Minjun]WR[9p])"

    // when
    const parsed = parser.parse(sgf)

    // then
    expect(parsed.white.name).toStrictEqual(whitePlayerName)
    expect(parsed.white.rank).toStrictEqual(whitePlayerRank)
})

test("should parse komi", () => {
    // given
    const komi = "6.5"
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[1]KM[6.5])"

    // when
    const parsed = parser.parse(sgf)

    // then
    expect(komi).toStrictEqual(parsed.komi)
})

test("should parse first move", () => {
    // given
    const parent = new PlayBuilder(19).rows
    const afterFirstMove = new PlayBuilder(19).black(17, 4).rows
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[1]SZ[19];B[qd])"

    // when
    const parsed = parser.parse(sgf)

    // then
    expect(parent).toStrictEqual(parsed.ancestor.rows)
    expect(afterFirstMove).toStrictEqual(parsed.rows)
})

test("should parse first four moves", () => {
    // given
    const parser = new SGFParser()
    const sgf = "(;FF[4]GM[1]SZ[19];B[qd];W[pp];B[cd];W[cp])"

    // when
    const parsed = parser.parse(sgf)

    // then
    const player = new PlayBuilder(19)
    const oldest = parsed.ancestor
    expect(player.rows).toStrictEqual(oldest.rows)
    const firstBorn = oldest.getChildren()[0]
    const expectedFirstBorn = player.black(17, 4)
    expect(firstBorn.rows).toStrictEqual(expectedFirstBorn.rows)
    const secondBorn = firstBorn.getChildren()[0]
    const expectedSecondBorn = expectedFirstBorn.white(16, 16)
    expect(secondBorn.rows).toStrictEqual(expectedSecondBorn.rows)
    const thirdBorn = secondBorn.getChildren()[0]
    const expectedThirdBorn = expectedSecondBorn.black(3, 4)
    expect(thirdBorn.rows).toStrictEqual(expectedThirdBorn.rows)
    const fourthBorn = thirdBorn.getChildren()[0]
    const expectedFourthBorn = expectedThirdBorn.white(3, 16)
    expect(fourthBorn.rows).toStrictEqual(expectedFourthBorn.rows)
})
