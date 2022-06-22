import { APIGatewayEvent } from 'aws-lambda';
import { ILogger } from 'envlog';
import { UNAUTHORIZED_401 } from './Response';

export type IAuthorizer = (event: APIGatewayEvent, logger?: ILogger) => string;

export const cognitoOrTokenAuthorizer: IAuthorizer = (event, logger) => {
	let userId

	if (event.requestContext.authorizer) {
		if (event.requestContext.authorizer.claims && event.requestContext.authorizer.claims.sub) {
			userId = event.requestContext.authorizer.claims.sub
		}
	
		if (event.requestContext.authorizer.principalId) {
			userId = event.requestContext.authorizer.principalId
		}
	}

	if (!userId) throw UNAUTHORIZED_401(logger);

	return userId;
};
