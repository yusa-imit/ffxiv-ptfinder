import BigContainer from '@components/base/BigContainer';
import {
  Checkbox,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';

import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';

import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { UseListStateHandlers } from '@mantine/hooks';

import AddDeleteIcon from '@components/Jobs/Icon/AddDeleteIcon';
import { Article } from '../../../../../recoil/Article/index';
import { Language, Language_Value } from '../../../../../type/data/FFXIVInfo';
import { PhaseStyles } from '../Phase.styles';
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
  const [many, setMany] = useState(1);
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
  const additionalBooleanHander = (
    event: ChangeEvent<HTMLInputElement>,
    key: 'heading' | 'firstTime' | 'worldFirstRace' | 'farm' | 'firstWeekClear'
  ) => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newAdditional = { ...newArticle.additional };
      newAdditional[key] = event.currentTarget.checked;
      newArticle.additional = newAdditional;
      return newArticle;
    });
  };
  const addDeleteButtonHandlerForJobs = (type: 'add' | 'delete', partyNumber: number) => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newParty = [...newArticle.jobs];
      const newJobs = [...newParty[partyNumber]];
      if (type === 'add') newJobs.push([]);
      else newJobs.pop();
      newParty[partyNumber] = newJobs;
      newArticle.jobs = newParty;
      return newArticle;
    });
  };
  const addDeleteButtonHandlerForParty = (type: 'add' | 'delete') => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newJobs = [...newArticle.jobs];
      if (type === 'add') newJobs.push([[]]);
      else newJobs.pop();
      newArticle.jobs = newJobs;
      return newArticle;
    });
  };
  // on number of memeber changes.
  useEffect(() => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newJobs = [...article.jobs];
      let diff = Math.abs(article.jobs.length - many);
      while (diff > 0) {
        if (article.jobs.length < many) {
          newJobs.push([[]]);
        } else {
          newJobs.pop();
        }
        newArticle.jobs = newJobs;
        diff--;
      }
      return newArticle;
    });
  }, [many]);
  // On language restriction checkbox change
  useEffect(() => {
    // if check resolved, then set data into undefined.
    if (!language) {
      changeArticle((prev) => {
        const newArticle = { ...prev };
        newArticle.specifyUserLanguage = undefined;
        return newArticle;
      });
      return;
    }
    // If checked
    // if language restriction is already specified, return
    if (article.specifyUserLanguage !== undefined) return;
    // else change into user language.
    changeArticle((prev) => {
      const newArticle = { ...prev };
      newArticle.specifyUserLanguage = [newArticle.language];
      return newArticle;
    });
  }, [language]);
  return (
    <BigContainer
      style={{ height: render ? 'fit-content' : 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    >
      <PhaseStack title={t('phase2_member_title')}>
        {article.type === 'alliance' && (
          <HorizontalGroupWithText text={t('phase2_add_party')}>
            <Text size="sm" weight={500}>
              {`${t('phase2_current_maximum')} : 3`}
            </Text>
            {article.jobs.length !== 3 && (
              <AddDeleteIcon
                type="add"
                label={t('phase2_add_party_add_tooltip')}
                onClick={() => {
                  addDeleteButtonHandlerForParty('add');
                }}
              />
            )}
            {article.jobs.length !== 1 && (
              <AddDeleteIcon
                type="delete"
                label={t('phase2_add_party_delete_tooltip')}
                onClick={() => {
                  addDeleteButtonHandlerForParty('delete');
                }}
              />
            )}
          </HorizontalGroupWithText>
        )}

        {article.jobs.map((party, partyNumber) => (
          <Stack key={partyNumber}>
            <Title order={6}>
              {`${t('phase2_job_selection')}${
                article.type !== 'alliance'
                  ? ''
                  : `: ${t('phase2_job_selection_addition')} ${partyNumber + 1}`
              }`}
            </Title>
            <Group>
              {party.map((jobs, i) => (
                <JobSelection jobs={jobs} key={i} index={i} partyNumber={partyNumber} />
              ))}
              {party.length < 8 && (
                <AddDeleteIcon
                  type="add"
                  label={t('phase2_job_add_tooltip')}
                  onClick={() => {
                    addDeleteButtonHandlerForJobs('add', partyNumber);
                  }}
                />
              )}
              {party.length !== 1 && (
                <AddDeleteIcon
                  type="delete"
                  label={t('phase2_job_delete_tooltip')}
                  onClick={() => {
                    addDeleteButtonHandlerForJobs('delete', partyNumber);
                  }}
                />
              )}
            </Group>
          </Stack>
        ))}
      </PhaseStack>
      <PhaseStack title={t('phase2_static_title')}>
        <HorizontalGroupWithText text={t('phase2_minimum_week_label')}>
          <NumberInput
            defaultValue={1}
            min={1}
            onChange={(value) => {
              changeArticle((prev) => {
                const newArticle = { ...prev };
                newArticle.minimumWeek = value as number;
                return newArticle;
              });
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_voicechat_title')}>
          <Select
            data={SelectData.VoiceChatData}
            value={String(article.voiceChat)}
            onChange={(value) => {
              changeArticle((prev) => {
                const newArticle = { ...prev };
                newArticle.voiceChat = Number(value as '0' | '1' | '2') as 0 | 1 | 2;
                return newArticle;
              });
            }}
            transition="pop"
            transitionDuration={100}
            transitionTimingFunction="ease"
            withinPortal
          />
        </HorizontalGroupWithText>
      </PhaseStack>
      <PhaseStack
        title={t('phase2_additional_title')}
        titleHelp={t('phase2_additional_title_help')}
      >
        <HorizontalGroupWithText text={t('phase2_isFirstWeekClear_title')}>
          <Checkbox
            label={t('phase2_isFirstWeekClear_desc')}
            checked={article.additional.firstWeekClear}
            onChange={(event) => {
              additionalBooleanHander(event, 'firstWeekClear');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_worldFirstRace_title')}>
          <Checkbox
            label={t('phase2_worldFirstRace_desc')}
            checked={article.additional.worldFirstRace}
            onChange={(event) => {
              additionalBooleanHander(event, 'worldFirstRace');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isFirstTime_title')}>
          <Checkbox
            disabled={!article.isTemporary}
            label={t('phase2_isFirstTime_desc')}
            checked={article.additional.firstTime}
            onChange={(event) => {
              additionalBooleanHander(event, 'firstTime');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isHeading_title')}>
          <Checkbox
            disabled={!article.isTemporary}
            label={t('phase2_isHeading_desc')}
            checked={article.additional.heading}
            onChange={(event) => {
              additionalBooleanHander(event, 'heading');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isFarm_title')}>
          <Checkbox
            disabled={!article.isTemporary}
            label={t('phase2_isFarm_desc')}
            checked={article.additional.farm}
            onChange={(event) => {
              additionalBooleanHander(event, 'farm');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_box_number_label')}>
          <NumberInput
            disabled={!article.isTemporary}
            defaultValue={2}
            max={2}
            min={0}
            onChange={(value) => {
              changeArticle((prev) => {
                const newArticle = { ...prev };
                const newAdditional = { ...newArticle.additional };
                newAdditional.boxNumber = value as 0 | 1 | 2;
                newArticle.additional = newAdditional;
                return newArticle;
              });
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
            checked={language}
            onChange={(event) => {
              setLanguage(event.currentTarget.checked);
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_language_restriction_select')}>
          <MultiSelect
            data={SelectData.LanguageData}
            value={article.specifyUserLanguage}
            onChange={(value) => {
              changeArticle((prev) => {
                const newArticle = { ...prev };
                newArticle.specifyUserLanguage = value as Language[];
                return newArticle;
              });
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
