export class lmstargetbranchlevel {
public targetiddesc :string;public targetid :number;public branchid :number;public branchiddesc :string;public term :string;public termdesc :string;public productgroupid :number;public productgroupiddesc :string;public committedsalesnumbers :number;public committedsalesvalue :string;public likelysalesnumbers :number;public likelysalesvalue :string;public bestcasesalesnumbers :number;public bestcasesalesvalue :string;public actualsalesnumbers :number;public actualsalesvalue :string;public performancestatus :string;public performancestatusdesc :string;public status :string;
constructor() {}
}
export interface IlmstargetbranchlevelResponse {
total: number;
results: lmstargetbranchlevel[];
}

