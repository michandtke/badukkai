import {owner_type} from "./OwnerType";

export default class Owner {
    constructor(id, cellType) {
        this.id = id
        this.owner = owner_type.empty
        this.cellType = cellType
    }
}