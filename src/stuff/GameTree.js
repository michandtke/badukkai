import React from "react";
import {IconButton} from "@material-ui/core";
import {Adjust} from "@material-ui/icons";

export default function gameTree({gameState, setGameState}) {
    let layer = 0
    const ancestor = gameState.getAncestor()
    return (<div>{child_rec(ancestor, layer, setGameState)}</div>)
}

function child_rec(ch, layer, setGameState) {
    layer = layer + 1
    return (
        <div key={layer}>
            <IconButton onClick={() => click(ch, setGameState)}><Adjust /></IconButton>
            {ch.getChildren().map(child => child_rec(child, layer, setGameState))}
        </div>
    )
}

function click(child, setGameState) {
    setGameState(child)
}