export class umsroom {
    public roomid: number; public code: string; public description: string; public maxstudents: number; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IumsroomResponse {
    total: number;
    results: umsroom[];
}

