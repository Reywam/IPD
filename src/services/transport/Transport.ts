import axios, { AxiosInstance } from "axios";
import { autobind } from "core-decorators";
import { ApiRoutes } from "./ApiRotes";
import * as qs from "qs";
import {
    IChangePassword,
    ICommentData,
    IDeleteUser,
    IForgotPassword,
    IUserDataLogin,
    IUserDataSignUp
} from "@interfaces/";

@autobind
export class Transport {
    private readonly instance: AxiosInstance;
    private readonly  config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    constructor() {
        this.instance = axios.create();
    }

    async sendUserData(data: IUserDataSignUp) {
        return this.instance.post(ApiRoutes.ADD_USER, qs.stringify(data), this.config);
    }

    async checkLoginExist(login: string) {
        return this.instance.post(ApiRoutes.CHECK_LOGIN_EXIST, qs.stringify({login}), this.config);
    }

    async checkEmailExist(email: string) {
        return this.instance.post(ApiRoutes.CHECK_EMAIL_EXIST, qs.stringify({email}), this.config);
    }

    async confirmCode(login: string, code: string) {
        return this.instance.post(ApiRoutes.CONFIRM_CODE, qs.stringify({login, activationCode: code}), this.config);
    }

    async login(data: IUserDataLogin) {
        return this.instance.post(ApiRoutes.LOGIN, qs.stringify(data), this.config);
    }

    async resendCode(email: string) {
        return this.instance.put(ApiRoutes.RESEND_CODE, qs.stringify({email}));
    }

    async getUsers(token: string) {
        return this.instance.post(ApiRoutes.GET_USERS, qs.stringify({token}), this.config);
    }

    async getUser(token: string) {
        return this.instance.post(ApiRoutes.GET_USER, qs.stringify({token}), this.config);
    }

    async getUserById(token: string, id: string) {
        return this.instance.post(ApiRoutes.GET_USER_BY_ID, qs.stringify({token, id}), this.config);
    }

    async changeLogin(token: string, login: string) {
        return this.instance.put(ApiRoutes.CHANGE_LOGIN, qs.stringify({token, login}));
    }

    async changeEmail(token: string, email: string) {
        return this.instance.put(ApiRoutes.CHANGE_EMAIL, qs.stringify({token, email}));
    }

    async changePassword(data: IChangePassword) {
        return this.instance.put(ApiRoutes.CHANGE_PASSWORD, qs.stringify(data));
    }

    async forgotPassword(email: IForgotPassword) {
        return this.instance.put(ApiRoutes.FORGOT_PASSWORD, qs.stringify(email));
    }

    async deleteUser(data: IDeleteUser) {
        return this.instance.put(ApiRoutes.DELETE_USER, qs.stringify(data));
    }

    async uplodaAvatar(formData: FormData) {
        return this.instance.post(ApiRoutes.UPLOAD_AVATAR, formData, {headers: { "Content-Type": "multipart/form-data" }});
    }

    async deleteAvatar(token: string) {
        return this.instance.put(ApiRoutes.DELETE_AVATAR, qs.stringify({token}));
    }

    async blockUser(token: string, id: string) {
        return this.instance.put(ApiRoutes.BLOCK_USER, qs.stringify({token, id}));
    }

    async unblockUser(token: string, id: string) {
        return this.instance.put(ApiRoutes.UNBLOCK_USER, qs.stringify({token, id}));
    }

    async changeRole(token: string, userId: string,  newRole: string) {
        return this.instance.put(ApiRoutes.CHANGE_ROLE, qs.stringify({token, userId, newRole}));
    }

    async uploadArticle(token: string, name: string, text: string) {
        return this.instance.post(ApiRoutes.UPLOAD_ARTICLE, qs.stringify({token, name, text}));
    }

    async editArticle(token: string, articleId: string,  name: string, text: string) {
        return this.instance.put(ApiRoutes.EDIT_ARTICLE, qs.stringify({token, articleId,  name, text}));
    }

    async getArticles(pageNumber: string) {
        return this.instance.get(ApiRoutes.GET_ARTICLES.replace(":pageNumber", pageNumber));
    }

    async getArticleById(articleId: string) {
        return this.instance.get(ApiRoutes.GET_ARTICLE_BY_ID.replace(":articleId", articleId));
    }

    async addComment(data: ICommentData) {
        return this.instance.post(ApiRoutes.ADD_COMMENT, qs.stringify(data));
    }

    async getComments(articleId: string) {
        return this.instance.get(ApiRoutes.GET_COMMENTS.replace(":articleId", articleId));
    }

    async deleteComment(token: string, commentId: string) {
        return this.instance.post(ApiRoutes.DELETE_COMMENT, qs.stringify({token, commentId}));
    }

    async getMyArticles(token: string) {
        return this.instance.post(ApiRoutes.MY_ARTICLES, qs.stringify({token}));
    }

    async deleteArticle(token: string, articleId: string) {
        return this.instance.post(ApiRoutes.DELETE_ARTICLE, qs.stringify({token, articleId}));
    }

    async uploadAboutMe(token: string, text: string) {
        return this.instance.put(ApiRoutes.EDIT_ABOUT_ME, qs.stringify({token, text}));
    }

    async getAboutMe() {
        return this.instance.get(ApiRoutes.GET_ABOUT_ME);
    }

    async getContacts() {
        return this.instance.get(ApiRoutes.GET_CONTACTS);
    }

    async uploadContacts(token: string, text: string) {
        return this.instance.put(ApiRoutes.EDIT_CONTACTS, qs.stringify({token, text}));
    }

    async sendEmail(email: string, text: string) {
        return this.instance.post(ApiRoutes.SEND_EMAIL, qs.stringify({email, text}));
    }

    async getRole(token: string) {
        return this.instance.post(ApiRoutes.GET_ROLE, qs.stringify({token}));
    }

    async getUserProfile(userId: string) {
        return this.instance.get(ApiRoutes.GET_USER_PROFILE.replace(":userId", userId));
    }
}
