export class hrmsemployeeachievement {
public achievementiddesc :string;public achievementid :number;public employeeid :number;public employeeiddesc :string;public achievement :string;public referenceno :string;public title :string;public details :string;public applicationdate :Date;public registereddate :Date;public coowners :string;public achievementstatus :string;public achievementstatusdesc :string;public notes :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeachievementResponse {
total: number;
results: hrmsemployeeachievement[];
}

