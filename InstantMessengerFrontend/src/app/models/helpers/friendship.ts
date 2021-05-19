import { User } from "../fetch/user";

export interface Friendship {
    accepted: boolean;
    user: User;
}
