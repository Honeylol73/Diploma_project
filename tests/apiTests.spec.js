import { test, expect } from '@playwright/test';
import { Api } from '../src/services/index';
import { ToDoBuilder } from '../src/helpers/builders/index'

let token;
let createdToDoId;

test.describe('Challenge', () => {
// 1
    test.beforeAll('POST, Get token', async ({ request }, testInfo) => {

        const api = new Api(request);
        const r = await api.challenger.post(testInfo);
        const headers = r.headers();

        console.log(headers["location"]);
        token = headers["x-challenger"];

        expect(r.status()).toBe(201);
    });
// 2
    test('POST Create ToDo', {tag: '@APISPEC'}, async ({ request }, testInfo) => {

        const api = new Api(request);
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
    test('POST Create ToDo with wrong doneStatus', {tag: '@APISPEC'}, async ({ request }, testInfo) => {

        const api = new Api(request);
        const todo = new ToDoBuilder()
            .addDescription(20)
            .addTitle(30)
            .addDoneStatus('test')
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();

        expect(r.status()).toBe(400);
        expect(body.errorMessages[0]).toBe('Failed Validation: doneStatus should be BOOLEAN but was STRING');

    });
// 4
    test('POST Create ToDo with too long title', {tag: '@APISPEC'}, async ({ request }, testInfo) => {

        const api = new Api(request);
        const todo = new ToDoBuilder()
            .addDescription(20)
            .addTitle(51)
            .addDoneStatus()
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();


        expect(r.status()).toBe(400);
        expect(body.errorMessages[0]).toBe('Failed Validation: Maximum allowable length exceeded for title - maximum allowed is 50');

    });
// 5
    test('POST Create ToDo with too long description', {tag: '@APISPEC'}, async ({ request }, testInfo) => {

        const api = new Api(request);
        const todo = new ToDoBuilder()
            .addDescription(201)
            .addTitle(20)
            .addDoneStatus()
            .generate();

        let r = await api.todos.CreateToDo(testInfo, token, todo);
        let body = await r.json();


        expect(r.status()).toBe(400);
        expect(body.errorMessages[0]).toBe('Failed Validation: Maximum allowable length exceeded for description - maximum allowed is 200');

    });
// 6
    test('POST Create ToDo with max out content', {tag: '@APISPEC'}, async ({ request }, testInfo) => {

        const api = new Api(request);
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