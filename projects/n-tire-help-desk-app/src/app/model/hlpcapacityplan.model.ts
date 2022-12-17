export class hlpcapacityplan {
public capacityplaniddesc :string;public capacityplanid :number;public sourcefield :string;public sourcereference :number;public requirement :string;public estimateincrease :number;public timeunit :string;public timeunitdesc :string;public threshold :number;public responseplan :string;public businessimpact :string;public businessimpactdesc :string;public impactcost :number;public details :string;public status :string;
constructor() {}
}
export interface IhlpcapacityplanResponse {
total: number;
results: hlpcapacityplan[];
}

