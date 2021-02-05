import Owner from "./Owner";
import {cell_type} from "./CellType";

export default function build_rows(board_type) {
    const number_of_places = board_type * board_type
    const rows = []

    rows.push(first_row(board_type))

    let row = []
    for (let i = board_type; i < number_of_places - board_type; i++)
        if (i % board_type === 0)
            row.push(new Owner(i, cell_type.left_border))
        else if (i % board_type === board_type - 1) {
            row.push(new Owner(i, cell_type.right_border))
            rows.push(row)
            row = []
        } else
            row.push(new Owner(i, cell_type.middle))

    rows.push(last_row(board_type, number_of_places))

    return rows
}

function first_row(board_type) {
    const row = []
    row.push(new Owner(0, cell_type.upper_left_corner))

    for (let i = 1; i < board_type - 1; i++)
        row.push(new Owner(i, cell_type.upper_border))

    row.push(new Owner(board_type - 1, cell_type.upper_right_corner))
    return row
}

function last_row(board_type, number_of_places) {
    const row = []
    row.push(new Owner(number_of_places - board_type, cell_type.lower_left_corner))

    for (let i = 1; i < board_type - 1; i++)
        row.push(new Owner(number_of_places - board_type + i, cell_type.lower_border))

    row.push(new Owner(number_of_places - 1, cell_type.lower_right_corner))

    return row
}
