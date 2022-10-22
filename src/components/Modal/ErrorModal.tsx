import { Title, Text, Group, Button, useMantineTheme, TitleOrder } from '@mantine/core';
import { closeAllModals } from '@mantine/modals';
import { ReactNode } from 'react';

export function ErrorModalTitle({
  order = 3,
  titleText,
}: {
  order?: TitleOrder;
  titleText: string;
}) {
  return <Title order={order}>{titleText}</Title>;
}

export function ErrorModalBody({
  description,
  errorMessages,
  confirmText,
  children,
}: {
  description: string;
  errorMessages: string[];
  confirmText?: string;
  children?: ReactNode;
}) {
  const theme = useMantineTheme();
  return (
    <>
      <Text size="sm">{description}</Text>
      {errorMessages.map((v) => (
        <Text color="red" size="sm">
          {v}
        </Text>
      ))}
      <Group position="right" mt={theme.spacing.lg}>
        {children || (
          <Button
            color="red"
            onClick={() => {
              closeAllModals();
            }}
          >
            {confirmText}
          </Button>
        )}
      </Group>
    </>
  );
}
