export class hrmsloanschemedetail {
public schemeid :number;public detailiddesc :string;public detailid :number;public roleid :string;public roleiddesc :string;public maxeligibleamount :number;public maximumtimes :number;public interestrate :number;public maximuminstallment :number;public restrictotherloan :boolean;public noexistingloan :boolean;public allowdeferral :boolean;public status :string;
constructor() {}
}
export interface IhrmsloanschemedetailResponse {
total: number;
results: hrmsloanschemedetail[];
}

