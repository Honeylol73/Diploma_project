import { test as base } from '@playwright/test';
import { ArticleBuilder, UserBuilder } from '../builders/index';
import { App } from '../../pagesFacade/app.page';
import { Api } from '../../services/index';

export const test = base.extend({
    authorizedApp: async ({ page }, use) => {
        let authApp = new App(page);
        const authUser = new UserBuilder()
        .userEmail()
        .userPassword()
        .generate();
        
        await authApp.main.open();
        await authApp.main.gotoLogin();
        await authApp.authorize.signIn(authUser);

        await use(authApp);
    },
    createArticle: async ({ authorizedApp }, use) => {
        let app = authorizedApp;

        const newArticle = new ArticleBuilder()
        .addTitle()
        .addAnnotation()
        .addContent()
        .addTags()
        .generate();

        const commentText = new ArticleBuilder()
        .addComment()
        .generate();
        
        const editArticleFields = new ArticleBuilder()
        .addTitle()
        .addAnnotation()
        .addContent()
        .addTags()
        .generate();

        await app.home.createArticle();
        await app.manage.postNewArticle(newArticle);

        await use({ app, newArticle, commentText, editArticleFields });
    },
    api: async ({ request }, use) => {
        const api = new Api(request);
        
        await use(api);
    }
});
