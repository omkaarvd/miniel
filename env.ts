import { z } from 'zod';

const envVariables = z.object({
  NEXT_BASE_URL: z.string(),
  DATABASE_URL: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
