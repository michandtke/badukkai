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
        Create a new Game in size:
        <TextField onChange={(event) => newGame(event, setGameState)}/>
        <div className={styles.container}>
            <div className={stylingBlack}>
                Black ({gameState.capturesBlack})
            </div>
            <Board rows={gameState.getRows()}
                   clicked={(x, y) => clicked(x, y, gameState, setGameState)}/>
            <div className={stylingWhite}>
                White ({gameState.capturesWhite})
            </div>
            <GameTree gameState={gameState} setGameState={setGameState}/>
        </div>
    </div>)
}

function newGame(event, setGameState) {
    if (event.target.value >= 2) {
        setGameState(new GameState().newGame(build_rows(parseInt(event.target.value))))
    }
}

function clicked(x, y, gameState, setGameState) {
    setGameState(gameState.addMove(x, y))
}
