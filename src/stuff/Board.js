import {makeStyles} from '@material-ui/core/styles';
import middle from '../resources/middle.png'
import top_boarder from '../resources/top_boarder.png'
import bottom_boarder from '../resources/bottom_boarder.png'
import left_boarder from '../resources/left_boarder.png'
import right_boarder from '../resources/right_boarder.png'
import upper_left_corner from '../resources/upper_left_corner.png'
import lower_left_corner from '../resources/lower_left_corner.png'
import upper_right_corner from '../resources/upper_right_corner.png'
import lower_right_corner from '../resources/lower_right_corner.png'

const useStyles = makeStyles((theme) => ({
    cell: {
        padding: 0
    },
    inlineImage: {
        display: "block"
    }
}));
const owner_type = {"empty": 1, "black": 2, "white": 3}

export default function Board() {
    const classes = useStyles();

    const board_type = 9

    const rows = build_rows(board_type)

    return (
        <table cellSpacing={0} >
            {rows.map((row) => (
                <tr className={classes.cell}>
                    {row.map((cell) => (
                        <td className={classes.cell}><img src={cell.image} className={classes.inlineImage}/></td>
                    ))}
                </tr>
            ))}
        </table>
    )
}

function build_rows(board_type) {
    const number_of_places = board_type * board_type
    const rows = []

    rows.push(first_row(board_type))

    let row = []
    for (let i = board_type; i < number_of_places - board_type; i++)
        if (i % board_type === 0)
            row.push(new Owner(i, left_boarder))
        else if (i % board_type === board_type - 1) {
            row.push(new Owner(i, right_boarder))
            rows.push(row)
            row = []
        } else
            row.push(new Owner(i, middle))

    rows.push(last_row(board_type, number_of_places))
    return rows
}

function first_row(board_type) {
    const row = []
    row.push(new Owner(0, upper_left_corner))

    for (let i = 1; i < board_type - 1; i++)
        row.push(new Owner(i, top_boarder))

    row.push(new Owner(board_type - 1, upper_right_corner))
    return row
}

function last_row(board_type, number_of_places) {
    const row = []
    row.push(new Owner(number_of_places - board_type, lower_left_corner))

    for (let i = 1; i < board_type - 1; i++)
        row.push(new Owner(number_of_places - board_type + i, bottom_boarder))

    row.push(new Owner(number_of_places - 1, lower_right_corner))

    return row
}

class Owner {
    constructor(id, image) {
        this.id = id
        this.owner = owner_type.empty
        this.image = image
    }
}