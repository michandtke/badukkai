import middle_point from '../resources/middle_point.png'
import middle_image from '../resources/middle_image.png'
import middle_image_black from '../resources/middle_image_black.png'
import middle_image_white from '../resources/middle_image_white.png'
import middle_white_last from '../resources/middle_white_last.png'
import middle_black_last from '../resources/middle_black_last.png'
import top_border from '../resources/top_border.png'
import top_border_black from '../resources/top_border_black.png'
import top_border_white from '../resources/top_border_white.png'
import top_border_black_last from '../resources/top_border_black_last.png'
import top_border_white_last from '../resources/top_border_white_last.png'
import bottom_border from '../resources/bottom_border.png'
import bottom_border_black from '../resources/bottom_border_black.png'
import bottom_border_white from '../resources/bottom_border_white.png'
import bottom_border_white_last from '../resources/bottom_border_white_last.png'
import bottom_border_black_last from '../resources/bottom_border_black_last.png'
import left_border from '../resources/left_border.png'
import left_border_black from '../resources/left_border_black.png'
import left_border_white from '../resources/left_border_white.png'
import left_border_white_last from '../resources/left_border_white_last.png'
import left_border_black_last from '../resources/left_border_black_last.png'
import right_border from '../resources/right_border.png'
import right_border_black from '../resources/right_border_black.png'
import right_border_white from '../resources/right_border_white.png'
import right_border_black_last from '../resources/right_border_black_last.png'
import right_border_white_last from '../resources/right_border_white_last.png'
import lower_left_corner from '../resources/lower_left_corner.png'
import lower_left_corner_black from '../resources/lower_left_corner_black.png'
import lower_left_corner_white from '../resources/lower_left_corner_white.png'
import lower_left_corner_black_last from '../resources/lower_left_corner_black_last.png'
import lower_left_corner_white_last from '../resources/lower_left_corner_white_last.png'
import upper_right_corner from '../resources/upper_right_corner.png'
import upper_right_corner_black from '../resources/upper_right_corner_black.png'
import upper_right_corner_white from '../resources/upper_right_corner_white.png'
import upper_right_corner_black_last from '../resources/upper_right_corner_black_last.png'
import upper_right_corner_white_last from '../resources/upper_right_corner_white_last.png'
import lower_right_corner from '../resources/lower_right_corner.png'
import lower_right_corner_black from '../resources/lower_right_corner_black.png'
import lower_right_corner_white from '../resources/lower_right_corner_white.png'
import lower_right_corner_black_last from '../resources/lower_right_corner_black_last.png'
import lower_right_corner_white_last from '../resources/lower_right_corner_white_last.png'
import upper_left_corner from '../resources/upper_left_corner.png'
import upper_left_corner_black from '../resources/upper_left_corner_black.png'
import upper_left_corner_white from '../resources/upper_left_corner_white.png'
import upper_left_corner_black_last from '../resources/upper_left_corner_black_last.png'
import upper_left_corner_white_last from '../resources/upper_left_corner_white_last.png'
import {makeStyles} from "@material-ui/core/styles";
import {cell_type} from "./CellType";
import {owner_type} from "./OwnerType";
import React from "react";

const useStyles = makeStyles((theme) => ({
    img: {
        display: "block"
    }
}));

export default function ImageProvider({size, ownerType, cellType, clicked, wasLastMove, cellDimensions}) {
    const classes = useStyles();
    return (<img style={{width: cellDimensions}} src={image(ownerType, cellType, wasLastMove)} className={classes.img}
                 onClick={clicked} alt={"Hello"}/>)
}


function image(ownerType, cellType, wasLastMove) {
    switch (cellType) {
        case cell_type.upper_left_corner:
            return choose(ownerType, wasLastMove, upperLeftCorner)
        case cell_type.lower_left_corner:
            return choose(ownerType, wasLastMove, lowerLeftCorner)
        case cell_type.upper_right_corner:
            return choose(ownerType, wasLastMove, upperRightCorner)
        case cell_type.lower_right_corner:
            return choose(ownerType, wasLastMove, lowerRightCorner)
        case cell_type.upper_border:
            return choose(ownerType, wasLastMove, topBorder)
        case cell_type.lower_border:
            return choose(ownerType, wasLastMove, bottomBorder)
        case cell_type.left_border:
            return choose(ownerType, wasLastMove, leftBorder)
        case cell_type.right_border:
            return choose(ownerType, wasLastMove, rightBorder)
        case cell_type.middlePoint:
            return choose(ownerType, wasLastMove, middleMarker)
        case cell_type.middle:
            return choose(ownerType, wasLastMove, middleNormal)
        default:
            return "Hi."
    }
}

function choose(ownerType, wasLastMove, definition) {
    switch (ownerType) {
        case owner_type.black:
            return (wasLastMove) ? definition.blackLast : definition.black
        case owner_type.white:
            return (wasLastMove) ? definition.whiteLast : definition.white
        default:
            return definition.empty
    }
}

const upperLeftCorner = {
    black: upper_left_corner_black,
    blackLast: upper_left_corner_black_last,
    white: upper_left_corner_white,
    whiteLast: upper_left_corner_white_last,
    empty: upper_left_corner
}


const lowerLeftCorner = {
    black: lower_left_corner_black,
    blackLast: lower_left_corner_black_last,
    white: lower_left_corner_white,
    whiteLast: lower_left_corner_white_last,
    empty: lower_left_corner
}

const upperRightCorner = {
    black: upper_right_corner_black,
    blackLast: upper_right_corner_black_last,
    white: upper_right_corner_white,
    whiteLast: upper_right_corner_white_last,
    empty: upper_right_corner
}

const lowerRightCorner = {
    black: lower_right_corner_black,
    blackLast: lower_right_corner_black_last,
    white: lower_right_corner_white,
    whiteLast: lower_right_corner_white_last,
    empty: lower_right_corner
}

const topBorder = {
    black: top_border_black,
    blackLast: top_border_black_last,
    white: top_border_white,
    whiteLast: top_border_white_last,
    empty: top_border
}

const bottomBorder = {
    black: bottom_border_black,
    blackLast: bottom_border_black_last,
    white: bottom_border_white,
    whiteLast: bottom_border_white_last,
    empty: bottom_border
}

const leftBorder = {
    black: left_border_black,
    blackLast: left_border_black_last,
    white: left_border_white,
    whiteLast: left_border_white_last,
    empty: left_border
}

const rightBorder = {
    black: right_border_black,
    blackLast: right_border_black_last,
    white: right_border_white,
    whiteLast: right_border_white_last,
    empty: right_border
}

const middle = {
    black: middle_image_black,
    blackLast: middle_black_last,
    white: middle_image_white,
    whiteLast: middle_white_last
}

const middleMarker = {
    ...middle,
    empty: middle_point
}

const middleNormal = {
    ...middle,
    empty: middle_image
}