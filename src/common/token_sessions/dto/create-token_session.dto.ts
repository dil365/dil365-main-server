type TokenCreateReasons = 'access_token' | 'refresh_token'
export class CreateTokenSessionDto {
    id?: number;
    token?: string;
    owner_id?: number;
    created_at?: Date;
    expired_in?: string;

    created_for: TokenCreateReasons;
    payload: object;
}
