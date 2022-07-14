export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete',
}

export type OnSucces<Response> = (response: Response) => void;
export type OnError = () => void;
