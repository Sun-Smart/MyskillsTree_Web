export class hrmsemployeesectionwaiver {
public waiveriddesc :string;public waiverid :number;public deductionid :number;public deductioniddesc :string;public employeeid :number;public financialyear :number;public financialyeardesc :string;public sectionwaivername :string;public amount :number;public status :string;
constructor() {}
}
export interface IhrmsemployeesectionwaiverResponse {
total: number;
results: hrmsemployeesectionwaiver[];
}

