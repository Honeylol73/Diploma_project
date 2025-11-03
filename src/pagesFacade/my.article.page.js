export class MyArticle {
    constructor(page) {
        this.page = page;
        this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
        this.editArticleButton = page.getByRole('button', { name: 'Edit Article' }).first();
        this.commentTextbox = page.getByRole('textbox', { name: 'Write a comment...' });
        this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
        this.deleteCommentButton = page.locator('.btn.btn-sm.btn-outline-secondary.pull-xs-right');
    }

    // Редактируем статью
    async gotoEditArticle() {
        await this.editArticleButton.click();
    };

    // Пишем комментарий
    async writeComment(commentText) {
        const {newCommentText} = commentText;
        await this.commentTextbox.click();
        await this.commentTextbox.fill(newCommentText);
        await this.postCommentButton.click();
    }

    // Удаляем комментарий
    async deleteComment() {
        this.page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept();
  });
  await this.deleteCommentButton.click();
    };

    // Удаляем статью
    async deleteArticle() {
        this.page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept();
  });
  await this.deleteArticleButton.click(); 
    }
}