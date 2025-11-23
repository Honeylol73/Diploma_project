import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/index'
import { ToDoBuilder } from '../src/helpers/builders/index';

let token;
let createdToDoId;

test.describe('Challenge', () => {
// 1
    test.beforeAll('POST, Get token', async ({ api }, testInfo) => {

        const r = await api.challenger.post(testInfo);
        const headers = r.headers();
        token = headers["x-challenger"];

        expect(r.status()).toBe(201);
    });
// 2
    test('POST Create ToDo', {tag: '@APISPEC'}, async ({ api }, testInfo) => {

        const todo = new ToDoBuilder()
            .addDescription(20)
            .addTitle(30)
            .addDoneStatus()
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();
        createdToDoId = body.id;

        expect(r.status()).toBe(201);
        expect(body.title).toEqual(todo.title);
        expect(body.description).toEqual(todo.description);
        expect(body.doneStatus).toEqual(todo.doneStatus);

    });
// 3
    test('POST Create ToDo with wrong doneStatus', {tag: '@APISPEC'}, async ({ api }, testInfo) => {

        const ERROR_BOOL = 'Failed Validation: doneStatus should be BOOLEAN but was STRING';
        const todo = new ToDoBuilder()
            .addDescription(20)
            .addTitle(30)
            .addDoneStatus('test')
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();

        expect(r.status()).toBe(400);
        expect(body.errorMessages[0]).toBe(ERROR_BOOL);

    });
// 4
    test('POST Create ToDo with too long title', {tag: '@APISPEC'}, async ({ api }, testInfo) => {

        const ERROR_TITLE_LENGTH = 'Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50';
        const todo = new ToDoBuilder()
            .addDescription(20)
            .addTitle(51)
            .addDoneStatus()
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();

        expect(r.status()).toBe(400);
        expect(body.errorMessages[0]).toBe(ERROR_TITLE_LENGTH);

    });
// 5
    test('POST Create ToDo with too long description', {tag: '@APISPEC'}, async ({ api }, testInfo) => {

        const ERROR_DESCRIPTION_LENGTH = 'Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200';
        const todo = new ToDoBuilder()
            .addDescription(201)
            .addTitle(20)
            .addDoneStatus()
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();

        expect(r.status()).toBe(400);
        expect(body.errorMessages[0]).toBe(ERROR_DESCRIPTION_LENGTH);

    });
// 6
    test('POST Create ToDo with max out content', {tag: '@APISPEC'}, async ({ api }, testInfo) => {

        const todo = new ToDoBuilder()
            .addDescription(200)
            .addTitle(50)
            .addDoneStatus()
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();

        expect(r.status()).toBe(201);
        expect(body.title).toEqual(todo.title);
        expect(body.description).toEqual(todo.description);
        expect(body.doneStatus).toEqual(todo.doneStatus);

    });

});