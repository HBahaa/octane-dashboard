import type { Meta, StoryObj } from '@storybook/react';

import { MantineTable } from './Table';


const meta = {
  title: 'Components/Table',
  component: MantineTable,
  tags: ['autodocs'],
  argTypes: {
    tableHeaders: {
      description: 'Table headers',
      control: { name: 'array', required: true, summary: 'array' },
    },
    items: {
      description: 'Table items',
      control: { name: 'array', required: true, summary: 'array' },
    },
  },
} satisfies Meta<typeof MantineTable>;

export default meta;
type Story = StoryObj<typeof meta>;


export const TableWithoutActions : Story = {
  args: {
    tableHeaders: [
      { id: 'name', title: 'Name' },
      { id: 'color', title: 'Color' },
      { id: 'type', title: 'Type' },
      { id: 'flavour', title: 'Flavour' },
    ],
    items: [
      {
        id: '1',
        name: 'Apple',
        color: 'Red',
        type: 'Fruit',
        flavour: 'Sweet',
        panel: <div>Hello, I am an Apple</div>,
      },
      {
        id: '2',
        name: 'Banana',
        color: 'Yellow',
        type: 'Fruit',
        flavour: 'Sweet',
        panel: <div>Hello, I am a Banana</div>,
      },
      {
        id: '3',
        name: 'Carrot',
        color: 'Orange',
        type: 'Vegetable',
        flavour: 'Sweet',
        panel: <div>Hello, I am a Carrot</div>,
      },
    ],
  }  
};

export const TableWithActions : Story = {
  args: {
    tableHeaders: [
      { id: 'name', title: 'Name' },
      { id: 'color', title: 'Color' },
      { id: 'type', title: 'Type' },
      { id: 'flavour', title: 'Flavour' },
    ],
    items: [
      {
        id: '1',
        name: 'Apple',
        color: 'Red',
        type: 'Fruit',
        flavour: 'Sweet',
        panel: <div>Hello, I am an Apple</div>,
      },
      {
        id: '2',
        name: 'Banana',
        color: 'Yellow',
        type: 'Fruit',
        flavour: 'Sweet',
        panel: <div>Hello, I am a Banana</div>,
      },
      {
        id: '3',
        name: 'Carrot',
        color: 'Orange',
        type: 'Vegetable',
        flavour: 'Sweet',
        panel: <div>Hello, I am a Carrot</div>,
      },
    ],
    actions: {
      onEdit: () => console.log('edit')
    }
  }  
};