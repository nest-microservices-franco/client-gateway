import 'dotenv/config';
import * as joi from 'joi';

interface EnvsValues {
  PORT: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) throw new Error(`Config error: ${error.message}`);

const envsValues: EnvsValues = value;

export const envs = {
  port: envsValues.PORT,
  natsServers: envsValues.NATS_SERVERS,
};
