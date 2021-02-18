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
    const flattenChildren = flatten_children([ancestor], [])
    return (<div>{drawRow(flattenChildren, setGameState, styles)}</div>)
}

function drawRow(children, setGameState, styles) {
    return (
        <div>
            {children.map(child => {
                return drawChildren(child, setGameState, styles)
            })}
        </div>
    )
}

function drawChildren(children, setGameState, styles) {
    return (
        <div className={styles.container}>
            {children.map(child => {
                return (<div>
                        <Button id={child.id} onClick={() => click(child, setGameState)}><Adjust/></Button>
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