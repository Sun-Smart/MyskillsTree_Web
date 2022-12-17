export class hrmsstatutorydetail {
public statutoryid :number;public detailiddesc :string;public detailid :number;public basedon :string;public basedondesc :string;public fromamount :number;public toamount :number;public percentageemployer :number;public percentageemployee :number;public maxemployerpercentage :number;public maxemployeepercentage :number;public status :string;
constructor() {}
}
export interface IhrmsstatutorydetailResponse {
total: number;
results: hrmsstatutorydetail[];
}

