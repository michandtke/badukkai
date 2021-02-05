import {makeStyles} from '@material-ui/core/styles';
import ImageProvider from "./ImageProvider";
import React from "react";

const useStyles = makeStyles((theme) => ({
    cell: {
        padding: 0
    }
}));

export default function Board(props) {
    const classes = useStyles();

    let rowNumber = 0

    return (
        <table cellSpacing={0}>
            <tbody>
            {props.rows.map((row) => (
                <tr className={classes.cell} key={rowNumber = rowNumber + 1}>
                    {row.map((cell) => (
                        <td className={classes.cell} key={cell.id}>
                            <ImageProvider ownerType={cell.owner} cellType={cell.cellType} key={cell.id}
                                           clicked={() => props.clicked(cell.id)}/>
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
