import { BaseModel } from "./base_model";

export class BranchModel extends BaseModel {

    constructor(
        id,
        name,
        createdAt,
        updatedAt,
        serviceProviderId,
        logoUrl,
        market,
        marketPercentage,
        summary,
        reviews,
        promotionPhotos,
        userRole) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.serviceProviderId = serviceProviderId;
        this.logoUrl = logoUrl;
        this.market = market;
        this.marketPercentage = marketPercentage;
        this.summary = summary;
        this.reviews = reviews;
        this.promotionPhotos = promotionPhotos;
        this.userRole = userRole;
    }

    static build({
        id,
        name,
        createdAt,
        updatedAt,
        serviceProviderId,
        logoUrl,
        market,
        marketPercentage,
        summary,
        reviews,
        promotionPhotos,
        userRole
     } ) {
        return new BranchModel(
            id,
            name,
            createdAt,
            updatedAt,
            serviceProviderId,
            logoUrl,
            market,
            marketPercentage,
            summary,
            reviews,
            promotionPhotos,
            userRole
        )
    }
}