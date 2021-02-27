import React from "react";
import {Button} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Game1 from '../resources/games/Game1.sgf'
import Game2 from '../resources/games/Game2.sgf'
import Game3 from '../resources/games/Game3.sgf'
import Game4 from '../resources/games/Game4.sgf'
import Game5 from '../resources/games/Game5.sgf'
import SGFParser from "../parser/SGFParser";

export default function ListKifus({setShowKifus, setGameState}) {
    return (<div>
        Please load a game.
        <br/>
        <Input type="file" name="file" color="secondary"
               onChange={(event) => newGameByFileUploadHandler(event, setGameState)}/>
        <br/>
        <Button variant="contained" color="primary" onClick={() => showFiles(setShowKifus, setGameState, Game1)}>Load
            Game1</Button>
        <br/>
        <Button variant="contained" color="primary" onClick={() => showFiles(setShowKifus, setGameState, Game2)}>Load
            Game2</Button>
        <br/>
        <Button variant="contained" color="primary" onClick={() => showFiles(setShowKifus, setGameState, Game3)}>Load
            Game3</Button>
        <br/>
        <Button variant="contained" color="primary" onClick={() => showFiles(setShowKifus, setGameState, Game4)}>Load
            Game4</Button>
        <br/>
        <Button variant="contained" color="primary" onClick={() => showFiles(setShowKifus, setGameState, Game5)}>Load
            Game5</Button>
        <br/>
        <Button variant="contained" color="primary" onClick={() => setShowKifus(false)}>Close</Button>
    </div>)
}

function showFiles(setShowKifus, setGameState, file) {
    fetch(file)
        .then(r => r.text())
        .then(text => {
            const game = new SGFParser().parse(text)
            setGameState(game)
        }).catch((e) => {
            console.log(e);
        });
}

function newGameByFileUploadHandler(event, setGameState, setText) {
    event.preventDefault()

    const file = event.target.files[0]
    fromFile(file, setGameState, setText)
}

function fromFile(file, setGameState) {
    console.log(file)
    const reader = new FileReader()
    if (file) {
        reader.onload = async (e) => {
            const text = (e.target.result)
            const game = new SGFParser().parse(text)
            setGameState(game)
        };

        reader.readAsText(file)
    }
}