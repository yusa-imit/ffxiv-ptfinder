import InstanceContent from '@components/InstanceContent/InstanceContent';
import {
  Loader,
  LoadingOverlay,
  ScrollArea,
  Group,
  Button,
  Stack,
  Center,
  Title,
} from '@mantine/core';
import { DBInstance } from '@type/data/DBInstance';
import { useTranslation } from 'next-i18next';
import { SetStateAction } from 'react';

interface SelectorProps {
  render: boolean;
  loading: boolean;
  data: { [key: string]: DBInstance } | null;
  toBack: () => void;
  returnSelected: (value: number) => void;
  setSelected: React.Dispatch<SetStateAction<DBInstance | null>>;
  close: () => void;
}

export default function Selector({
  render,
  loading,
  data,
  toBack,
  returnSelected,
  setSelected,
  close,
}: SelectorProps) {
  const { t } = useTranslation('common');
  const dataIncomplete = loading || data === null || Object.keys(data).length === 0;
  return (
    <Stack
      style={{
        minHeight: render ? 350 : 0,
        height: render ? undefined : 0,
        transition: 'height 1s',
      }}
    >
      <LoadingOverlay visible={loading} />
      <ScrollArea.Autosize maxHeight={render ? '70vh' : '0'} type="hover">
        <Stack
          spacing={5}
          style={{
            padding: '5px 0 10px 0',
            height: dataIncomplete ? 300 : undefined,
            justifyContent: dataIncomplete ? 'center' : undefined,
          }}
        >
          {loading || data === null ? (
            <Center>
              <Title order={5}>{t('content_form_loading')}</Title>
            </Center>
          ) : Object.keys(data).length === 0 ? (
            <Center>
              <Title order={5}>{t('content_form_no_data')}</Title>
            </Center>
          ) : (
            Object.entries(data).map(([key, value]) => (
              <InstanceContent
                key={key}
                data={value}
                onClick={() => {
                  returnSelected(value.code);
                  setSelected(value);
                  toBack();
                  close();
                }}
              />
            ))
          )}
        </Stack>
      </ScrollArea.Autosize>
      <Group style={{ margin: '20px 0 10px 0' }}>
        <Button
          tabIndex={-1}
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            toBack();
          }}
        >
          {t('button_back')}
        </Button>
      </Group>
    </Stack>
  );
}
