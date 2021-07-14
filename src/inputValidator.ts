import { ILogger } from './ILogger';
import { BAD_REQUEST_400 } from './Response';

type Validator<Data> = (Data: Data) => boolean;

export const inputValidator = <Data>(data: any, validator: Validator<Data>, logger?: ILogger): Data => {
	const result = validator(data);

	if (!result) throw BAD_REQUEST_400('Invalid data', logger);

	if (logger) logger.info({ valid: data });

	return data;
};
