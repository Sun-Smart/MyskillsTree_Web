export class hlpservicecontinuityplandetail {
public plandetailiddesc :string;public plandetailid :number;public planid :number;public category :string;public categorydesc :string;public serviceid :number;public assignto :string;public recoverydetails :string;public estimatedrecoverytime :string;public status :string;
constructor() {}
}
export interface IhlpservicecontinuityplandetailResponse {
total: number;
results: hlpservicecontinuityplandetail[];
}

