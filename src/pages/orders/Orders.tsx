import { format } from 'date-fns';
import { notifications } from '@mantine/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { Badge, Button, Container, Grid, Group, LoadingOverlay, Radio, Text, Title } from '@mantine/core';

import { Header ,MantineTable ,ModalWrapper } from '../../components';
import { deleteOrder, fetchOrderDetails, fetchOrders, updateOrderStatus } from './services';
import { StatusToColor, TableHeaders } from './config';
import { MappedOrder, Order, Status } from './types';
import { setOrders } from '../../store/slices/orders/ordersSlice';
import { RootState } from '../../store/store';

export const Orders: FC = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpened, setIsOpened] = useState(false);
	const [ordersList, setOrdersList] = useState<MappedOrder[]>([]);
	const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
	const [isUpdate, setIsUpdate] = useState<boolean>(false);
	const [status, setStatus] = useState<Status | ''>('');
	const { orders } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch();


	const mapOrdersList = (list: Order[]) => {
		const mappedOrders = list.map((order : Order) => ({
			...order,
			status: <Badge color={StatusToColor[order.status]}>{order.status}</Badge>,
		}))
		setOrdersList(mappedOrders);
	};

	const getOrders = async () => {
		setIsLoading(true);
		try {
			const response = await fetchOrders();
			const jsonOrders = await response.json();
			const list = jsonOrders.map((order: Order) => ({
				...order,
				date: format(order?.date, "MM/dd/yyyy")
			}))
			setOrders(list);
			dispatch(setOrders(list));

			mapOrdersList(list)
		} catch (error) {
			console.log('error in fetching orders', error);
		} finally {
			setIsLoading(false);
		}
	};

	const getOrder = async (id: string) => {
		setIsLoading(true);
		try {
			const response = await fetchOrderDetails(id);
			const order = await response.json();
			setSelectedOrder(order);
		} catch (error) {
			console.log('error in fetching order', error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateStatus = async (id: string) => {
		setIsLoading(true);
		if (selectedOrder) {
			try {
				await updateOrderStatus(id, { ... selectedOrder, status });
				await getOrders();
				notifications.show({
					message: 'Order status updated successfully',
				});
				
			} catch (error) {
				console.log('error in update order status', error);
			} finally {
				setIsLoading(false);
				setIsUpdate(false);
				setIsOpened(false);
			}
		}
	};

	const	handleDeleteAction = async (id: string) => {
		setIsLoading(true);
		try {
			await deleteOrder(id);
			await getOrders();
			notifications.show({
				message: 'Order deleted successfully',
			});
		} catch (error) {
			console.log('error in deleting order', error);
		} finally {
			setIsLoading(false);
		}
	};

	const	handleViewAction = async (id: string) => {
		await getOrder(id);
		setIsOpened(true);
	};

	const	handleUpdateStatusAction = (id: string) => {
		setIsUpdate(true);
		handleViewAction(id);
	};
	

	const renderOrderDetails = () => {
		return (
			<>
				<Text mb='md'><b>Customer Name:</b> {selectedOrder?.customerName}</Text>
				<Text mb='md'><b>Order Status:</b> {selectedOrder?.status}</Text>
				<Text mb='md'><b>Order Date:</b> {format(selectedOrder?.date, "MM/dd/yyyy")}</Text>
				<Text mb='md'><b>Total Amount:</b> {selectedOrder?.total} EGP</Text>
			</>
		)
	}

	const renderModalContent = () => {
		if(isUpdate) {
			return <>
				<Radio.Group
					name="status"
					label="Update order status"
					description="This is anonymous"
					onChange={(value) => setStatus(value)}
					defaultValue={selectedOrder?.status}
				>
					<Group mt="xs">
						<Radio value="Pending" label="Pending" />
						<Radio value="Delivered" label="Delivered" />
						<Radio value="Shipped" label="Shipped" />
						<Radio value="Cancelled" label="Cancelled" />
					</Group>
				</Radio.Group>
				<Button
					mt='lg'
					onClick={() => selectedOrder?.id && updateStatus(selectedOrder?.id)}
				>
					update
				</Button>
			</>
		}
		return renderOrderDetails();
	};

	useEffect(() => {
		if (orders.length) {
			mapOrdersList(orders);
		} else {
			if (!isLoading) {
				getOrders();
			}
		}
	}, []);

  return (
		<>
			<Header />
			<LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
			<Container size='lg' py='xl'>
				<Grid>
					<Grid.Col>
						<Title size='h3' mb='md'>Customer Orders</Title>
						<MantineTable
							items={ordersList}
							tableHeaders={TableHeaders}
							actions={{
								onDelete: handleDeleteAction,
								onView: handleViewAction,
								onEdit: handleUpdateStatusAction
							}}
						/>
					</Grid.Col>
				</Grid>
			</Container>
			{
				isOpened && <ModalWrapper
					modalProps={{
						opened: isOpened,
						closeOnClickOutside: isLoading ? false : true,
						onClose: () => {setIsOpened(false); setIsUpdate(false)},
						title: 'Order Details',
					}}
				>
					{renderModalContent()}
				</ModalWrapper>
			}
		</>
  );
};