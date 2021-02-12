import Owner from "./Owner";
import {cell_type} from "./CellType";

export default function build_rows(board_type) {
    const rows = []

    rows.push(first_row(board_type))

    let row = []
    for (let y = 1; y < board_type - 1; y++) {
        for (let x = 0; x < board_type; x++) {
            if (x === 0)
                row.push(new Owner(cell_type.left_border, x, y))
            else if (x === board_type - 1) {
                row.push(new Owner(cell_type.right_border, x, y))
                rows.push(row)
                row = []
            } else
                row.push(new Owner(cell_type.middle, x, y))
        }
    }

    rows.push(last_row(board_type))

    return rows
}

function first_row(board_type) {
    const row = []
    row.push(new Owner(cell_type.upper_left_corner, 0, 0))

    for (let i = 1; i < board_type - 1; i++)
        row.push(new Owner(cell_type.upper_border, i, 0))

    row.push(new Owner(cell_type.upper_right_corner, board_type - 1, 0))
    return row
}

function last_row(board_type) {
    const row = []
    row.push(new Owner(cell_type.lower_left_corner, 0, board_type - 1))

    for (let i = 1; i < board_type - 1; i++)
        row.push(new Owner(cell_type.lower_border, i, board_type - 1))

    row.push(new Owner(cell_type.lower_right_corner, board_type - 1, board_type - 1))

    return row
}
