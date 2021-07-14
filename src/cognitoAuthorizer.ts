import { APIGatewayEvent } from 'aws-lambda';
import { ILogger } from './ILogger';
import { UNAUTHORIZED_401 } from './Response';

export const cognitoAuthorizer = (event: APIGatewayEvent, cognitoClaim?: string, logger?: ILogger) => {
	if (
		!event.requestContext.authorizer ||
		!event.requestContext.authorizer.claims ||
		!event.requestContext.authorizer.claims[cognitoClaim || 'sub']
	) {
		throw UNAUTHORIZED_401(logger);
	}

	return event.requestContext.authorizer.claims[cognitoClaim || 'sub'];
};
