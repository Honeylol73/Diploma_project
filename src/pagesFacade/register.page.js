import { test } from '@playwright/test';

export class RegisterPage {
	constructor(page) {
		this.page = page;
		this.emailInput = page.getByRole('textbox', { name: 'Email' });
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
		this.signupButton = page.getByRole('button', { name: 'Sign up' });
	}

	async register(user) {
		return test.step('Пользователь заполняет форму регистрации', async (step) => {
		
		const { name, email, password } = user;
		await this.nameInput.click();
		await this.nameInput.fill(name);
		await this.emailInput.click();
		await this.emailInput.fill(email);
		await this.passwordInput.click();
		await this.passwordInput.fill(password);
		await this.signupButton.click();
	});
}
}
