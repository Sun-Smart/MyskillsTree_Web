export class prjchangerequestimpact {
public detailiddesc :string;public detailid :number;public changeid :number;public impactarea :string;public impactareadesc :string;public description :string;public impactlevel :string;public impactleveldesc :string;public status :string;
constructor() {}
}
export interface IprjchangerequestimpactResponse {
total: number;
results: prjchangerequestimpact[];
}

