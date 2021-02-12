import React from "react";
import Button from "@material-ui/core/Button";

export default function gameTree({gameState, setGameState}) {
    let layer = 0
    const ancestor = gameState.getAncestor()
    return (<div>{child_rec(ancestor, layer, setGameState)}</div>)
}

function child_rec(ch, layer, setGameState) {
    layer = layer + 1
    return (
        <div key={layer}>
            <Button onClick={() => click(ch, setGameState)}>{ch.getLastMove()}</Button>
            {ch.getChildren().map(child => child_rec(child, layer, setGameState))}
        </div>
    )
}

function click(child, setGameState) {
    setGameState(child)
}