import {owner_type} from "./OwnerType";

export default class Owner {

    constructor(cellType, x, y, owner = owner_type.empty) {
        this.owner = owner
        this.cellType = cellType
        this.x = x
        this.y = y
    }

    toString() {
        return "Owner(owner: " + this.owner + ", cellType: " + this.cellType + ")"
    }

    changeTo(owner) {
        return new Owner(this.cellType, this.x, this.y, owner)
    }
}