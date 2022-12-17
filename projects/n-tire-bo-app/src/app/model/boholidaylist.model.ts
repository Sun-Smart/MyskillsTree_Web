export class boholidaylist {
public holidayiddesc :string;public holidayid :number;public holidaylistid :number;public holidaylistiddesc :string;public holidaydate :Date;public holidayday :string;public holidaydaydesc :string;public reason :string;public status :string;
constructor() {}
}
export interface IboholidaylistResponse {
total: number;
results: boholidaylist[];
}

