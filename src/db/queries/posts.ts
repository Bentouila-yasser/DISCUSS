import { db } from '@/db';
import { Post } from '@prisma/client';

export type PostWithDataType = Post & {
  topic: { slug: string },
  user: {name: string | null },
  _count: { comments: number}
}

export function fetchPostBySearchTerm(term: string): Promise<PostWithDataType[]> {
  return db.post.findMany({
    where: {
      OR: [
        { title: { contains: term }},
        { content: { contains: term }}
      ]
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    }
  })
};

export function fetchPostByTopicSlug(slug: string): Promise<PostWithDataType[]> {
  return db.post.findMany({
    where: { topic: { slug }},
    include: {
      topic: { select: { slug: true}},
      user: { select: { name: true}},
      _count: { select: { comments: true}}
    }
  })
};

export function fetchTopPosts(count: number): Promise<PostWithDataType[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: 'desc'
        }
      }
    ],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } }
    },
    take: count
  })
}
