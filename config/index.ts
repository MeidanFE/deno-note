type ConnectionOptions = {
  host:string;
  port: number;
  user: string;
  password: string;
};

type Config = {
  db:ConnectionOptions,
  jwtSecret:string
}

const getEnvVairable = Deno.env.get;

export const db: ConnectionOptions = {
  host: getEnvVairable("DB_HOST")!,
  port: +getEnvVairable("DB_PORT")!,
  user: getEnvVairable("DB_USER")!,
  password: getEnvVairable("DB_PASSWORD")!,
};

export const config:Config = {
  db,
  jwtSecret:getEnvVairable("JWT_SECRET")!
}
