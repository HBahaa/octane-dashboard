import { Table } from '@mantine/core';
import { ReactNode } from 'react';

import { ListActions } from '../ListActions';

export type TableHeader<T extends string> = {
  id: T;
  title?: string;
};

type TableItem<T extends string> = {
  [key in T]: string | number | ReactNode;
} & {
  id: string;
};


type MantineTableProps<T extends string> = {
  tableHeaders: TableHeader<T>[];
  items: TableItem<T>[];
  controlled?: {
    value: string;
    onChange: (value: string) => void;
  };
  actions?: {
    onDelete?: (itemId: string) => void;
    onEdit?: (itemId: string) => void;
    onView?: (itemId: string) => void;
  };
};

export const MantineTable = <T extends string>({
  tableHeaders,
  items,
  actions,
}: MantineTableProps<T>) => {
  const renderActionsMenu = (id: string) => (
    <ListActions
      id={id}
      deleteItem={actions?.onDelete}
      onEditItem={actions?.onEdit}
      viewItem={actions?.onView}
    />
  );
  const renderTableHeader = () => {
    return (
      <Table.Thead>
        <Table.Tr>
        {tableHeaders.map((header) => (
          <Table.Th key={header.id}>{header.title}</Table.Th>
        ))}
        <Table.Th key="actions" p="0.5rem">Actions</Table.Th>
      </Table.Tr>
      </Table.Thead>
    );
  };

  const renderTableBody = () => {
    return <Table.Tbody>
    {items.map((item) => (
      <Table.Tr key={item.id}>
        {renderRow(item)}
        <Table.Td
          key={`item#${item.id}-actions`}
          // className={classes.list__actions}
          p="0.5rem">
          {renderActionsMenu(item.id)}
        </Table.Td>
      </Table.Tr>
    ))}
    </Table.Tbody>
  };
  const renderRow = (item: TableItem<T>) => {
    return (
      tableHeaders.map((header) => (
        <Table.Td
          key={`item#${item.id}-${header.id}`}
          p="0.5rem">
          {item[header.id]}
        </Table.Td>
      ))
    );
  };


  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      {renderTableHeader()}
      {renderTableBody()}
    </Table>
  );
};
