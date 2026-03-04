'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { format } from 'timeago.js';
import { toast } from 'sonner';

import { LayoutType, Page, ScopeType } from 'components';

import { useApiMutation, useApiQuery } from 'hooks';

import { apiClient } from 'services/api-client.service';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Bookmarks = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const { data: bookmarks, refetch } = useApiQuery(apiClient.bookmarks.list);

  const { mutate: create, isPending } = useApiMutation(apiClient.bookmarks.create, {
    onSuccess: () => {
      toast.success('Bookmark saved!');
      setUrl('');
      setTitle('');
      refetch();
    },
  });

  return (
    <Page scope={ScopeType.PRIVATE} layout={LayoutType.MAIN}>
      <Head>
        <title>Bookmarks</title>
      </Head>

      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Bookmarks</h1>

        <div className="mb-8 flex gap-2">
          <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Button disabled={isPending || !url} onClick={() => create({ url, title })}>
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {bookmarks?.map((b: any) => (
            <Card key={b._id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {b.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {b.shortId} · {format(b.createdOn)}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Bookmarks;
