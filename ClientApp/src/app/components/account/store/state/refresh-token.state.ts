import { Token } from "src/app/models/token.model";


export interface RefreshTokenState {
    tokens: Token;
}

export const initialRefreshTokenState: RefreshTokenState = {
    tokens: null,

}