import BigContainer from '@components/base/BigContainer';
import {
  Button,
  Checkbox,
  Group,
  Loader,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { startTransition, useEffect, useState, useTransition } from 'react';
import { useRecoilState, useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';

import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';

import { UseListStateHandlers } from '@mantine/hooks';
import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import RichTextEditor from '@mantine/rte';
import RTEDynamic from '@components/RTEDynamic';
import { closeAllModals, openModal } from '@mantine/modals';
import { Check } from 'tabler-icons-react';
import { ArticleData } from '@type/data/ArticleData';
import { Article } from '../../../../../recoil/Article/index';
import { PhaseStyles } from '../Phase.styles';
import { Language, Language_Value } from '../../../../../type/data/FFXIVInfo';
import { PhaseStack } from '../PhaseStack';

interface Phase2Props {
  render: boolean;
  errorMessages: string[];
  errorMessageHandler: UseListStateHandlers<string>;
}
export default function Phase5({ render, errorMessages, errorMessageHandler }: Phase2Props) {
  const { classes } = PhaseStyles();
  const { t } = useTranslation('article');
  const [desc, setDesc] = useState('');
  const [article, changeArticle] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(Article);
  const [edit, setEdit] = useState(false);
  const phase4Error = {};
  const SelectData = {};
  const changeDescription = () => {
    const newState = { ...article };
    newState.description = desc;
    changeArticle(newState);
  };

  useEffect(() => {
    const quill = document.getElementsByClassName('ql-editor')[0];
    if (quill) quill.setAttribute('style', 'min-height: 40vh');
  });

  return (
    <BigContainer
      style={{ height: render ? 'fit-content' : 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    >
      <PhaseStack title={t('phase4_description')}>
        <RTEDynamic
          value={article.description === desc ? article.description : desc}
          onChange={setDesc}
          controls={[
            ['bold', 'strike', 'italic', 'underline'],
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            ['clean'],
            ['unorderedList', 'orderedList'],
            ['link', 'blockquote', 'code', 'codeBlock'],
            ['alignLeft', 'alignCenter', 'alignRight'],
            ['sup', 'sub'],
          ]}
          style={{ width: '100%' }}
        />
        <Group position="right" style={{ width: '100%', position: 'relative' }}>
          <Group
            spacing="sm"
            style={{
              position: 'absolute',
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{edit ? <Loader variant="dots" size="sm" /> : <Check />}</Text>
            <Text>{edit ? t('phase4_description_editing') : t('phase4_description_saved')}</Text>
          </Group>
          <Button onClick={changeDescription}>{t('phase4_save_button')}</Button>
        </Group>
      </PhaseStack>
    </BigContainer>
  );
}
