export class bocity {
public cityiddesc :string;public cityid :number;public code :string;public name :string;public stateid :number;public countryid :number;public countryiddesc :string;public metro :boolean;public status :string;public DeletedbolocationIDs :string;
constructor() {}
}
export interface IbocityResponse {
total: number;
results: bocity[];
}

