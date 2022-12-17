export class bouserregistration {
public registrationiddesc :string;public registrationid :number;public firstname :string;public lastname :string;public emailid :string;public mobilenumber :string;public status :string;
constructor() {}
}
export interface IbouserregistrationResponse {
total: number;
results: bouserregistration[];
}

