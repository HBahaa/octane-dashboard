import { Menu, Text } from '@mantine/core';
import React, { FC } from 'react';

type ActionProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  name: string;
};

type ActionsProps = {
  actions: ActionProps[];
};

export const Actions: FC<ActionsProps> = ({ actions }) => {
  if (actions.length == 0) 
    return;
  return (
    <Menu shadow="sm" width={200} position="bottom-end">
      <Menu.Target>
        <Text>...</Text>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Text size="md">Actions</Text>
        </Menu.Label>

        {actions.map((action) => (
          <Menu.Item
            component="div"
            onClick={action.onClick}
            color="secondary.7">
            <Text fz="sm">
              {action.name}
            </Text>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
