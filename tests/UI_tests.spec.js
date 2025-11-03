import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/index';

test.describe('Пользователь работает с приложением после авторизации', () => {

test.beforeEach(async ({ authorizedApp }) => {

});

test('Пользователь создает новую статью', async ({
  createArticle
}) => {
  const { app, newArticle } = createArticle;
  
  await expect(app.home.articleHeadder).toContainText(newArticle.title);

});

test('Пользователь редактирует созданную статью', async ({
  createArticle
}) => {
  const { app, editArticleFields } = createArticle;

  // Редактируем созданную статью
  await app.edit.gotoEditArticle();
  await app.manage.editArticle(editArticleFields);
  
  await expect(app.home.articleHeadder).toContainText(editArticleFields.title);

});

test('Пользователь пишет комментарий', async ({
  createArticle
}) => {
  const { app, commentText } = createArticle;

// Пишем комментарий
  await app.edit.writeComment(commentText);

  await expect(app.home.articleCommentText).toContainText(commentText.newCommentText);

});

test('Пользователь удаляет свой комментарий', async ({
  createArticle
}) => {
  const { app, commentText } = createArticle;

// Пишем комментарий
  await app.edit.writeComment(commentText);

// Тут же передумываем и удаляем комментарий
  await app.edit.deleteComment();

  await expect(app.home.articleCommentText).toContainText('There are no comments yet...');

});

test('Пользователь удаляет созданную статью', async ({
  createArticle
}) => {
  const { app } = createArticle;

// Пользователь удаляет статью
  await app.edit.deleteArticle();

  await expect(app.home.articleCommentText).toContainText('Your Feed');

});

});