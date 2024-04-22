import { BaseModel } from "./base_model";

export class ServiceProviderModel extends BaseModel {
    constructor(
        id,
        name,
        createdAt,
        updatedAt,
        target,
        mainAddress,
        summary,
        images,
        logoUrl,
        coverUrl,
        marketShare,
        competitives,
        skillWorkers,
        traineeEmployees,
        adultCustomers,
        minorCustomers,
        minorPercentage,
        marketPercentage,
        traineePercentage,
        jobOfferCollection,
        userRole
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.target = target;
        this.mainAddress = mainAddress;
        this.summary = summary;
        this.images = images;
        this.logoUrl = logoUrl;
        this.coverUrl = coverUrl;
        this.marketShare = marketShare;
        this.competitives = competitives;
        this.skillWorkers = skillWorkers;
        this.traineeEmployees = traineeEmployees;
        this.adultCustomers = adultCustomers;
        this.minorCustomers = minorCustomers;
        this.minorPercentage = minorPercentage;
        this.marketPercentage = marketPercentage;
        this.traineePercentage = traineePercentage;
        this.jobOfferCollection = jobOfferCollection;
        this.userRole = userRole;
    }

    static build({
        id,
        name,
        createdAt,
        updatedAt,
        target,
        mainAddress,
        summary,
        images,
        logoUrl,
        coverUrl,
        marketShare,
        competitives,
        skillWorkers,
        traineeEmployees,
        adultCustomers,
        minorCustomers,
        minorPercentage,
        marketPercentage,
        traineePercentage,
        jobOfferCollection,
        userRole
    }
    ) {
        return new ServiceProviderModel(
            id,
            name,
            createdAt,
            updatedAt,
            target,
            mainAddress,
            summary,
            images,
            logoUrl,
            coverUrl,
            marketShare,
            competitives,
            skillWorkers,
            traineeEmployees,
            adultCustomers,
            minorCustomers,
            minorPercentage,
            marketPercentage,
            traineePercentage,
            jobOfferCollection,
            userRole
        );
    }
}
