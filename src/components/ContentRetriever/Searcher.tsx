import { Current } from '@constant/Current';
import { Button, Group, Input, LoadingOverlay, Select, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useTranslation } from 'next-i18next';
import { DungeonType, DungeonTypeToNumber, DungeonTypeValues } from '@type/data/FFXIVInfo';
import { ContentQueryString } from '@type/QueryString';
import { SetStateAction, useState } from 'react';

interface SearcherProps {
  form: UseFormReturnType<ContentQueryString, (values: ContentQueryString) => ContentQueryString>;
  setQuery: React.Dispatch<SetStateAction<string>>;
  toNext: () => void;
}
export default function Searcher({ form, setQuery, toNext }: SearcherProps) {
  const { t } = useTranslation('common');
  const [error, setError] = useState('');
  const formValidation = () => {
    let count = 0;
    Object.entries(form.values).forEach(([key, value]) => {
      if (key === 'title') {
        if (value.trim().length !== 0) count++;
        return;
      }
      if (value !== null) count++;
    });
    if (count === 0) return false;
    return true;
  };
  const transfromValues = (values: ContentQueryString) => {
    const keyValue = Object.entries(values);
    const arr: [string, any][] = [];
    keyValue.forEach(([key, value]) => {
      if (key === 'title') {
        if (value === '') return;
        arr.push([key, value]);
      } else {
        if (value === null) return;
        arr.push([key, value]);
      }
    });
    return arr.reduce((prev, [key, value]) => {
      return `${prev}${prev.length === 1 ? '' : '&'}${key}=${value}`;
    }, '?');
  };
  return (
    <Stack>
      <Select
        data={Current.version.map((v) => v.toString())}
        label={t('content_form_version')}
        allowDeselect
        onChange={(value) => {
          if (value === null) form.setFieldValue('version', null);
          else form.setFieldValue('version', value);
          setError('');
        }}
      />
      <Select
        data={Current.patch.map((v) => v.toString())}
        label={t('content_form_patch')}
        allowDeselect
        onChange={(value) => {
          if (value === null) form.setFieldValue('patch', null);
          else form.setFieldValue('patch', value);
          setError('');
        }}
      />
      <Select
        label={t('content_form_type')}
        data={DungeonTypeValues.map((v) => ({
          label: t(`dungeon_type_${v}`, { ns: 'data' }),
          value: v,
        }))}
        maxDropdownHeight={160}
        allowDeselect
        onChange={(value) => {
          if (value === null) form.setFieldValue('type', null);
          else form.setFieldValue('type', DungeonTypeToNumber[value as DungeonType].toString());
          setError('');
        }}
      />
      <Input.Wrapper label={t('content_form_content_title_title')}>
        <Input
          placeholder={t('content_form_content_title_placeholder')}
          onChange={(event) => {
            form.setFieldValue('title', event.target.value.trim());
            setError('');
          }}
        />
      </Input.Wrapper>
      {error !== '' && (
        <Text color="red" size="sm">
          {error}
        </Text>
      )}
      <Group style={{ margin: '20px 0 10px 0' }}>
        <Button
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            if (formValidation()) {
              setQuery(transfromValues(form.values));
              toNext();
            } else {
              setError(t('content_form_error_need_parameter'));
            }
          }}
        >
          {t('button_search', { ns: 'common' })}
        </Button>
      </Group>
    </Stack>
  );
}
