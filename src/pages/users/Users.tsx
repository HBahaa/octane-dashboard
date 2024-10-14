import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Container, Grid, LoadingOverlay, Text } from '@mantine/core';
import { FC, useEffect, useState } from 'react';

import { Header, MantineTable, ModalWrapper } from '../../components';
import { mappedUser, User } from './types';
import { TableHeaders } from './config';
import { RootState } from '../../store/store';
import { setUsers } from '../../store/slices/users/usersSlice';
import { deleteUser, fetchUserDetails, fetchUsers, updateUserDetails } from './services';
import { UserForm } from './components/UserForm/UserForm';


export const Users: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpened, setIsOpened] = useState(false);
	const [mappedUsers, setMappedUsers] = useState<mappedUser[]>([]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

	const getUsers = async () => {
		setIsLoading(true);
		try {
			const response  = await fetchUsers();
			const usersRes = await response.json();
			const mappedUsers = usersRes.map((user : User) => ({
				...user,
				status: user.status ? <Badge color="green">Active</Badge> : <Badge color="gray">Active</Badge>,
			}))
			dispatch(setUsers(usersRes));
			setMappedUsers(mappedUsers);
		} catch (error) {
			console.log('error in fetching users', error);
		} finally {
			setIsLoading(false);
		}
	}


	const getUser = async (id: string) => {
		setIsLoading(true);
		try {
			const response = await fetchUserDetails(id);
			const user = await response.json();
			setSelectedUser(user);
		} catch (error) {
			console.log('error in fetching user', error);
		} finally {
			setIsLoading(false);
		}
	};

	const editUserData = async (values: User) => {
		setIsLoading(true);
		try {
			await updateUserDetails(values?.id, values);
			await getUsers();
			notifications.show({
				message: 'User Data updated successfully',
			});
			
		} catch (error) {
			console.log('error in updating user data', error);
		} finally {
			setIsLoading(false);
			setIsOpened(false);
		}
	};

	const	handleDeleteAction = async (id: string) => {
		setIsLoading(true);
		try {
			await deleteUser(id);
			await getUsers();
			notifications.show({
				message: 'User deleted successfully',
			});
		} catch (error) {
			console.log('error in deleting user', error);
		} finally {
			setIsLoading(false);
		}
	};

	const	handleViewAction = async (id: string) => {
		await getUser(id);
		setIsOpened(true);
	};

	const renderModalContent = () => {
		return( 
			selectedUser ? <UserForm user={selectedUser} handleFromSubmit={editUserData} /> : null
		)
	};

	const mapUsersList = (list: User[]) => {
		const mappedUsers = list.map((user : User) => ({
			...user,
			status: user.status ? <Badge color="green">Active</Badge> : <Badge color="gray">Active</Badge>,
		}))
		setMappedUsers(mappedUsers);
	};

	useEffect(() => {
		if (users.length) {
			mapUsersList(users);
		} else {
			getUsers();
		}
	}, []);

  return (
		<>
			<Header />
			<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
			<Container size='lg' py='xl'>
				<Grid>
					<Grid.Col>
						<Text fw='bold' mb='lg' size='lg'>Users</Text>
						<MantineTable
							items={mappedUsers}
							tableHeaders={TableHeaders}
							actions={{
								onDelete: handleDeleteAction,
								onEdit: handleViewAction
							}}
						/>
					</Grid.Col>
				</Grid>
			</Container>
			{
				isOpened && selectedUser && <ModalWrapper
					modalProps={{
						opened: isOpened,
						// closeOnClickOutside: isLoading ? false : true,
						onClose: () => setIsOpened(false),
						title: 'Edit User',
					}}
				>
					{renderModalContent()}
				</ModalWrapper>
			}
		</>
  );
};
