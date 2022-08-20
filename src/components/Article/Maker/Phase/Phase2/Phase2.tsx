import BigContainer from '@components/base/BigContainer';
import { Checkbox, Group, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';

import { UseListStateHandlers } from '@mantine/hooks';
import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { Article } from '../../../../../recoil/Article/index';
import { PhaseStyles } from '../Phase.styles';
import { Language, Language_Value } from '../../../../../type/data/FFXIVInfo';
import { PhaseStack } from '../PhaseStack';

interface Phase2Props {
  render: boolean;
  errorMessages: string[];
  errorMessageHandler: UseListStateHandlers<string>;
}
export default function Phase2({ render, errorMessages, errorMessageHandler }: Phase2Props) {
  const { classes } = PhaseStyles();
  const { t } = useTranslation('article');
  const [article, changeArticle] = useRecoilState(Article);
  const [language, setLanguage] = useState(false);
  const phase2Error = {};
  const SelectData: {
    LanguageData: { label: string; value: Language }[];
    VoiceChatData: { label: string; value: '0' | '1' | '2' }[];
  } = {
    LanguageData: Array.from(Language_Value, (v) => ({
      label: t(`phase1_language_${v}`),
      value: v,
    })),
    VoiceChatData: [
      { label: t('phase2_voicechat_value_0'), value: '0' },
      { label: t('phase2_voicechat_value_1'), value: '1' },
      { label: t('phase2_voicechat_value_2'), value: '2' },
    ],
  };
  // on number of memeber changes.
  useEffect(() => {
    const newArticle = { ...article };
    const newJobs = [...article.jobs];
    let diff = Math.abs(article.jobs.length - article.many);
    while (diff > 0) {
      if (article.jobs.length < article.many) {
        newJobs.push([]);
      } else {
        newJobs.pop();
      }
      newArticle.jobs = newJobs;
      changeArticle(newArticle);
      diff--;
    }
  }, [article.many]);
  // On language restriction checkbox change
  useEffect(() => {
    const newArticle = { ...article };
    // if check resolved, then set data into undefined.
    if (!language) {
      newArticle.specifyUserLanguage = undefined;
      changeArticle(newArticle);
      return;
    }
    // If checked
    // if language restriction is already specified, return
    if (article.specifyUserLanguage !== undefined) return;
    // else change into user language.
    newArticle.specifyUserLanguage = newArticle.language;
    changeArticle(newArticle);
  }, [language]);
  return (
    <BigContainer
      style={{ height: render ? 'fit-content' : 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    >
      <PhaseStack title={t('phase2_member_title')}>
        <HorizontalGroupWithText text={t('phase2_many_label')}>
          <NumberInput
            defaultValue={1}
            min={1}
            max={8}
            onChange={(value) => {
              const newArticle = { ...article };
              newArticle.many = value as number;
              changeArticle(newArticle);
            }}
          />
        </HorizontalGroupWithText>
        <Stack>
          <Text size="sm" weight={500}>
            {t('phase2_job_selection')}
          </Text>
          <Group>
            {article.jobs.map((jobs, i) => (
              <JobSelection jobs={jobs} key={i} index={i} />
            ))}
          </Group>
        </Stack>
      </PhaseStack>
      <PhaseStack title={t('phase2_static_title')}>
        <HorizontalGroupWithText text={t('phase2_minimum_week_label')}>
          <NumberInput
            defaultValue={1}
            min={1}
            onChange={(value) => {
              const newArticle = { ...article };
              newArticle.minimumWeek = value as number;
              changeArticle(newArticle);
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_farm_title')}>
          <Checkbox
            label={t('phase2_farm_desc')}
            styles={{ label: { fontWeight: 500 } }}
            checked={article.farm}
            onChange={(event) => {
              const newArticle = { ...article };
              newArticle.farm = event.currentTarget.checked;
              changeArticle(newArticle);
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_voicechat_title')}>
          <Select
            data={SelectData.VoiceChatData}
            value={String(article.voiceChat)}
            onChange={(value) => {
              const newArticle = { ...article };
              newArticle.voiceChat = Number(value as '0' | '1' | '2') as 0 | 1 | 2;
              changeArticle(newArticle);
            }}
            transition="pop"
            transitionDuration={100}
            transitionTimingFunction="ease"
            withinPortal
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isFisrWeekClear_title')}>
          <Checkbox
            label={t('phase2_isFirstWeekClear_desc')}
            styles={{ label: { fontWeight: 500 } }}
            checked={article.firstWeekClear}
            onChange={(event) => {
              const newArticle = { ...article };
              newArticle.firstWeekClear = event.currentTarget.checked;
              changeArticle(newArticle);
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_worldFisrtRace_title')}>
          <Checkbox
            label={t('phase2_worldFirstRace_desc')}
            styles={{ label: { fontWeight: 500 } }}
            checked={article.worldFirstRace}
            onChange={(event) => {
              const newArticle = { ...article };
              newArticle.worldFirstRace = event.currentTarget.checked;
              changeArticle(newArticle);
            }}
          />
        </HorizontalGroupWithText>
      </PhaseStack>
      <PhaseStack
        title={t('phase2_language_restriction_title')}
        titleHelp={t('phase2_language_restriction_tooltip')}
      >
        <HorizontalGroupWithText text={t('phase2_language_restriction_set')}>
          <Checkbox
            label={t('phase2_language_restriction_set_desc')}
            styles={{ label: { fontWeight: 500 } }}
            checked={language}
            onChange={(event) => {
              setLanguage(event.currentTarget.checked);
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_language_restriction_select')}>
          <Select
            data={SelectData.LanguageData}
            value={article.specifyUserLanguage}
            onChange={(value) => {
              const newArticle = { ...article };
              newArticle.specifyUserLanguage = value === null ? undefined : (value as Language);
              changeArticle(newArticle);
            }}
            transition="pop"
            transitionDuration={100}
            transitionTimingFunction="ease"
            withinPortal
            disabled={!language}
          />
        </HorizontalGroupWithText>
      </PhaseStack>
    </BigContainer>
  );
}
