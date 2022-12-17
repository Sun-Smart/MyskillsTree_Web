export class dmssearch {
public searchiddesc :string;public searchid :number;public searchtext :string;public userid :number;public useriddesc :string;public searchstatus :string;public searchstatusdesc :string;public status :string;
constructor() {}
}
export interface IdmssearchResponse {
total: number;
results: dmssearch[];
}

