import GameState from './GameState'
import {owner_type} from "./OwnerType";
import PlayBuilder from "./PlayBuilder";

test('should give rows back', () => {
    // given
    const rows = smallBoard().state()

    // when
    const state = new GameState(undefined, rows)

    // then
    expect(state.getRows()).toStrictEqual(rows)
})

test('should be able to pass', () => {
    // given
    const rows = smallBoard().state()
    const state = new GameState(undefined, rows)

    // when
    state.addMove()

    // then
    expect(state.getChildren()).toStrictEqual([new GameState(state, rows)])
})

test('should be able to add a move', () => {
    // given
    const rows = smallBoard().state()
    const state = new GameState(undefined, rows)
    const expectedRows = smallBoard().black(0).state()

    // when
    state.addMove(0, 0, owner_type.black)

    // then
    expect(state.getChildren()).toStrictEqual([new GameState(state, expectedRows)])
})

test('should be able to get the parent from the new child', () => {
    // given
    const rows = smallBoard().state()
    const parent = new GameState(undefined, rows)

    // when
    parent.addMove(0, 0, owner_type.black)

    // then
    expect(parent.getChildren()[0].parent).toBe(parent)
})

function smallBoard() {
    return new PlayBuilder(3)
}