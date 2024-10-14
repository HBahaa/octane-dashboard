import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmail, useForm } from '@mantine/form';
import { TextInput, Button, PasswordInput, Container, Paper, Image, Divider, Flex } from '@mantine/core';

import { fetchUsers } from '../users/services';
import { User } from '../users/types';
import { setUsers } from '../../store/slices/users/usersSlice';
import { setUserProfile } from '../../store/slices/userProfile/userProfileSlice';

type LoginProps = {
  email: string;
  password: string;
};

export const Login = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { password: '', email: '' },
    validate: {
      email: isEmail('Invalid email'),
      password: (value) => !value ? 'Password is required': null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (values: LoginProps) => { 
    setIsLoading(true);
    form.setErrors({});
		try {
			const response  = await fetchUsers();
			const usersRes = await response.json();
      const currentUser = usersRes.filter((user : User) => user.email == values.email)[0];
      if (currentUser) {
        if (currentUser.password == values.password) {
            dispatch(setUserProfile(currentUser));
            dispatch(setUsers(usersRes));
            if (currentUser.role == 'Admin') {
              return navigate(`/users`);
            }
            if (currentUser.role == 'User') {
              return navigate("/orders");
            }
          } else {
            form.setErrors({ password: 'Wrong password' });
          }
      } else {
        form.setErrors({ email: 'Wrong email' });
      }
		} catch (error) {
			console.log('error in login', error);
		} finally {
			setIsLoading(false);
		}
  }

  return (
    <Container h='100vh' size='xs'>
      <Flex align='center' h='100%'>
        <Paper shadow="sm" p="xl" bg='gray.1' w='100%'>
          <Image src={'/logo.png'} style={{ width: 150 }} mb={'md'} mx='auto' />
          <Divider />
          <form
            onSubmit={form.onSubmit(handleLogin)}
          >
            <TextInput
              mt="md"
              label="Email"
              placeholder="Email"
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />


          <Button justify="center" color='brand.8' fullWidth type="submit" mt="md" loading={isLoading} disabled={isLoading}>
            Submit
          </Button>
          </form>
        </Paper>
      </Flex>
    </Container>
  );
}