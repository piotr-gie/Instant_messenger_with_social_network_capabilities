import { Post } from "./post";
import { User } from "./user";

export interface Board {
    owner: User,
    posts: Post []
}
