import middle_image from '../resources/middle_image.png'
import middle_image_black from '../resources/middle_image_black.png'
import middle_image_white from '../resources/middle_image_white.png'
import top_border from '../resources/top_border.png'
import top_border_black from '../resources/top_border_black.png'
import top_border_white from '../resources/top_border_white.png'
import bottom_border from '../resources/bottom_border.png'
import bottom_border_black from '../resources/bottom_border_black.png'
import bottom_border_white from '../resources/bottom_border_white.png'
import left_border from '../resources/left_border.png'
import left_border_black from '../resources/left_border_black.png'
import left_border_white from '../resources/left_border_white.png'
import right_border from '../resources/right_border.png'
import right_border_black from '../resources/right_border_black.png'
import right_border_white from '../resources/right_border_white.png'
import lower_left_corner from '../resources/lower_left_corner.png'
import lower_left_corner_black from '../resources/lower_left_corner_black.png'
import lower_left_corner_white from '../resources/lower_left_corner_white.png'
import upper_right_corner from '../resources/upper_right_corner.png'
import upper_right_corner_black from '../resources/upper_right_corner_black.png'
import upper_right_corner_white from '../resources/upper_right_corner_white.png'
import lower_right_corner from '../resources/lower_right_corner.png'
import lower_right_corner_black from '../resources/lower_right_corner_black.png'
import lower_right_corner_white from '../resources/lower_right_corner_white.png'
import upper_left_corner from '../resources/upper_left_corner.png'
import upper_left_corner_black from '../resources/upper_left_corner_black.png'
import upper_left_corner_white from '../resources/upper_left_corner_white.png'
import {makeStyles} from "@material-ui/core/styles";
import {cell_type} from "./CellType";
import {owner_type} from "./OwnerType";
import React from "react";

const useStyles = makeStyles((theme) => ({
    inlineImage: {
        display: "block"
    }
}));

export default function ImageProvider(props) {
    const classes = useStyles();
    return (<img src={image(props.ownerType, props.cellType)} className={classes.inlineImage} onClick={props.clicked} alt={"Hello"}/>)
}

function image(ownerType, cellType) {
    switch (cellType) {
        case cell_type.upper_left_corner:
            return upperLeftCorner(ownerType)
        case cell_type.lower_left_corner:
            return lowerLeftCorner(ownerType)
        case cell_type.upper_right_corner:
            return upperRightCorner(ownerType)
        case cell_type.lower_right_corner:
            return lowerRightCorner(ownerType)
        case cell_type.upper_border:
            return upperBorder(ownerType)
        case cell_type.lower_border:
            return lowerBorder(ownerType)
        case cell_type.left_border:
            return leftBorder(ownerType)
        case cell_type.right_border:
            return rightBorder(ownerType)
        case cell_type.middle:
        default:
            return middle(ownerType)
    }
}

function upperLeftCorner(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return upper_left_corner_black
        case owner_type.white:
            return upper_left_corner_white
        default:
            return upper_left_corner
    }
}

function lowerLeftCorner(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return lower_left_corner_black
        case owner_type.white:
            return lower_left_corner_white
        default:
            return lower_left_corner
    }
}

function upperRightCorner(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return upper_right_corner_black
        case owner_type.white:
            return upper_right_corner_white
        default:
            return upper_right_corner
    }
}

function lowerRightCorner(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return lower_right_corner_black
        case owner_type.white:
            return lower_right_corner_white
        default:
            return lower_right_corner
    }
}

function upperBorder(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return top_border_black
        case owner_type.white:
            return top_border_white
        default:
            return top_border
    }
}

function lowerBorder(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return bottom_border_black
        case owner_type.white:
            return bottom_border_white
        default:
            return bottom_border
    }
}

function leftBorder(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return left_border_black
        case owner_type.white:
            return left_border_white
        default:
            return left_border
    }
}

function rightBorder(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return right_border_black
        case owner_type.white:
            return right_border_white
        default:
            return right_border
    }
}

function middle(ownerType) {
    switch (ownerType) {
        case owner_type.black:
            return middle_image_black
        case owner_type.white:
            return middle_image_white
        default:
            return middle_image
    }
}