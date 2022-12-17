export class itsoftware {
public softwareiddesc :string;public softwareid :number;public softwarename :string;public version :string;public type :string;public typedesc :string;public category :string;public categorydesc :string;public manufacturer :string;public cost :number;public description :string;public status :string;
constructor() {}
}
export interface IitsoftwareResponse {
total: number;
results: itsoftware[];
}

