import { BaseModel } from "./base_model";

export class ProductModel extends BaseModel {
    constructor(
        permissions,
        id,
        name,
        createdAt,
        updatedAt,
        branchId,
        rating,
        reviews,
        amazonLink,
        shortDescription,
        colors,
        sizes,
        price,
        brand,
        category,
        amount,
        dimesion,
        weight,
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
        this.amazonLink = amazonLink;
        this.shortDescription = shortDescription;
        this.colors = colors;
        this.sizes = sizes;
        this.price = price;
        this.brand = brand;
        this.category = category;
        this.amount = amount;
        this.dimesion = dimesion;
        this.weight = weight;
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
        amazonLink,
        shortDescription,
        colors,
        sizes,
        price,
        brand,
        category,
        amount,
        dimesion,
        weight,
        features,
        images
     } ) {
        return new ProductModel(
            permissions,
            id,
            name,
            createdAt,
            updatedAt,
            branchId,
            rating,
            reviews,
            amazonLink,
            shortDescription,
            colors,
            sizes,
            price,
            brand,
            category,
            amount,
            dimesion,
            weight,
            features,
            images
        );
    }
}
