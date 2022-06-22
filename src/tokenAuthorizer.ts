import { IAuthorizer } from './cognitoAuthorizer';
import { UNAUTHORIZED_401 } from './Response';

export const tokenAuthorizer: IAuthorizer = (event, logger) => {
	if (!event.requestContext.authorizer || !event.requestContext.authorizer.principalId) {
		throw UNAUTHORIZED_401(logger);
	}

	return event.requestContext.authorizer.principalId;
};
