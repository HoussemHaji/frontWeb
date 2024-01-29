import { Post } from "./post";


export class Category {
    id: Number;
    title: string;
    description: string;
    post: Post[];
    constructor(
        id = -1,
        title = '',
        description = '',
        post = []
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.post = post;
    }
}
