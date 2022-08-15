import ErrorIcon from '@components/icons/ErrorIcon';
import { Center, List, ListProps } from '@mantine/core';

interface MessageListProps extends Omit<ListProps, 'children'> {
  data: string[];
}
export function MessageList({ data, ...etc }: MessageListProps) {
  const setListItem = () => {
    return data.map((message, index) => <List.Item key={index}>{message}</List.Item>);
  };
  return data.length === 0 ? (
    <></>
  ) : (
    <List center spacing="xs" size="md" {...etc} px="xs">
      {setListItem()}
    </List>
  );
}
