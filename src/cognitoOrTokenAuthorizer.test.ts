import { APIGatewayEvent } from 'aws-lambda';
import { nanoid } from 'nanoid';
import { cognitoOrTokenAuthorizer } from './cognitoOrTokenAuthorizer';

it('throws if no claim found', () => {
	try {
		cognitoOrTokenAuthorizer({
			requestContext: { authorizer: {} }
		} as unknown as APIGatewayEvent);
	} catch (err) {
		expect(err.statusCode).toBe(401);
	}
});

it('returns cognito claim', () => {
	const userId = nanoid();

	const result = cognitoOrTokenAuthorizer({
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

it('returns principalId', () => {
	const userId = nanoid();

	const result = cognitoOrTokenAuthorizer({
		requestContext: {
			authorizer: {
				principalId: userId
			}
		}
	} as unknown as APIGatewayEvent);

	expect(result).toBe(userId);
});
