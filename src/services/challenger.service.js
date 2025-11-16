import { test } from '@playwright/test';

export class ChallengerService{
    constructor(request) {
        this.request = request;
    }
    async post(testInfo) {
        return test.step('POST /challenger', async () => {
            const response = await this.request.post(
                `${process.env.API_URL}/challenger`
            );
            return response;
        });
    }
}