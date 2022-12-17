export class umsstudentfeedback {
    public feedbackid: number; public studentid: number; public courseid: number; public feedback: string; public totalrating: string; public totalratingdesc: string; public status: string; public DeletedumsfeedbackratingIDs: string;
    constructor() { }
}
export interface IumsstudentfeedbackResponse {
    total: number;
    results: umsstudentfeedback[];
}

