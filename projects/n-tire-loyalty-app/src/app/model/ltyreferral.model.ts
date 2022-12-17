export class ltyreferral {
public referraliddesc :string;public referralid :number;public customerid :number;public customeriddesc :string;public referencenumber :string;public referername :string;public recipentid :number;public recipientname :string;public contact :string;public recipientemail :string;public customfield :string;public referralstatus :string;public referralstatusdesc :string;public status :string;
constructor() {}
}
export interface IltyreferralResponse {
total: number;
results: ltyreferral[];
}

