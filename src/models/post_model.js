import { BaseModel } from "./base_model";

export class PostModel extends BaseModel {
    constructor(
        permissions,
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        posterUrl
    ) {
        super();
        this.permissions = permissions;
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branchId = branchId;
        this.posterUrl = posterUrl;
    }

    static build({
        permissions,
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        posterUrl
     } ) {
        return new PostModel(
            permissions,
            id,
            name,
            createdAt,
            updatedAt,
            branchId,
            posterUrl
        );
    }
}
