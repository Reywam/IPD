import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Transport } from "@services/transport";
import { AppContext } from "@context";
import { get } from "lodash";

@autobind
export class RouteStore {
    private readonly transport = new Transport();
    @observable private _role = "";
    @observable private _success = false;

    get role(): string {
        return this._role;
    }

    set role(value: string) {
        this._role = value;
    }

    get succes(): boolean {
        return this._success;
    }

    getRole(): void {
        const token = AppContext.getUserStore().getToken();
        this.transport.getRole(token).then((response) => {
           const success = get(response.data, "success");
           if (success) {
               this.role = get(response.data, "data");
               this._success = true;
           } else {
               this.role = "";
               this._success = true;
           }
        });
    }
}
