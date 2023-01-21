import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { SearchIndexContext } from '@type/SearchIndex';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Group,
  Input,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ContentRetriever from '@components/ContentRetriever';
import { getNumberedArticleType } from '@lib/getArticleType';
import { Region } from '@type/data/FFXIVInfo';
import { getSearchUrlParams } from '@lib/searchUrlParam';
import { getDefulatProps } from '../../../lib/getDefaultProps';
import { Node } from './PanelNodeGenerator';
import { getArticleType } from '../../../lib/getArticleType';
import { Language } from '../../../type/data/FFXIVInfo';
import { defaultSearchIndexContext } from '../../../constant/defaultSearchIndexContext';

const useStyle = createStyles((theme) => ({
  formWrapper: {
    width: '100%',
    padding: theme.spacing.md,
  },
  formButton: {
    width: '100%',
  },
}));

interface SearchPanelProps {
  initialFormValue?: SearchIndexContext;
}

export default function SearchPanel({ initialFormValue }: SearchPanelProps) {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const { classes } = useStyle();
  const defaultProps = getDefulatProps();
  const router = useRouter();
  const form = useForm<SearchIndexContext>({
    initialValues: initialFormValue
      ? Object.assign(defaultProps, initialFormValue)
      : Object.assign(defaultSearchIndexContext, defaultProps),
  });
  return (
    <Box>
      <Button
        className={classes.formButton}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {t('search_button_text')}
      </Button>
      <Collapse in={open}>
        <form
          onSubmit={form.onSubmit((values) => {
            router.push(getSearchUrlParams(values));
          })}
        >
          <Paper className={classes.formWrapper} withBorder>
            <Stack align="flex-start">
              <Node.ArticleType
                value={getArticleType(form.values.articleType)}
                onChange={(value) => {
                  form.setFieldValue(
                    'articleType',
                    getNumberedArticleType(value as 'enlist' | 'recruit')
                  );
                }}
              />
              <Node.Title {...form.getInputProps('title')} />
              <Node.IsTemporary {...form.getInputProps('isTemporary', { type: 'checkbox' })} />
              <ContentRetriever
                returnSelected={(value) => {
                  form.setFieldValue('content', value);
                }}
              />
              <Node.MinimumWeek
                value={form.values.minimumWeek}
                onChange={(value) => {
                  if (value === undefined) {
                    form.setFieldValue('minimumWeek', 0);
                  } else if (value < 0) {
                    form.setFieldValue('minimumWeek', 0);
                  } else form.setFieldValue('minimumWeek', value);
                }}
              />
              <Node.VoiceChat
                value={form.values.voiceChat?.map((v) => v.toString())}
                onChange={(value) => {
                  form.setFieldValue('voiceChat', value.map((v) => Number(v)) as (0 | 1 | 2)[]);
                }}
              />
              <Node.Region
                value={form.values.region}
                onChange={(value) => {
                  if (value === null) {
                    form.setFieldValue('region', getDefulatProps().region);
                  } else form.setFieldValue('region', value as Region);
                }}
              />
              <Node.Language
                value={form.values.language}
                onChange={(value) => {
                  if (value === null) {
                    form.setFieldValue('language', getDefulatProps().language);
                  } else form.setFieldValue('language', value as Language);
                }}
              />

              <Input.Wrapper label={t('search_detail_group')}>
                <Group>
                  <Node.Heading
                    disabled={form.values.isTemporary === false}
                    {...form.getInputProps('heading', { type: 'checkbox' })}
                  />
                  <Node.FirstTime
                    disabled={form.values.isTemporary === false}
                    {...form.getInputProps('firstTime', { type: 'checkbox' })}
                  />
                  <Node.Farm
                    disabled={form.values.isTemporary === false}
                    {...form.getInputProps('farm', { type: 'checkbox' })}
                  />
                  <Node.FirstWeekClear
                    disabled={form.values.isTemporary === true}
                    {...form.getInputProps('firstWeekClear', { type: 'checkbox' })}
                  />
                  <Node.WorldFirstRace
                    disabled={form.values.isTemporary === true}
                    {...form.getInputProps('worldFirstRace', { type: 'checkbox' })}
                  />
                </Group>
              </Input.Wrapper>

              <Node.BoxNumber
                disabled={form.values.isTemporary !== true}
                value={form.values.boxNumber}
                onChange={(value) => {
                  if (value === undefined) {
                    form.setFieldValue('boxNumber', undefined);
                  } else if (value >= 3) {
                    form.setFieldValue('boxNumber', 2);
                  } else if (value < 0) {
                    form.setFieldValue('boxNumber', 0);
                  } else {
                    form.setFieldValue('boxNumber', value as 0 | 1 | 2);
                  }
                }}
              />
              <Button type="submit">{t('button_confirm_search')}</Button>
            </Stack>
          </Paper>
        </form>
      </Collapse>
    </Box>
  );
}
