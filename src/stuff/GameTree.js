import React from "react";
import {Adjust} from "@material-ui/icons";
import Xarrow from "react-xarrows";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    container: {display: "flex"}
}));

export default function GameTree({gameState, setGameState}) {
    const styles = useStyles()
    const ancestor = gameState.getAncestor()
    const current = gameState.id
    const flattenChildren = flatten_children([ancestor], [])
    return (<div>{drawRow(flattenChildren, current, setGameState, styles)}</div>)
}

function drawRow(children, current, setGameState, styles) {
    return (
        <div>
            {children.map(child => {
                return drawChildren(child, current, setGameState, styles)
            })}
        </div>
    )
}

function drawChildren(children, current, setGameState, styles) {
    return (
        <div className={styles.container}>
            {children.map(child => {
                let color
                if (child.id === current)
                    color = "secondary"
                return (<div>
                        <Button id={child.id} color={color}
                                onClick={() => click(child, setGameState)}><Adjust/></Button>
                        {line(child)}
                    </div>
                )
            })}
        </div>
    )
}

function line(child) {
    return (
        <Xarrow start={child.parentId} end={child.id} path="straight" headSize={0} color="white"
                startAnchor={
                    {
                        position: "middle",
                        offset: {
                            bottomness: 12
                        }
                    }
                }
                endAnchor={{
                    position: "middle",
                    offset: {
                        bottomness: -12
                    }
                }}
        />
    )
}

function click(child, setGameState) {
    setGameState(child)
}

function flatten_children(parents, resultList) {
    if (parents && parents.length > 0) {
        const children = parents.flatMap(parent => parent.getChildren())
        if (children && children.length > 0)
            resultList.push(children)
        return flatten_children(children, resultList)
    }
    return resultList
}