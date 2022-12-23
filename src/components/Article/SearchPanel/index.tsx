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
import { getDefulatProps } from '../../../lib/getDefaultProps';

const useStyle = createStyles((theme) => ({
  formWrapper: {
    width: '100%',
  },
}));

export default function SearchPanel() {
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const { classes } = useStyle();
  const defaultProps = getDefulatProps();
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
      <Button>{t('search_button_text')}</Button>
      <Collapse in={open}>
        <Paper className={classes.formWrapper} withBorder>
          <Select data />
          <Input />
          <Checkbox />
          <Select />
          <Select />
          {
            //TODO
            //JOB Selection
          }
          <NumberInput />
          <Checkbox />
        </Paper>
      </Collapse>
    </Box>
  );
}
