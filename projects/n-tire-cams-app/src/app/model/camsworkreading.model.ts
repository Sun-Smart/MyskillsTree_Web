export class camsworkreading {
public readingiddesc :string;public readingid :number;public logid :number;public logiddesc :string;public workorderid :number;public workorderiddesc :string;public userid :number;public readingdate :Date;public meterreading :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamsworkreadingResponse {
total: number;
results: camsworkreading[];
}

