import { Menu, UnstyledButton } from '@mantine/core';
import { FC } from 'react';

type ListActionsProps = {
  id: string;
  deleteItem?: (id: string) => void;
  viewItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
};

export const ListActions: FC<ListActionsProps> = ({
  id,
  deleteItem,
  viewItem,
  onEditItem,
}) => {
  const handleAction = (event: Event, action?: (id: string) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    action && action(id);
    event.stopPropagation();
  };

  return (
    <Menu shadow="sm" width={100} position="bottom-start">
      <Menu.Target>
        <UnstyledButton component="div" onClick={(event) => handleAction(event)}>
          ...
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {viewItem && <Menu.Item
          component="div"
          onClick={(event) => handleAction(event, viewItem)}>
            View
        </Menu.Item>}

        {onEditItem && <Menu.Item
          component="div"
          onClick={(event) => handleAction(event, onEditItem)}>
          Edit
        </Menu.Item>}

        {deleteItem && <Menu.Item
          component="div"
          onClick={(event) => handleAction(event, deleteItem)}
          color="error.6">
          Delete
        </Menu.Item>}
      </Menu.Dropdown>
    </Menu>
  );
};
