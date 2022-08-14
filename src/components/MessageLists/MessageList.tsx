import { List, ListProps } from '@mantine/core';

interface MessageListProps extends ListProps {
  data: string[];
}
export function MessageList({ data, ...etc }: MessageListProps) {
  const setListItem = () => {
    data.map((message) => <List.Item>{message}</List.Item>);
  };
  return <List {...etc}></List>;
}
