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
import { useRecoilState } from 'recoil';

import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';

import JobSelection from '@components/Jobs/JobSelection/JobSelection';
import { UseListStateHandlers } from '@mantine/hooks';

import AddDeleteIcon from '@components/Jobs/Icon/AddDeleteIcon';
import { JobSort } from '@constant/JobSort';
import { Article } from '../../../../../recoil/Article/index';
import { Job, Language, Language_Value } from '../../../../../type/data/FFXIVInfo';
import { PhaseStyles } from '../Phase.styles';
import { PhaseStack } from '../PhaseStack';

interface Phase2Props {
  render: boolean;
  errorMessages: string[];
  errorMessageHandler: UseListStateHandlers<string>;
  articleType: 'recruit' | 'enlist';
}
export default function Phase2({
  render,
  errorMessages,
  errorMessageHandler,
  articleType,
}: Phase2Props) {
  const { classes } = PhaseStyles();
  const { t } = useTranslation(['article', 'data']);
  const [article, changeArticle] = useRecoilState(Article);
  const [language, setLanguage] = useState(false);
  const [useBoxNumber, setUseBoxNumber] = useState(false);
  const [many, setMany] = useState(1);
  const phase2Error = {};
  const SelectData: {
    LanguageData: { label: string; value: Language }[];
    VoiceChatData: { label: string; value: '0' | '1' | '2' }[];
  } = {
    LanguageData: Array.from(Language_Value, (v) => ({
      label: t(`lang_${v}`, { ns: 'data' }),
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
  const onJobIconClick = (job: Job, index: number, partyIndex: number) => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newPartys = [...newArticle.jobs];
      const newJobs = [...newPartys[partyIndex]];
      if (newArticle.jobs[partyIndex][index].includes(job)) {
        const jobArray: Job[] = [];
        newJobs[index].forEach((v) => {
          if (v === job) return;
          jobArray.push(v);
        });
        newJobs[index] = jobArray;
      } else {
        newJobs[index] = [...newJobs[index], job];
      }
      newPartys[partyIndex] = newJobs;
      newArticle.jobs = newPartys;
      return newArticle;
    });
  };
  useEffect(() => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newAvail = Array.from(new Set(article.jobs.flat(3)), (v) => v).sort(
        (a, b) => JobSort[a].sort - JobSort[b].sort
      );
      newArticle.availableJobs = newAvail;
      return newArticle;
    });
  }, [article.jobs.flat(3).length]);
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
  useEffect(() => {
    if (article.isTemporary === false) {
      changeArticle((prev) => {
        const newArticle = { ...prev };
        const newAdditional = { ...newArticle.additional };
        newAdditional.boxNumber = undefined;
        newAdditional.farm = undefined;
        newAdditional.firstTime = undefined;
        newAdditional.heading = undefined;
        newArticle.additional = newAdditional;
        return newArticle;
      });
      setUseBoxNumber(false);
    }
  }, [article.isTemporary]);
  return (
    <BigContainer
      style={{ height: render ? 'fit-content' : 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    >
      <PhaseStack title={t('phase2_member_title')}>
        {article.articleType === 0 ? (
          <>
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
                    <JobSelection
                      jobs={jobs}
                      key={i}
                      onJobIconClick={(value) => {
                        onJobIconClick(value, i, partyNumber);
                      }}
                    />
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
          </>
        ) : (
          <>
            <Stack>
              <Title order={6}>{t('phase2_my_job_selection')}</Title>
              <Group>
                <JobSelection
                  jobs={article.jobs[0][0]}
                  onJobIconClick={(value) => {
                    onJobIconClick(value, 0, 0);
                  }}
                />
              </Group>
            </Stack>
          </>
        )}
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
            label={t(`phase2_${articleType}_isFirstWeekClear_desc`)}
            checked={article.additional.firstWeekClear}
            onChange={(event) => {
              additionalBooleanHander(event, 'firstWeekClear');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_worldFirstRace_title')}>
          <Checkbox
            label={t(`phase2_${articleType}_worldFirstRace_desc`)}
            checked={article.additional.worldFirstRace}
            onChange={(event) => {
              additionalBooleanHander(event, 'worldFirstRace');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isFirstTime_title')}>
          <Checkbox
            disabled={!article.isTemporary}
            label={t(`phase2_${articleType}_isFirstTime_desc`)}
            checked={article.additional.firstTime || false}
            onChange={(event) => {
              additionalBooleanHander(event, 'firstTime');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isHeading_title')}>
          <Checkbox
            disabled={!article.isTemporary}
            label={t(`phase2_${articleType}_isHeading_desc`)}
            checked={article.additional.heading || false}
            onChange={(event) => {
              additionalBooleanHander(event, 'heading');
            }}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase2_isFarm_title')}>
          <Checkbox
            disabled={!article.isTemporary}
            label={t(`phase2_${articleType}_isFarm_desc`)}
            checked={article.additional.farm || false}
            onChange={(event) => {
              additionalBooleanHander(event, 'farm');
            }}
          />
        </HorizontalGroupWithText>
        <Group>
          <Checkbox
            disabled={!article.isTemporary}
            checked={useBoxNumber}
            onChange={() => {
              setUseBoxNumber((prev) => !prev);
              changeArticle((prev) => {
                const newArticle = { ...prev };
                const newAdditional = { ...newArticle.additional };
                newAdditional.boxNumber = !useBoxNumber ? 2 : undefined;
                newArticle.additional = newAdditional;
                return newArticle;
              });
            }}
          ></Checkbox>
          <HorizontalGroupWithText text={t('phase2_box_number_label')}>
            <NumberInput
              disabled={!article.isTemporary || !useBoxNumber}
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
        </Group>
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
