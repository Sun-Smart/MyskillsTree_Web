export class ltypointtransfer {
public transferiddesc :string;public transferid :number;public reference :string;public customerid :number;public customeriddesc :string;public transfertype :string;public transfertypedesc :string;public value :number;public reason :string;public reasondesc :string;public comment :string;public issuer :number;public issuerdesc :string;public transferdate :Date;public transferstatus :string;public transferstatusdesc :string;public status :string;
constructor() {}
}
export interface IltypointtransferResponse {
total: number;
results: ltypointtransfer[];
}

