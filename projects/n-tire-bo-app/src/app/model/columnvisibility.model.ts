export class columnvisibility {
    constructor(public columnvisibilityid: number, public company: number, public tablename: string, public columnname: string, public usertypeid: number, public usertypeidDesc: string, public show: boolean, public hide: boolean) { }
}
export interface IcolumnvisibilityResponse {
    total: number;
    results: columnvisibility[];
}

