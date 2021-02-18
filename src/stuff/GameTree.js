import React from "react";
import {Grid, IconButton} from "@material-ui/core";
import {Adjust} from "@material-ui/icons";

export default function gameTree({gameState, setGameState}) {
    const ancestor = gameState.getAncestor()
    const flattenChildren = flatten_children([ancestor], [])
    return (<div>{drawRow(flattenChildren, setGameState)}</div>)
}

function drawRow(children, setGameState) {
    return (
        <Grid container>
            {children.map(child => {
                return drawChildren(child, setGameState)
            })}
        </Grid>
    )
}

function drawChildren(children, setGameState) {
    return (
        <Grid container>
            {children.map(child => {
                return (<IconButton onClick={() => click(child, setGameState)}><Adjust /></IconButton>)
            })}
        </Grid>
    )
}

function click(child, setGameState) {
    setGameState(child)
}

function flatten_children(parents, resultList) {
    if (parents && parents.length > 0) {
        console.log(parents)
        const children = parents.flatMap(parent => parent.getChildren())
        if (children && children.length > 0)
            resultList.push(children)
        return flatten_children(children, resultList)
    }
    return resultList
}