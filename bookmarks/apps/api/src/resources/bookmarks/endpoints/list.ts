import { bookmarkService } from 'resources/bookmarks/bookmark.service';

import createEndpoint from 'routes/createEndpoint';

export default createEndpoint({
  method: 'get',
  path: '/',

  async handler(ctx) {
    const userId = ctx.state.user._id;

    const { results: bookmarks } = await bookmarkService.find({ userId }, { sort: { createdOn: -1 } });

    ctx.body = bookmarks;
  },
});
