import { Post } from "./post";


export class Category {
    id: Number;
    title: string;
    post: Post[];
    constructor(
        id = -1,
        title = '',
        post = []
    ) {
        this.id = id;
        this.title = title;
        this.post = post;
    }
}
