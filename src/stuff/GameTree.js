import React from "react";

export default function gameTree({gameState}) {
    let layer = 0
    const ancestor = gameState.getAncestor()
    return (<div>{child_rec(ancestor, layer)}</div>)
}

function child_rec(ch, layer) {
    layer = layer + 1
    return (
        <div key={layer}>
            {ch.getLastMove()}
            {ch.getChildren().map(child => child_rec(child, layer))}
        </div>
    )
}