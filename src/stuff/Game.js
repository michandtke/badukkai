import React, {useEffect, useState} from "react";
import Board from "./Board";
import {Button} from "@material-ui/core";
import build_rows from "./RowFactory";
import {owner_type} from "./OwnerType";
import {makeStyles} from "@material-ui/core/styles";
import GameTree from "./GameTree";
import GameState from "./GameState";
import SGFParser from "../parser/SGFParser";
import Input from "@material-ui/core/Input";
import LoadKifu from "./LoadKifu";

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
    },
    board: {
        maxWidth: "80%",
    },
    header: {
        height: "28vh",
        marginTop: "2vh"
    },
    body: {
        height: "70vh"
    }

}));

export default function Game() {
    const [gameState, setGameState] = useState(new GameState().newGame(build_rows(3)))
    const [showKifus, setShowKifus] = useState(false)
    const downPress = useKeyPress("ArrowDown");
    const rightPress = useKeyPress("ArrowRight");
    const leftPress = useKeyPress("ArrowLeft");
    const upPress = useKeyPress("ArrowUp");

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
        {(showKifus) ? <LoadKifu setShowKifus={setShowKifus}/> : undefined}
        {(!showKifus) ? playStuff(styles, setGameState, gameState, setShowKifus) : undefined}
    </div>)
}

function playStuff(styles, setGameState, gameState, setShowKifus) {
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
        <div className={styles.header}>
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
            <Input type="file" name="file" color="secondary"
                   onChange={(event) => newGameByFileUploadHandler(event, setGameState)}/>
            <Button variant="contained" color="primary" onClick={() => setShowKifus(true)}>Load Kifu</Button>
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
        </div>
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.board}>
                    <Board rows={gameState.getRows()}
                           clicked={(x, y) => clicked(x, y, gameState, setGameState)}
                           lastMove={gameState.lastMove}/>
                </div>
                <GameTree gameState={gameState} setGameState={setGameState}/>
            </div>
        </div>
    </div>)
}

function newGame(size, setGameState) {
    setGameState(new GameState().newGame(build_rows(size)))
}

function clicked(x, y, gameState, setGameState) {
    setGameState(gameState.addMove(x, y))
}

function newGameByFileUploadHandler(event, setGameState) {
    event.preventDefault()
    const reader = new FileReader()
    const file = event.target.files[0]
    if (file) {

        reader.onload = async (e) => {
            const text = (e.target.result)
            const game = new SGFParser().parse(text)
            setGameState(game)
        };

        reader.readAsText(event.target.files[0])
    }
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