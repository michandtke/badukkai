import React, {useState} from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import build_rows from "./RowFactory";
import Owner from "./Owner";
import {owner_type} from "./OwnerType";
import {makeStyles} from "@material-ui/core/styles";
import capturer from "./Capturer";
import GameTree from "./GameTree";
import GameState from "./GameState";


const player = {
    "black": 1,
    "white": 2
}


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    },
    player: {
        padding: "40px",
        border: "solid"
    },
    current: {},
    inactive: {
        borderColor: "#282c34"
    }

}));

export default function Game() {
    const [currentPlayer, setCurrentPlayer] = useState(player.black)
    const [captureCountBlack, setCaptureCountBlack] = useState(0)
    const [captureCountWhite, setCaptureCountWhite] = useState(0)
    const [gameState, setGameState] = useState(new GameState(undefined, build_rows(3)))

    const styles = useStyles()
    let stylingBlack = styles.player
    let stylingWhite = styles.player
    let increaseCaptureCount
    if (currentPlayer === player.black) {
        stylingBlack += " " + styles.current
        stylingWhite += " " + styles.inactive
        increaseCaptureCount = (captures) => setCaptureCountBlack(captureCountBlack + captures)
    } else {
        stylingWhite += " " + styles.current
        stylingBlack += " " + styles.inactive
        increaseCaptureCount = (captures) => setCaptureCountWhite(captureCountWhite + captures)
    }


    return (<div>
        Hello, my friend. Have a great game. And please, have fun playing it.
        <br/>
        <Button onClick={() => moveMade(currentPlayer, setCurrentPlayer)} variant="contained"
                color="primary">PASS</Button>
        <br/>
        Create a new Game in size: <TextField
        onChange={(event) => newGame(event, setGameState, setCurrentPlayer, setCaptureCountBlack, setCaptureCountWhite)}>Hello.</TextField>
        <div className={styles.container}>
            <div className={stylingBlack}>
                Black ({captureCountBlack})
            </div>
            <Board rows={gameState.getRows()}
                   clicked={(id) => clicked(id, gameState, setGameState, currentPlayer, () => moveMade(currentPlayer, setCurrentPlayer), increaseCaptureCount)}/>
            <div className={stylingWhite}>
                White ({captureCountWhite})
            </div>
            <GameTree gameState={gameState} />
        </div>
    </div>)
}

function moveMade(currentPlayer, setCurrentPlayer) {
    if (currentPlayer === player.black)
        setCurrentPlayer(player.white)
    else
        setCurrentPlayer(player.black)
}

function newGame(event, setGameState, setCurrentPlayer, setCaptureCountBlack, setCaptureCountWhite) {
    if (event.target.value >= 2) {
        setCurrentPlayer(player.black)
        setGameState(new GameState(undefined, build_rows(parseInt(event.target.value))))
        setCaptureCountBlack(0)
        setCaptureCountWhite(0)
    }
}

function clicked(id, gameState, setGameState, currentPlayer, nextPlayer, increaseCaptureCount) {
    let madeLegitMove = false
    const rows = gameState.getRows()
    let newRows = replaceIdWithCurrentPlayer(id, rows, currentPlayer, nextPlayer, () => madeLegitMove = true)
    if (madeLegitMove)
        newRows = capturer(id, newRows, (captures) => increaseCaptureCount(captures))
    setGameState(gameState.addChildState(newRows, "id: " + id))
}

function replaceIdWithCurrentPlayer(id, rows, currentPlayer, nextPlayer, madeLegitMove) {
    return rows.map(row => row.map(cell => replaceIfClicked(cell, id, currentPlayer, nextPlayer, madeLegitMove)))
}

function replaceIfClicked(cell, id, currentPlayer, nextPlayer, madeLegitMove) {
    if (cell.id === id && cell.owner === owner_type.empty) {
        nextPlayer()
        madeLegitMove()
        if (currentPlayer === player.black) {
            return new Owner(cell.id, cell.cellType, owner_type.black)
        } else {
            return new Owner(cell.id, cell.cellType, owner_type.white)
        }
    }
    return cell
}
