import { DBInstance } from '@type/data/DBInstance';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Input, Modal, ScrollArea, Select, Stack, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { Locale } from '@type/Locale';
import { useTranslation } from 'next-i18next';
import { baseUrl } from '@constant/baseUrl';
import { useElementSize, useResizeObserver, useViewportSize } from '@mantine/hooks';
import { Current } from '../../constant/Current';
import { DungeonType, DungeonTypeValues, DungeonTypeToNumber } from '../../type/data/FFXIVInfo';

interface QueryStringForm {
  version: null | string;
  patch: null | string;
  title: string;
  type: null | string;
}

export default function ContentRetriever() {
  const { locale } = useRouter();
  const { t } = useTranslation('article');
  const [selected, setSelected] = useState<DBInstance | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('&');
  const [data, setData] = useState<{ [key: string]: DBInstance } | null>(null);
  const [loading, setLoading] = useState(false);

  const [height, setHeight] = useState(0);
  const iRef = useRef<HTMLDivElement>(null);
  const fRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(iRef);
    if (iRef.current && fRef.current) {
      console.log(fRef.current.offsetHeight);
      console.log(iRef.current.offsetHeight);
      setHeight(fRef.current.offsetHeight - iRef.current.offsetHeight - 50);
    }
  }, [iRef, fRef, open]);

  const form = useForm<QueryStringForm>({
    initialValues: {
      version: null,
      patch: null,
      title: '',
      type: null,
    },
  });
  const transfromValues = (values: QueryStringForm) => {
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
  useEffect(() => {
    setQuery(transfromValues(form.values));
  }, [form.values]);
  useEffect(() => {
    if (query.length <= 1) return;
    const queryfunction = async () => {
      setLoading(true);
      try {
        const response = await (await fetch(`${baseUrl}/api/contents${query}`)).json();
        setData(response);
        console.log(data);
      } finally {
        setLoading(false);
      }
    };
    queryfunction();
  }, [query]);
  return (
    <>
      <Input.Wrapper
        label={t('content_form_label')}
        placeholder={t('content_form_placeholder')}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <Input
          component="button"
          value={
            selected === null
              ? t('content_form_placeholder')
              : selected.title[(locale || 'en') as Locale]
          }
          onClick={(e) => {
            e.preventDefault();
            () => {
              setOpen((prev) => !prev);
            };
          }}
          style={{ cursor: 'pointer' }}
        />
      </Input.Wrapper>
      <Modal
        opened={open}
        onClose={() => {
          form.reset();
          setOpen(false);
          setData(null);
        }}
        centered
        title={<Title order={6}>{t('content_form_title')}</Title>}
        styles={(theme) => ({
          modal: {
            height: '90vh',
          },
          body: {
            height: '100%',
          },
        })}
        overflow="inside"
      >
        <Stack style={{ height: '100%', overflow: 'hidden' }} ref={fRef}>
          <Stack ref={iRef}>
            <Select
              data={Current.version.map((v) => v.toString())}
              label={t('content_form_version')}
              unselectable="on"
              onChange={(value) => {
                form.setFieldValue('version', value);
              }}
            />
            <Select
              data={Current.patch.map((v) => v.toString())}
              label={t('content_form_patch')}
              unselectable="on"
              onChange={(value) => {
                form.setFieldValue('patch', value);
              }}
            />
            <Select
              label={t('content_form_type')}
              data={DungeonTypeValues.map((v) => ({
                label: t(`dungeon_type_${v}`, { ns: 'data' }),
                value: v,
              }))}
              unselectable="on"
              onChange={(value) => {
                form.setFieldValue('type', DungeonTypeToNumber[value as DungeonType].toString());
              }}
            />
            <Input.Wrapper label={t('content_form_content_title_title')}>
              <Input
                placeholder={t('content_form_content_title_placeholder')}
                onChange={(event) => {
                  form.setFieldValue('title', event.target.value.trim());
                }}
              />
            </Input.Wrapper>
          </Stack>
          <Input.Wrapper label={t('content_select')}>
            <ScrollArea style={{ height }}>
              <Stack>
                {data === null ? (
                  <>{t('content_data_is_null')}</>
                ) : (
                  Object.keys(data).map((v) => (
                    <Button key={v}>{data[v].title[(locale as Locale) || 'en']}</Button>
                  ))
                )}
              </Stack>
            </ScrollArea>
          </Input.Wrapper>
        </Stack>
      </Modal>
    </>
  );
}
