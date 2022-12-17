export class hrmsemployeegeneralwaiver {
public waiveriddesc :string;public waiverid :number;public deductionid :number;public deductioniddesc :string;public employeeid :number;public financialyear :number;public financialyeardesc :string;public generalwaivername :string;public amount :number;public status :string;
constructor() {}
}
export interface IhrmsemployeegeneralwaiverResponse {
total: number;
results: hrmsemployeegeneralwaiver[];
}

