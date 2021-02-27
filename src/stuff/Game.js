import React, {useEffect, useState} from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import build_rows from "./RowFactory";
import {owner_type} from "./OwnerType";
import {makeStyles} from "@material-ui/core/styles";
import GameTree from "./GameTree";
import GameState from "./GameState";
import ListKifus from "../kifus/ListKifus";
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size/throttled'

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex"
    },
    player: {
        width: "30vw",
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
    const [gameState, setGameState] = useState(new GameState().newGame(build_rows(9)))
    const [showKifus, setShowKifus] = useState(false)
    const downPress = useKeyPress("ArrowDown");
    const rightPress = useKeyPress("ArrowRight");
    const leftPress = useKeyPress("ArrowLeft");
    const upPress = useKeyPress("ArrowUp");
    const onlyWidth = useWindowWidth()
    const onlyHeight = useWindowHeight()
    console.log(onlyWidth)
    const fifth = onlyWidth / 5
    console.log(fifth)

    useEffect(() => {
        if ((downPress || rightPress) && gameState.getChildren() && gameState.getChildren()[0]) {
            setGameState(gameState.getChildren()[0])
        }
        if ((leftPress || upPress) && gameState.parent) {
            setGameState(gameState.parent)
        }
    }, [downPress, leftPress, rightPress, upPress]);

    const styles = useStyles()


    return (<div>
        {(showKifus) ? <ListKifus setShowKifus={setShowKifus} setGameState={setGameState}/> : undefined}
        {(!showKifus) ? playStuff(styles, setGameState, gameState, setShowKifus, fifth, onlyHeight) : undefined}
    </div>)
}

function playStuff(styles, setGameState, gameState, setShowKifus, fifth, onlyHeight) {
    const boardWidth = (onlyHeight >= fifth * 3) ? fifth * 3 : onlyHeight
    return (<div className={styles.container}>
        <div style={{width: fifth}}>{menu(styles, setGameState, gameState, setShowKifus)}</div>
        <div style={{width: boardWidth}}>{board(styles, gameState, setGameState, boardWidth)}</div>
        <div style={{width: fifth}}>{tree(gameState, setGameState)}</div>
    </div>)
}

function menu(styles, setGameState, gameState, setShowKifus) {
    let stylingBlack = styles.player
    let stylingWhite = styles.player

    if (gameState.player === owner_type.black) {
        stylingBlack += " " + styles.current
        stylingWhite += " " + styles.inactive
    } else {
        stylingWhite += " " + styles.current
        stylingBlack += " " + styles.inactive
    }

    return (<div className={styles.header}>
        <div className={styles.container}>
            <div className={stylingBlack}>
                {gameState.black.name} ({gameState.black.rank})
                <br/>({gameState.capturesBlack})
            </div>
            <div className={styles.spacer}/>
            <div className={stylingWhite}>
                {gameState.white.name} ({gameState.white.rank})
                <br/>({gameState.capturesWhite})
            </div>
        </div>
        Hello there. Have a great game. And please, have fun playing it.
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
        <Button variant="contained" color="primary" onClick={() => setShowKifus(true)}>Load Kifu</Button>
    </div>)
}

function board(styles, gameState, setGameState, boardSize) {
    return (<div className={styles.board}>
        <Board rows={gameState.getRows()}
               clicked={(x, y) => clicked(x, y, gameState, setGameState)}
               lastMove={gameState.lastMove}
               dimensions={boardSize} />
    </div>)
}

function tree(gameState, setGameState) {
    return (<GameTree gameState={gameState} setGameState={setGameState}/>)
}

function newGame(size, setGameState) {
    setGameState(new GameState().newGame(build_rows(size)))
}

function clicked(x, y, gameState, setGameState) {
    setGameState(gameState.addMove(x, y))
}

const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({key}) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({key}) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};