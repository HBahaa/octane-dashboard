import React from "react";
import { MantineProvider } from "@mantine/core";
import type { Preview } from "@storybook/react";

import { ReduxProvider } from '../src/providers';
import '@mantine/core/styles.css';

export const decorators = [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (renderStory: any) => (
    <ReduxProviderWrapper>{renderStory()}</ReduxProviderWrapper>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (renderStory: any) => (
    <MantineProvider>{renderStory()}</MantineProvider>
  ),
];

// Create a wrapper component that will contain all your providers.
// Usually you should render all providers in this component:
// MantineProvider, DatesProvider, Notifications, Spotlight, etc.
function ReduxProviderWrapper(props: { children: React.ReactNode }) {
  return <ReduxProvider>{props.children}</ReduxProvider>;
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
