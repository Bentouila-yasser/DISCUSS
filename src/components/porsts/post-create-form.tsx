"use client";

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import FormButton from "../comments/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action] = useFormState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  return (
    <Popover placement="left-start" backdrop="opaque">
      <PopoverTrigger>
        <Button type="submit" color="primary" variant="bordered">
          New Post
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="name your post"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Describe your post"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            ></Textarea>
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border vorder-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton> Create </FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
