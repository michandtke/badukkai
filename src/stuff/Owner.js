import {owner_type} from "./OwnerType";

export default class Owner {

    constructor(id, cellType, owner = owner_type.empty) {
        this.id = id
        this.owner = owner
        this.cellType = cellType
    }

    toString() {
        return "Owner(id: " + this.id + ", owner: " + this.owner + ", cellType: " + this.cellType + ")"
    }
}