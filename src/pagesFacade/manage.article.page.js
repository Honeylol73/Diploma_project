export class ManageArticle {
    constructor(page) {
        // Страница создания новой статьи
        this.newArticleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.newArticleAnnotation = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.newArticleContent = page.getByRole('textbox', { name: 'Write your article (in' });
        this.newArticleTags = page.getByRole('textbox', { name: 'Enter tags' });
        this.newArticlePublishButton = page.getByRole('button', { name: 'Publish Article' });

        // Страница редактирования статьи
        this.editArticleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.editArticleAnnotation = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.editArticleContent = page.getByRole('textbox', { name: 'Write your article (in' });
        this.editArticleTags = page.getByRole('textbox', { name: 'Enter tags' });
        this.editArticlePublishButton = page.getByRole('button', { name: 'Update Article' });
    }
    // Бизнесовые действия со страницей создания статьи
    async postNewArticle (newArticle) {
        const { title, annotation, content, tags} = newArticle;

        await this.newArticleTitle.click();
        await this.newArticleTitle.fill(title);
        await this.newArticleAnnotation.click();
        await this.newArticleAnnotation.fill(annotation);
        await this.newArticleContent.click();
        await this.newArticleContent.fill(content);
        await this.newArticleTags.click();
        await this.newArticleTags.fill(tags);
        await this.newArticlePublishButton.click();
    };
    // Бизнесовые действия со страницей редактирования статьи
    async editArticle (editArticleFields) {
        const { title, annotation, content, tags} = editArticleFields;

        await this.editArticleTitle.click();
        await this.editArticleTitle.fill(title);
        await this.editArticleAnnotation.click();
        await this.editArticleAnnotation.fill(annotation);
        await this.editArticleContent.click();
        await this.editArticleContent.fill(content);
        await this.editArticleTags.click();
        await this.editArticleTags.fill(tags);
        await this.editArticlePublishButton.click();

    }
}