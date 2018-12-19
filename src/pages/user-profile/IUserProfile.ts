export interface IUserProfile {
    login: string;
    avatar: string;
    created: string;
    role: string;
    articles: Array<{
        _id: string;
        name: string;
    }>;
}
