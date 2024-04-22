import { BaseModel } from "./base_model";

export class JobOfferModel extends BaseModel {

    constructor(
        experience,
        jobType,
        location,
        qualification,
        responsibilities,
        skills,
        benefits,
        workingHours,
        companyActivities) {
        super();
        this.experience = experience;
        this.jobType = jobType;
        this.location = location;
        this.qualification = qualification;
        this.responsibilities = responsibilities;
        this.skills = skills;
        this.benefits = benefits;
        this.workingHours = workingHours;
        this.companyActivities = companyActivities;
    }

    static build({
        experience,
        jobType,
        location,
        qualification,
        responsibilities,
        skills,
        benefits,
        workingHours,
        companyActivities
    }) {
        return new JobOfferModel(
            experience,
            jobType,
            location,
            qualification,
            responsibilities,
            skills,
            benefits,
            workingHours,
            companyActivities
        )
    }
}