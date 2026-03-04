import { z } from 'zod';

export const userBookmarksExtend = {
  bookmarksCount: z.number().default(0),
};
