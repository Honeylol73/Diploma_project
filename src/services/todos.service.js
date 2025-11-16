import { test } from '@playwright/test';

export class ToDosService {
    constructor(request) {
        this.request = request;
    }
    async get(testInfo, token) {
        return test.step('GET /todos', async () => {
            const response = await this.request.get(
                `${process.env.API_URL}/todos`,
                { headers: { "x-challenger": token }
            });
            return response;
        });
    };

    async CreateToDo(testInfo, token, toDoPayload) {
        return test.step('Create ToDo', async () => {

            let {title, doneStatus, description} = toDoPayload;

            const response = await this.request.post(
                `${process.env.API_URL}/todos`,
                { headers: {"x-challenger": token },
                data: toDoPayload
            });

            return response;
        });
    };
}