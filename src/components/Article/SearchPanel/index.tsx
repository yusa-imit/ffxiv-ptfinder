import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { SearchIndexContext } from '@type/SearchIndex';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Input,
  NumberInput,
  Paper,
  Select,
  createStyles,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ContentRetriever from '@components/ContentRetriever';
import { getDefulatProps } from '../../../lib/getDefaultProps';
import { PanelNodeGenerator } from './PanelNodeGenerator';

const useStyle = createStyles((theme) => ({
  formWrapper: {
    width: '100%',
    padding: theme.spacing.md,
  },
}));

export default function SearchPanel() {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const { classes } = useStyle();
  const defaultProps = getDefulatProps();
  const Node = PanelNodeGenerator();
  const form = useForm<SearchIndexContext>({
    initialValues: {
      articleType: 0,
      title: '',
      isTemporary: false,
      content: -1,
      availableJobs: [],
      minimumWeek: 0,
      voiceChat: [],
      region: defaultProps.region,
      language: defaultProps.language,
      heading: undefined,
      firstTime: undefined,
      firstWeekClear: undefined,
      worldFirstRace: undefined,
      farm: undefined,
      boxNumber: undefined,
    },
  });
  return (
    <Box>
      <Button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        {t('search_button_text')}
      </Button>
      <Collapse in={open}>
        <Paper className={classes.formWrapper} withBorder>
          <Node.ArticleType />
          <Node.Title />
          <Node.IsTemporary />
          <ContentRetriever
            returnSelected={(value) => {
              form.setFieldValue('content', value);
            }}
          />
          <Node.MinimumWeek />
          <Node.VoiceChat />
          <Node.Region />
          <Node.Language />
          <Node.Heading />
          <Node.FirstTime />
          <Node.FirstWeekClear />
          <Node.WorldFirstRace />
          <Node.Farm />
          <Node.BoxNumber />
        </Paper>
      </Collapse>
    </Box>
  );
}
