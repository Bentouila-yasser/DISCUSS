'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { Post, Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must be lower case letters or dashes without spaces' }),
  content: z.string().min(10)
})

interface CreatePostFormState {
  errors: {
    title?: string[],
    content?: string[],
    _form?: string[]
  }
}

export async function createPost(
  slug : string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be Sign in to do this']
      }
    }
  }
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const result = createPostSchema.safeParse({
    title,
    content
  })
  if (!result.success) {
    console.log()
    return {
      errors: result.error.flatten().fieldErrors
    }
  }
  let topic = await db.topic.findFirst({
    where: {
      slug
    },
    select: {
      id: true,
    }
  });
  if (!topic) {
    return {
      errors: {
        _form: ['The topic was not found, eather deleted or modified']
      }
    }
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data?.title,
        content: result.data?.content,
        userId: session?.user.id,
        topicId: topic.id
      }
    })
    console.log("post", post)
    // await db.topic.update({
    //   where: {
    //     id: topic.id
    //   },
    //   data: {
    //     posts: {
    //       set: [{ id: post.id }]
    //     }
    //   }
    // })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      }
    }
  }
  //todo revalidate the post
  revalidatePath(paths.topicShow( slug ))
  redirect(paths.postShow(slug, post.id))
}
