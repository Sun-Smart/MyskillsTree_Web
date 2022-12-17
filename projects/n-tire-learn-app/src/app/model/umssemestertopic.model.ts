export class umssemestertopic {
    public semestertopicid: number; public courseid: number; public semesterid: number; public topicid: number; public status: string;
    constructor() { }
}
export interface IumssemestertopicResponse {
    total: number;
    results: umssemestertopic[];
}

