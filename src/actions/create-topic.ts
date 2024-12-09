'use server';

import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';
import { Topic } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-]+$/, {message: 'Must be lower case letters or dashes without spaces'}),
  description: z.string().min(10)
})

interface CreateTopicFormState {
  errors: {
    name?: string[],
    description?: string[],
    _form?: string[]
  }
}

export async function createTopic(
    formState: CreateTopicFormState,
    formData: FormData
  ): Promise<CreateTopicFormState> {
      // await new Promise((resolve) => setTimeout(
      //   resolve,
      //   2500
      // ));
    const session = await auth();
    if(!session || !session.user) {
      return {
        errors: {
          _form: ['You must be Sign in to do this']
        }
      }
    }
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const result = createTopicSchema.safeParse({
    name,
    description
  })
  if (!result.success) {
    console.log()
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data?.name,
        description: result.data?.name,
      }
    })
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

  revalidatePath(paths.home())
  redirect(paths.topicShow(topic?.slug))
}
