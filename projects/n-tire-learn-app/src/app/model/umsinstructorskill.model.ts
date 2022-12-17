export class umsinstructorskill {
    public skillid: number; public instructorid: number; public topicid: number; public topiciddesc: string; public rating: string; public ratingdesc: string; public status: string;
    constructor() { }
}
export interface IumsinstructorskillResponse {
    total: number;
    results: umsinstructorskill[];
}

