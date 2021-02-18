import React, {useState} from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import build_rows from "./RowFactory";
import {owner_type} from "./OwnerType";
import {makeStyles} from "@material-ui/core/styles";
import GameTree from "./GameTree";
import GameState from "./GameState";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    },
    player: {
        padding: "40px",
        border: "solid"
    },
    spacer: {
        width: "available"
    },
    newGamer: {
        margin: "0px 12px"
    },
    current: {},
    inactive: {
        borderColor: "#282c34"
    }

}));

export default function Game() {
    const [gameState, setGameState] = useState(new GameState().newGame(build_rows(3)))

    const styles = useStyles()
    let stylingBlack = styles.player
    let stylingWhite = styles.player

    if (gameState.player === owner_type.black) {
        stylingBlack += " " + styles.current
        stylingWhite += " " + styles.inactive
    } else {
        stylingWhite += " " + styles.current
        stylingBlack += " " + styles.inactive
    }


    return (<div>
        Hello, my friend. Have a great game. And please, have fun playing it.
        <br/>
        <Button onClick={() => setGameState(gameState.pass())} variant="contained"
                color="primary">PASS</Button>
        <br/>
        Create a new Game:
        <Button className={styles.newGamer} variant="contained" color="primary"
                onClick={() => newGame(9, setGameState)}>9x9</Button>
        <Button className={styles.newGamer} variant="contained" color="primary"
                onClick={() => newGame(13, setGameState)}>13x13</Button>
        <Button className={styles.newGamer} variant="contained" color="primary"
                onClick={() => newGame(19, setGameState)}>19x19</Button>
        <div className={styles.container}>
            <div className={stylingBlack}>
                Black ({gameState.capturesBlack})
            </div>
            <div className={styles.spacer}/>
            <div className={stylingWhite}>
                White ({gameState.capturesWhite})
            </div>
        </div>
        <div className={styles.container}>
            <Board rows={gameState.getRows()}
                   clicked={(x, y) => clicked(x, y, gameState, setGameState)}/>
            <GameTree gameState={gameState} setGameState={setGameState}/>
        </div>
    </div>)
}

function newGame(size, setGameState) {
    setGameState(new GameState().newGame(build_rows(size)))
}

function clicked(x, y, gameState, setGameState) {
    setGameState(gameState.addMove(x, y))
}
