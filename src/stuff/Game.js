import React, { useState } from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import build_rows from "./RowFactory";
import Owner from "./Owner";
import {owner_type} from "./OwnerType";


const player = {
    "black": 1,
    "white": 2
}

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState(player.black)
    const [rows, setRows] = useState(build_rows(3))
    let nextPlayer;
    if (currentPlayer === player.black)
        nextPlayer = player.white
    else
        nextPlayer = player.black

    return (<div>
        Hello, my darling. Have a great game. And please, have fun playing it.
        <br />It is {named(currentPlayer)}'s turn to play.
        <br />
        <Button onClick={() => setCurrentPlayer(nextPlayer)}>Click</Button>
        <br />
        <TextField onChange={(event) => boardSizeChange(event, setRows)}>Hello.</TextField>
        <Board rows={rows} clicked={(id) => clicked(id, rows, setRows, currentPlayer, () => setCurrentPlayer(nextPlayer))}/>
    </div>)
}

function named(currentPlayer) {
    if (currentPlayer === player.black)
        return "Black"
    return "White"
}


function boardSizeChange(event, setRows) {
    if (event.target.value >= 2)
        setRows(build_rows(parseInt(event.target.value)))
}

function clicked(id, rows, setRows, currentPlayer, nextPlayer) {
    setRows(replaceIdWithCurrentPlayer(id, rows, currentPlayer, nextPlayer))
}

function replaceIdWithCurrentPlayer(id, rows, currentPlayer, nextPlayer) {
    return rows.map(row => row.map(cell => replaceIfClicked(cell, id, currentPlayer, nextPlayer)))
}

function replaceIfClicked(cell, id, currentPlayer, nextPlayer) {
    if (cell.id === id)
        if (currentPlayer === player.black) {
            nextPlayer()
            return new Owner(cell.id, cell.cellType, owner_type.black)
        } else {
            nextPlayer()
            return new Owner(cell.id, cell.cellType, owner_type.white)
        }
    return cell
}