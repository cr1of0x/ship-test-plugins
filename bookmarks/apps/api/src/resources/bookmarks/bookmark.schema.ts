import { z } from 'zod';

import { dbSchema } from '../base.schema';

export const bookmarkSchema = dbSchema.extend({
  userId: z.string(),
  url: z.string().url(),
  title: z.string().max(256),
  tag: z.string().max(64).optional(),
  shortId: z.string(),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;
