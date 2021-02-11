import React, {useState} from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import build_rows from "./RowFactory";
import Owner from "./Owner";
import {owner_type} from "./OwnerType";
import {makeStyles} from "@material-ui/core/styles";


const player = {
    "black": 1,
    "white": 2
}


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    },
    player: {
        padding: "40px"
    },
    current: {
        border: "solid"
    }
}));

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState(player.black)
    const [rows, setRows] = useState(build_rows(3))
    const styles = useStyles()
    let stylingBlack = styles.player
    let stylingWhite = styles.player

    if (currentPlayer === player.black) {
        stylingBlack += " " + styles.current
    } else {
        stylingWhite += " " + styles.current
    }



    return (<div>
        Hello, friend. Have a great game. And please, have fun playing it.
        <br/>
        <Button onClick={() => moveMade(currentPlayer, setCurrentPlayer)} variant="contained" color="primary">PASS</Button>
        <br/>
        Create a new Game in size: <TextField
        onChange={(event) => newGame(event, setRows, setCurrentPlayer)}>Hello.</TextField>
        <div className={styles.container}>
            <div className={stylingBlack}>Black</div>
            <Board rows={rows}
                   clicked={(id) => clicked(id, rows, setRows, currentPlayer, () => moveMade(currentPlayer, setCurrentPlayer))}/>
            <div className={stylingWhite}>White</div>
        </div>
    </div>)
}

function moveMade(currentPlayer, setCurrentPlayer) {
    if (currentPlayer === player.black)
        setCurrentPlayer(player.white)
    else
        setCurrentPlayer(player.black)
}

function newGame(event, setRows, setCurrentPlayer) {
    if (event.target.value >= 2) {
        setCurrentPlayer(player.black)
        setRows(build_rows(parseInt(event.target.value)))
    }
}

function clicked(id, rows, setRows, currentPlayer, nextPlayer) {
    setRows(replaceIdWithCurrentPlayer(id, rows, currentPlayer, nextPlayer))
}

function replaceIdWithCurrentPlayer(id, rows, currentPlayer, nextPlayer) {
    return rows.map(row => row.map(cell => replaceIfClicked(cell, id, currentPlayer, nextPlayer)))
}

function replaceIfClicked(cell, id, currentPlayer, nextPlayer) {
    if (cell.id === id && cell.owner === owner_type.empty)
        if (currentPlayer === player.black) {
            nextPlayer()
            return new Owner(cell.id, cell.cellType, owner_type.black)
        } else {
            nextPlayer()
            return new Owner(cell.id, cell.cellType, owner_type.white)
        }
    return cell
}