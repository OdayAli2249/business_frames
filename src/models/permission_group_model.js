import { BaseModel } from "./base_model";

export class PermissionGroupModel extends BaseModel {
    constructor(
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        actions,
        userIds,
        postIds,
        serviceIds,
        productIds,
        description
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branchId = branchId;
        this.actions = actions;
        this.userIds = userIds;
        this.postIds = postIds;
        this.serviceIds = serviceIds;
        this.productIds = productIds;
        this.description = description;
    }

    static build({
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        actions,
        userIds,
        postIds,
        serviceIds,
        productIds,
        description
    }) {
        return new PermissionGroupModel(
            id,
            name,
            createdAt,
            updatedAt,
            branchId,
            actions,
            userIds,
            postIds,
            serviceIds,
            productIds,
            description
        );
    }
}
