import { Category } from "./category";
import { User } from "./user";

export class Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    userId: number;
    category: Category;
    user: User;
    published: boolean;
    createdOn: Date;
    modifiedOn: Date;
    mainImageUrl: string;
    constructor(id: number, title: string, slug: string, content: string, excerpt: string, userId: number, category: Category, user: User, published: boolean, createdOn: Date, modifiedOn: Date, mainImageUrl: string) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.excerpt = excerpt;
        this.userId = userId;
        this.category = category;
        this.user = user;
        this.published = published;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.mainImageUrl = mainImageUrl;
    }
}
