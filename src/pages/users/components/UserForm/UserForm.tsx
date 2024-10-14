import { FC } from 'react';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { TextInput, Button, Select, Switch } from '@mantine/core';

import { roles } from '../../config';
import { User } from '../../types';

type UserFormProps = {
  user: User;
  handleFromSubmit: (values: User) => void
};

export const UserForm: FC<UserFormProps> = ({ user, handleFromSubmit }) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: user,
    validate: {
      username: hasLength({ min: 3 }, 'Must be at least 3 characters'),
      email: isEmail('Invalid email'),
      role: (value) => !value ? 'role is required' : null,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(handleFromSubmit)}
    >
      <TextInput
        mt="md"
        label="Username"
        placeholder="Username"
        key={form.key('username')}
        {...form.getInputProps('username')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Select
        my='md'
        label="Role"
        data={roles}
        placeholder="Select a role"
        {...form.getInputProps('role')}
      />
      <Switch
        mb='lg'
        defaultChecked={user.status}
        label="Active Status"
        {...form.getInputProps('status')}
      />


      <Button type="submit" mt="md" color='brand' fullWidth>
        Submit
      </Button>
    </form>
  );
}