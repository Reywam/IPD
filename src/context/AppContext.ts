import createBrowserHistory from "history/createBrowserHistory";
import { UserStore } from "@app/stores/";
import { HeaderStore } from "@components/header";
import { FormStore } from "@components/form-store";
import { SignUpStore } from "@components/sign-up";

export namespace AppContext {
    const history = createBrowserHistory();
    const signUpStore = new SignUpStore();
    const formStore = new FormStore();
    const userStore = new UserStore();
    const headerStore = new HeaderStore();

    export function getHistory() {
        return history;
    }

    export function getFormStore(): FormStore {
        return formStore;
    }

    export function getSignUpStore(): SignUpStore {
        return signUpStore;
    }

    export function getUserStore(): UserStore {
        return userStore;
    }

    export function getHeaderStore(): HeaderStore {
        return headerStore;
    }
}
