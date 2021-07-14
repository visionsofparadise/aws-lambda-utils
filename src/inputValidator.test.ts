import Ajv, { JSONSchemaType } from 'ajv';
import standaloneCode from 'ajv/dist/standalone';
import requireFromString from 'require-from-string';
import { inputValidator } from './inputValidator';

const ajv = new Ajv({ code: { source: true } });

interface ITestData {
	key: string;
}

const testSchema: JSONSchemaType<ITestData> = {
	type: 'object',
	properties: {
		key: { type: 'string' }
	},
	required: ['key']
};

const testValidator = ajv.compile<ITestData>(testSchema);

const moduleCode = standaloneCode(ajv, testValidator);
const standaloneValidate = requireFromString(moduleCode);

it('throws on invalid data', () => {
	const invalidData = {
		invalidKey: 'test'
	};

	try {
		inputValidator(invalidData, standaloneValidate);
	} catch (err) {
		expect(err.statusCode).toBe(400);
	}
});

it('returns data if valid', () => {
	const validData = {
		key: 'test'
	} as any;

	const data = inputValidator<ITestData>(validData, standaloneValidate);

	expect(data).toStrictEqual(validData);
});
