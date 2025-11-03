export class UserBuilder {
    userEmail() {
        this.email = 'bald@man.com';
        return this;
    }
    userPassword() {
        this.password = 'BB12345';
        return this;
    }
    generate() {
        return {...this };
    }
}