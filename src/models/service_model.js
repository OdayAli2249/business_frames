import { BaseModel } from "./base_model";

export class ServiceModel extends BaseModel {
    constructor(
        permissions,
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        rating,
        reviews,
        shortDescription,
        price,
        description,
        scope,
        features,
        images
    ) {
        super();
        this.permissions = permissions;
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.branchId = branchId;
        this.rating = rating;
        this.reviews = reviews;
        this.shortDescription = shortDescription;
        this.price = price;
        this.description = description;
        this.scope = scope;
        this.features = features;
        this.images = images;
    }

    static build({
        permissions,
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        rating,
        reviews,
        shortDescription,
        price,
        description,
        scope,
        features,
        images
     } ) {
        return new ServiceModel(
            permissions,
            id,
            name,
            createdAt,
            updatedAt,
            branchId,
            rating,
            reviews,
            shortDescription,
            price,
            description,
            scope,
            features,
            images
        );
    }
}
