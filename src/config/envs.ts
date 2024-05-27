import 'dotenv/config';
import * as joi from 'joi';

interface EnvsValues {
  PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) throw new Error(`Config error: ${error.message}`);

const envsValues: EnvsValues = value;

export const envs = {
  port: envsValues.PORT,
};
