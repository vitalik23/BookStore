import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AccountState } from "src/app/components/account/store/state/account.state";
import { AdminState } from "src/app/components/admin/store/state/admin.state";
import { AuthorState } from "src/app/components/author/store/state/author.state";
import { OrderState } from "src/app/components/order/store/state/order.state";
import { PrintingEditionState } from "src/app/components/printing-edition/store/state/printing-edition.state";
import { UserState } from "src/app/components/user/store/state/user.state";
import { environment } from "src/environments/environment";
import { BaseErrorState } from "./base-error.state";
import { SpinnerState } from "./spinner.state";

export interface AppState{

    account?: AccountState;
    admin?: AdminState;
    author?: AuthorState;
    user?: UserState;
    order?: OrderState;
    printingEdition?:PrintingEditionState;
    errorMessage?: BaseErrorState;
    spinner?: SpinnerState;
}

export const appReducers: ActionReducerMap<AppState> = {
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];