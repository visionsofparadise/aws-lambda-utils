import { APIGatewayEvent } from 'aws-lambda';
import { ILogger } from './ILogger';
import { UNAUTHORIZED_401 } from './Response';

export type IAuthorizer = (event: APIGatewayEvent, logger?: ILogger) => string;

export const cognitoAuthorizer: IAuthorizer = (event, logger) => {
	if (
		!event.requestContext.authorizer ||
		!event.requestContext.authorizer.claims ||
		!event.requestContext.authorizer.claims.sub
	) {
		throw UNAUTHORIZED_401(logger);
	}

	return event.requestContext.authorizer.claims.sub;
};
