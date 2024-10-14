import { Button, Container, Flex, Image, Paper, Text } from '@mantine/core';

import classes from './header.module.scss';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserProfile } from '../../store/slices/userProfile/userProfileSlice';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { profile } = useSelector((state: RootState) => state.userProfile);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUserProfile());
  }

  return (
   <Paper shadow="xs">
     <Container size='xl'>
      <Flex 
        wrap="wrap"
        direction="row"
        align="center"
        justify="space-between"
        p={'md'}
        mb='lg'
        className={classes.header}
      >
        <Image src={'/logo.png'} className={classes.logo} />
        <Flex gap='md' align='center'>
          <Text c='brand' fs='md' fw='500'>Hi, {profile?.username}</Text>
          <Link to='/' onClick={handleLogout}><Button bg='brand'>Logout</Button></Link>
        </Flex>
      </Flex>
    </Container>
   </Paper>
  );
};
