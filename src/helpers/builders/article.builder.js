import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    addTitle() {
        this.title = faker.lorem.words(3);
        return this;
    }
    addAnnotation() {
        this.annotation = faker.lorem.words(6);
        return this;
    }
    addContent() {
        this.content = faker.lorem.text();
        return this;
    }
    addTags() {
        this.tags = faker.book.genre();
        return this;
    }
    addComment() {
        this.newCommentText = faker.lorem.words(8);
        return this;
    }
    generate() {
        return {...this };
    }
}
