export class bodatamaskingrolerestrict {
public restrictiddesc :string;public restrictid :number;public datamaskid :number;public roleid :number;public roleiddesc :string;public status :string;
constructor() {}
}
export interface IbodatamaskingrolerestrictResponse {
total: number;
results: bodatamaskingrolerestrict[];
}

