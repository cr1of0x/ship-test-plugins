import { nanoid } from 'nanoid';

import { bookmarkSchema } from 'shared';
import { z } from 'zod';

import { bookmarkService } from 'resources/bookmarks/bookmark.service';

import createEndpoint from 'routes/createEndpoint';

const schema = z.object({
  url: z.string().url(),
  title: z.string().max(256),
  tag: z.string().max(64).optional(),
});

export default createEndpoint({
  method: 'post',
  path: '/',
  schema,

  async handler(ctx) {
    const userId = ctx.state.user._id;
    const { url, title, tag } = ctx.validatedData;

    const bookmark = await bookmarkService.insertOne({
      userId,
      url,
      title,
      tag,
      shortId: nanoid(8),
    });

    ctx.body = bookmark;
  },
});
