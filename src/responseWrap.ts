import { Callback, Context, Handler } from 'aws-lambda';
import { APIGatewayEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { ILogger } from './ILogger';
import { INTERNAL_500, Response, SUCCESS_200, SUCCESS_NO_CONTENT_204 } from './Response';

export const responseWrap =
	<DataResponse>(Fn: Handler<APIGatewayEvent, DataResponse>, logger?: ILogger) =>
	async (event: APIGatewayEvent, context: Context, callback: Callback<DataResponse>): Promise<Response> => {
		try {
			if (logger) logger.info({ event, context });

			const data = await Fn(event, context, callback);

			if (!data) return SUCCESS_NO_CONTENT_204(logger);

			return SUCCESS_200(data, logger);
		} catch (error) {
			if (logger) logger.error({ error });

			return error.statusCode && error.body && error.statusCode < 500 ? (error as Response) : INTERNAL_500(logger);
		}
	};
