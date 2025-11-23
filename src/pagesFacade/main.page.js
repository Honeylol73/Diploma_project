import { test } from '@playwright/test';

export class MainPage {
	constructor(page) {
		this.page = page;
		this.signupButton = page.getByRole('link', { name: 'Sign up' });
		this.loginButton = page.getByRole('link', { name: 'Login' });
	}

	async open() {
		await this.page.goto('/');
	}

	async gotoSignUp() {
		return test.step('Переход на страницу регистрации', async (step) => {
		await this.signupButton.click();
	});
}
	async gotoLogin() {
		await this.loginButton.click();
	}
}
