'use client'

import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import * as actions from '@/actions'
import { useFormState } from 'react-dom';
import FormButton from '../comments/form-button';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic,{
    errors: {}
  })

  return (
    <Popover placement="left-start" backdrop="opaque">
      <PopoverTrigger>
        <Button type="submit" color="primary" variant="bordered">
          New Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="name your topic"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
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
