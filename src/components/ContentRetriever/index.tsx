import { baseUrl } from '@constant/baseUrl';
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import { Input, Modal, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContentQueryString } from '@type/QueryString';
import { DBInstance } from '@type/data/DBInstance';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { HTMLAttributes, useEffect, useState } from 'react';
import InstanceContent, { EmptyInstanceContent } from '../InstanceContent/InstanceContent';
import Searcher from './Searcher';
import Selector from './Selector';

export interface ContentRetrieverProps extends HTMLAttributes<HTMLDivElement> {
  returnSelected: (value: number) => void;
}

export default function ContentRetriever({ returnSelected, ...etc }: ContentRetrieverProps) {
  const { t } = useTranslation('common');
  const [selected, setSelected] = useState<DBInstance | null>(null);

  const [open, setOpen] = useState(false);
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, 150);
  const [view, setView] = useState(0);
  useEffect(() => {
    embla?.scrollTo(view);
  }, [view, embla]);

  const [query, setQuery] = useState('');
  const [data, setData] = useState<{ [key: string]: DBInstance } | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<ContentQueryString>({
    initialValues: {
      version: null,
      patch: null,
      title: '',
      type: null,
    },
  });
  useEffect(() => {
    if (query.length <= 1) return;
    const queryfunction = async () => {
      setLoading(true);
      try {
        const response = await (await fetch(`${baseUrl}/api/contents${query}`)).json();
        setData(response);
      } finally {
        setLoading(false);
      }
    };
    queryfunction();
  }, [query]);
  return (
    <>
      <Input.Wrapper
        style={{ pointerEvents: 'none' }}
        label={t('content_form_label')}
        placeholder={t('content_form_placeholder')}
        {...etc}
      >
        {selected === null ? (
          <EmptyInstanceContent
            style={{ pointerEvents: 'all' }}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
        ) : (
          <InstanceContent
            data={selected}
            style={{ pointerEvents: 'all' }}
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
        )}
      </Input.Wrapper>

      <Modal
        size={378}
        opened={open}
        onClose={() => {
          form.reset();
          setOpen(false);
          setData(null);
          setQuery('');
          setView(0);
        }}
        centered
        title={<Title order={6}>{t('content_form_title')}</Title>}
        overflow="inside"
        styles={(theme) => ({
          body: {
            overflow: 'visible',
          },
        })}
      >
        <Carousel
          slideSize="340px"
          slideGap="lg"
          sx={() => ({ maxHeight: '90vh', width: '340px', overflow: 'visible' })}
          styles={(theme) => ({
            viewport: {
              overflow: 'hidden visible',
            },
          })}
          withControls={false}
          getEmblaApi={setEmbla}
          draggable={false}
        >
          <Carousel.Slide>
            <Searcher
              form={form}
              setQuery={setQuery}
              toNext={() => {
                setView((v) => (v >= 1 ? v : v + 1));
              }}
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <Selector
              render={view === 1}
              loading={loading}
              data={data}
              toBack={() => {
                setView((v) => (v <= 0 ? v : v - 1));
              }}
              returnSelected={returnSelected}
              setSelected={setSelected}
              close={() => {
                form.reset();
                setOpen(false);
                setData(null);
                setQuery('');
                setView(0);
              }}
            />
          </Carousel.Slide>
        </Carousel>
      </Modal>
    </>
  );
}
