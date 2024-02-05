import { Post } from './post';
import { User } from './user';

export class Comment {
    id: Number;
    content: string;
    user: User;
    constructor(
        id = 0,
        content = '',
        user = new User()
    ) {
        this.id = id;
        this.content = content;
        this.user = user;
    }

}
