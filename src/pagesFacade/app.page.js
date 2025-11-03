import { MainPage, SignInPage, YourFeedPage, ManageArticle, MyArticle, RegisterPage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.main = new MainPage(page);
        this.manage = new ManageArticle(page);
        this.edit = new MyArticle(page);
        this.register = new RegisterPage(page);
        this.authorize = new SignInPage(page);
        this.home = new YourFeedPage(page);
    }
}
