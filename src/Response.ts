import { ILogger } from './ILogger';

export interface IResponse {
	statusCode: number;
	body?: any;
	headers?: Required<{}>;
}

export class Response implements IResponse {
	public statusCode: number;
	public body: any;
	public headers: Required<{}>;

	constructor(props: IResponse, logger?: ILogger) {
		this.statusCode = props.statusCode;
		this.body = typeof props.body === 'string' ? props.body : JSON.stringify(props.body, null, 2);
		this.headers = {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			...props.headers
		};

		if (logger) logger.info({ response: this });
	}
}

export const SUCCESS_200 = (body: any, logger?: ILogger) => new Response({ statusCode: 200, body }, logger);
export const SUCCESS_NO_CONTENT_204 = (logger?: ILogger) => new Response({ statusCode: 204 }, logger);
export const BAD_REQUEST_400 = (error: any, logger?: ILogger) => new Response({ statusCode: 400, body: error }, logger);
export const UNAUTHORIZED_401 = (logger?: ILogger) => new Response({ statusCode: 401, body: 'Unauthorized' }, logger);
export const NOT_FOUND_404 = (logger?: ILogger) => new Response({ statusCode: 404, body: 'Item not found' }, logger);
export const INTERNAL_500 = (logger?: ILogger) => new Response({ statusCode: 500, body: 'Internal Error' }, logger);
