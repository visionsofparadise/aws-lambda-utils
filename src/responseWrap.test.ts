import { BAD_REQUEST_400, Response } from './Response';
import { responseWrap } from './responseWrap';

it('returns 204 on empty return', async () => {
	const wrapper = responseWrap(async () => {
		return;
	});

	const response = await wrapper({} as any, {} as any, {} as any);

	expect(response.statusCode).toBe(204);
});

it('returns 200 on data return', async () => {
	const wrapper = responseWrap(async () => {
		return {};
	});

	const response = await wrapper({} as any, {} as any, {} as any);

	expect(response.statusCode).toBe(200);
});

it('returns error response on throw', async () => {
	const wrapper = responseWrap(() => {
		throw BAD_REQUEST_400('Error');
	});

	const response = await wrapper({} as any, {} as any, {} as any);

	expect(response.statusCode).toBe(400);
});

it('overrides an internal error on throw', async () => {
	const wrapper = responseWrap(() => {
		throw new Response({ statusCode: 502, body: 'test' });
	});

	const response = await wrapper({} as any, {} as any, {} as any);

	expect(response.statusCode).toBe(500);
	expect(response.body).toBe('Internal Error');
});
