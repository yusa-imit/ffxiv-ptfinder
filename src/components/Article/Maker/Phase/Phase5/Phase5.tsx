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
import ArticleView from '@components/Article/ArticleView/ArticleView';
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
  const [article, changeArticle] = useRecoilState(Article);
  const [edit, setEdit] = useState(false);
  const phase5Error = {};
  const SelectData = {};

  return (
    <BigContainer
      style={{ height: render ? 'fit-content' : 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    >
      <ArticleView article={article} />
    </BigContainer>
  );
}
