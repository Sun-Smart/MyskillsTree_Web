export class erpfaaccountperiodmaster {
public periodiddesc :string;public periodid :number;public finyear :number;public finyeardesc :string;public periodname :string;public startdate :Date;public enddate :Date;public status :string;
constructor() {}
}
export interface IerpfaaccountperiodmasterResponse {
total: number;
results: erpfaaccountperiodmaster[];
}

