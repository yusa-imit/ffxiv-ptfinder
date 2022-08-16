import BigContainer from '@components/base/BigContainer';
import {
  Checkbox,
  Group,
  JsonInput,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { WidthLimitedTooltip } from '@components/WidthLimitedTooltip';
import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import HelpIcon from '@components/icons/HelpIcon';
import { UseListStateHandlers } from '@mantine/hooks';
import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { Article } from '../../../../../recoil/Article/index';
import { PhaseStyles } from '../Phase.styles';
import {
  DungeonType,
  Region,
  Region_Value,
  Language,
  Language_Value,
} from '../../../../../type/data/FFXIVInfo';
import { PhaseStack } from '../PhaseStack';

const DEV_Game_Version = [
  { value: '6', label: '6' },
  { value: '5', label: '5' },
  { value: '4', label: '4' },
  { value: '3', label: '3' },
  { value: '2', label: '2' },
];

const Voice_Chat = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];

interface Phase2Props {
  errorMessages: string[];
  errorMessageHandler: UseListStateHandlers<string>;
}
export default function Phase2({ errorMessages, errorMessageHandler }: Phase2Props) {
  const route = useRouter();
  const { classes } = PhaseStyles();
  const { t } = useTranslation('article');
  const [titleCheck, setTitleCheck] = useState(false);
  const [article, changeArticle] = useRecoilState(Article);
  const [language, setLanguage] = useState(false);
  const phase1Error = {
    titleErrorListHandler: () => {
      if (titleCheck) {
        errorMessageHandler.filter((v) => v !== t('phase1_title_necessary'));
        return;
      }
      if (!errorMessages.includes(t('phase1_title_necessary'))) {
        errorMessageHandler.append(t('phase1_title_necessary'));
      }
    },
    getTitleErrorLabelText: () => {
      if (titleCheck) {
        return false;
      }
      return t('phase1_title_necessary');
    },
  };
  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newArticle = { ...article };
    newArticle.title = event.currentTarget.value;
    changeArticle(newArticle);
    if (event.currentTarget.value !== '') {
      setTitleCheck(true);
    } else {
      setTitleCheck(false);
    }
  };
  const SelectData: {
    DungeonTypeData: { label: string; value: DungeonType }[];
    RegionData: { label: string; value: Region }[];
    LanguageData: { label: string; value: Language }[];
    VoiceChatData: { label: string; value: '0' | '1' | '2' }[];
  } = {
    DungeonTypeData: [
      { label: t('phase1_dungeon_type_raid'), value: 'raid' },
      { label: t('phase1_dungeon_type_extreme'), value: 'extreme' },
      { label: t('phase1_dungeon_type_ultimate'), value: 'ultimate' },
      { label: t('phase1_dungeon_type_alliance'), value: 'alliance' },
      { label: t('phase1_dungeon_type_etc'), value: 'etc' },
    ],
    RegionData: Array.from(Region_Value, (v) => ({ label: t(`phase1_region_${v}`), value: v })),
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
  useEffect(() => {
    if (article.specifyUserLanguage !== undefined) return;
    const newArticle = { ...article };
    newArticle.specifyUserLanguage = newArticle.language;
    changeArticle(newArticle);
  }, [language]);
  return (
    <BigContainer
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
            value={article.specifyUserLanguage === undefined ? 'JP' : article.specifyUserLanguage}
            onChange={(value) => {
              const newArticle = { ...article };
              newArticle.specifyUserLanguage = value === null ? 'JP' : (value as Language);
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

/**
  <Transition
    transition={!increasing ? 'slide-right' : 'slide-left'}
    mounted={current === 0}
    duration={500}
    timingFunction="ease"
  >
    {(styles) => (
      
    )}
  </Transition> */
