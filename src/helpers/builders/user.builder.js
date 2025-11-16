export class UserBuilder {
    userEmail() {
        this.email = process.env.TEST_USER_EMAIL;
        return this;
    }
    userPassword() {
        this.password = process.env.TEST_USER_PASSWORD;
        return this;
    }
    generate() {
        return {...this };
    }
}