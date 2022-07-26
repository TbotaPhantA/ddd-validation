const isRequired = (propName: string): never => {
  throw new Error(`Config property ${propName} is required`);
};

class Config {
  typeorm = {
    type: 'postgres' as const,
    host: process.env.TYPEORM_HOST ?? isRequired('TYPEORM_HOST'),
    port: Number(process.env.TYPEORM_PORT) ?? isRequired('TYPEORM_PORT'),
    username: process.env.TYPEORM_USERNAME ?? isRequired('TYPEORM_USERNAME'),
    password: process.env.TYPEORM_PASSWORD ?? isRequired('TYPEORM_PASSWORD'),
    database: process.env.TYPEORM_DATABASE ?? isRequired('TYPEORM_DATABASE'),
    synchronize:
      process.env.TYPEORM_SYNCHRONIZE === 'true' ??
      isRequired('TYPEORM_SYNCHRONIZE'),
  };
}

export const config = new Config();
