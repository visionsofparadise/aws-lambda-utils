import { APIGatewayEvent } from 'aws-lambda';
import { nanoid } from 'nanoid';
import { cognitoAuthorizer } from './cognitoAuthorizer';

it('throws if no claim found', () => {
	try {
		cognitoAuthorizer({
			requestContext: { authorizer: {} }
		} as unknown as APIGatewayEvent);
	} catch (err) {
		expect(err.statusCode).toBe(401);
	}
});

it('returns claim', () => {
	const userId = nanoid();

	const result = cognitoAuthorizer({
		requestContext: {
			authorizer: {
				claims: {
					sub: userId
				}
			}
		}
	} as unknown as APIGatewayEvent);

	expect(result).toBe(userId);
});
