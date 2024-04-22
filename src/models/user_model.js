import { BaseModel } from "./base_model";

export class UserModel extends BaseModel {
    constructor(
        id,
        name,
        firstName,
        lastName,
        createdAt,
        updatedAt,
        password,
        gender,
        job,
        age,
        education,
        university,
        email,
        phone,
        linkedin,
        country,
        city,
        address,
        experience,
        profession,
        companies,
        skills,
        jobType,
        responsebilities,
        profilePictureUrl,
        coverUrl,
        role
    ) {
        super();
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.password = password;
        this.gender = gender;
        this.job = job;
        this.age = age;
        this.education = education;
        this.university = university;
        this.email = email;
        this.phone = phone;
        this.linkedin = linkedin;
        this.country = country;
        this.city = city;
        this.address = address;
        this.experience = experience;
        this.profession = profession;
        this.companies = companies;
        this.skills = skills;
        this.jobType = jobType;
        this.responsebilities = responsebilities;
        this.profilePictureUrl = profilePictureUrl;
        this.coverUrl = coverUrl;
        this.role = role;
    }

    static build({
        id,
        name,
        firstName,
        lastName,
        createdAt,
        updatedAt,
        password,
        gender,
        job,
        age,
        education,
        university,
        email,
        phone,
        linkedin,
        country,
        city,
        address,
        experience,
        profession,
        companies,
        skills,
        jobType,
        responsebilities,
        profilePictureUrl,
        coverUrl,
        role
    }) {
        return new UserModel(
            id,
            name,
            firstName,
            lastName,
            createdAt,
            updatedAt,
            password,
            gender,
            job,
            age,
            education,
            university,
            email,
            phone,
            linkedin,
            country,
            city,
            address,
            experience,
            profession,
            companies,
            skills,
            jobType,
            responsebilities,
            profilePictureUrl,
            coverUrl,
            role
        );
    }
}
