import { BaseModel } from "./base_model";

export class HiringRequestModel extends BaseModel {
    constructor(
        id,
        name,
        createdAt,
        updatedAt,
        userId,
        user,
        serviceProviderId,
        firstName,
        lastName,
        email,
        address,
        education,
        workExperience,
        coverLetter,
        cvUrl,
        certificateUrl,
        status
    ) {
        super();
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.user = user;
        this.serviceProviderId = serviceProviderId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.education = education;
        this.workExperience = workExperience;
        this.coverLetter = coverLetter;
        this.cvUrl = cvUrl;
        this.certificateUrl = certificateUrl;
        this.status = status;
    }

    static build({
        id,
        name,
        createdAt,
        updatedAt,
        userId,
        user,
        serviceProviderId,
        firstName,
        lastName,
        email,
        address,
        education,
        workExperience,
        coverLetter,
        cvUrl,
        certificateUrl,
        status
    }) {
        return new HiringRequestModel(
            id,
            name,
            createdAt,
            updatedAt,
            userId,
            user,
            serviceProviderId,
            firstName,
            lastName,
            email,
            address,
            education,
            workExperience,
            coverLetter,
            cvUrl,
            certificateUrl,
            status
        );
    }
}
