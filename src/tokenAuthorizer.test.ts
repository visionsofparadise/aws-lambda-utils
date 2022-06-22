import { APIGatewayEvent } from 'aws-lambda';
import { nanoid } from 'nanoid';
import { tokenAuthorizer } from './tokenAuthorizer';

it('throws if no principalId found', () => {
	try {
		tokenAuthorizer({
			requestContext: { authorizer: {} }
		} as unknown as APIGatewayEvent);
	} catch (err) {
		expect(err.statusCode).toBe(401);
	}
});

it('returns principalId', () => {
	const userId = nanoid();

	const result = tokenAuthorizer({
		requestContext: {
			authorizer: {
				principalId: userId
			}
		}
	} as unknown as APIGatewayEvent);

	expect(result).toBe(userId);
});
