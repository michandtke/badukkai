import {makeStyles} from '@material-ui/core/styles';
import ImageProvider from "./ImageProvider";
import React from "react";

const useStyles = makeStyles((theme) => ({
    cell: {
        padding: 0
    }
}));

export default function Board({rows, clicked, lastMove}) {
    const classes = useStyles();

    let rowNumber = 0

    return (
        <table cellSpacing={0}>
            <tbody>
            {rows.map((row) => (
                <tr className={classes.cell} key={rowNumber = rowNumber + 1}>
                    {row.map((cell) => (
                        <td className={classes.cell} key={cell.id}>
                            <ImageProvider ownerType={cell.owner} cellType={cell.cellType} size={rows.length}
                                           key={cell.id} clicked={() => clicked(cell.x, cell.y)}
                                           wasLastMove={cell.x === lastMove.x && cell.y === lastMove.y}/>
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
