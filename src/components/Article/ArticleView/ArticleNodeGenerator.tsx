import JobIcon from '@components/Jobs/Icon/JobIcon';
import { RoleIconDiv } from '@components/Jobs/Icon/RoleIconDiv';
import { BadgeColor } from '@constant/defaultBadgeColors';
import TimeFunctions from '@lib/TimeFunctions';
import { timezone } from '@lib/timezone';
import {
  Title,
  Text,
  Group,
  Stack,
  Tooltip,
  Box,
  Table,
  Center,
  Paper,
  TypographyStylesProvider,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';
import { World } from 'tabler-icons-react';
import { ArticleData, ArticleSummary } from '../../../type/data/ArticleData';
import ArticleBadge from './ArticleBadge';
import SubTitle from './SubTitle';

interface ArticleViewNode {
  title: ReactNode;
  default: {
    isTemporary: ReactNode;
    dungeon: ReactNode;
    props: ReactNode;
  };
  jobs: {
    availables: ReactNode;
    position: ReactNode;
  };
  details: {
    essentials: ReactNode;
    additionals: ReactNode;
    languageRestrictions: ReactNode;
  };
  schedule?: {
    timezone: ReactNode;
    summary: ReactNode;
  };
  description?: ReactNode;
}
/**
 * ArticleView Component's Node generator. Generates detailed components of component 'ArticleView'
 * @param article ArticleData
 * @param type 'full' for full-sized view, 'compact' for compact mode
 * @returns Record<Section_Name_Of_Article_View, ReactNode>
 */
export default function ArticleNodeGenerator(
  article: ArticleData | ArticleSummary,
  type: 'full' | 'compact' = 'full'
): ArticleViewNode {
  const { t } = useTranslation(['article_view', 'data']);
  return {
    title: (
      <Title order={type === 'full' ? 1 : 3} style={{ wordBreak: 'break-word', lineBreak: 'auto' }}>
        {article.title}
      </Title>
    ),

    default: {
      isTemporary: article.isTemporary && (
        <Group>
          <ArticleBadge color={BadgeColor.isTemporary}>
            {t('section_default_isTemporary_badge')}
          </ArticleBadge>
        </Group>
      ),
      dungeon: (
        <Group>
          <ArticleBadge>DEV_Unending Coil of Bahamut (Extreme)</ArticleBadge>
        </Group>
      ),
      props:
        type === 'full' ? (
          <Group spacing={2}>
            <ArticleBadge color={BadgeColor.region}>{`${t('section_default_region')} : ${t(
              `region_${article.region}`,
              {
                ns: 'data',
              }
            )}`}</ArticleBadge>
            <ArticleBadge color={BadgeColor.language}>{`${t('section_default_language')} : ${`${t(
              `lang_${article.language}`,
              {
                ns: 'data',
              }
            )}`}`}</ArticleBadge>
          </Group>
        ) : (
          <Group spacing={2}>
            <ArticleBadge color={BadgeColor.region} tooltip={t('section_default_region')}>
              <Group
                sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
                spacing={2}
              >
                <World size={16} />
                {`${t(`region_${article.region}_alias`, {
                  ns: 'data',
                })}`}
              </Group>
            </ArticleBadge>
            <ArticleBadge
              color={BadgeColor.language}
              tooltip={t('section_default_language')}
            >{`${`${t(`lang_${article.language}`, {
              ns: 'data',
            })}`}`}</ArticleBadge>
          </Group>
        ),
    },
    jobs: {
      availables:
        !article.availableJobs || article.availableJobs.length === 0 ? (
          <Text>{t('section_jobs_job_not_specified')} </Text>
        ) : (
          <Group spacing="xs">
            {article.availableJobs.map((v) => (
              <JobIcon job={v} isChecked={false} disableHoverStyle key={v} />
            ))}
          </Group>
        ),
      position: (
        <Stack>
          {article.jobs.map((party, partyIndex) => (
            <Group key={partyIndex}>
              {party.map((position, positionIndex) => (
                <Tooltip
                  label={
                    position.length === 0
                      ? t('section_jobs_job_not_specified')
                      : position.map((v) => t(`jobs_${v}`, { ns: 'data' })).join(', ')
                  }
                  key={positionIndex}
                >
                  <Box>
                    <RoleIconDiv jobs={position} disableClick />
                  </Box>
                </Tooltip>
              ))}
            </Group>
          ))}
        </Stack>
      ),
    },
    details: {
      essentials: (
        <Group spacing={2}>
          <ArticleBadge color={BadgeColor.minimumWeek}>{`${t(
            'section_details_essentials_minimum_week'
          )} : ${article.minimumWeek}`}</ArticleBadge>
          <ArticleBadge color={BadgeColor.voiceChat}>
            {t(`section_details_essentials_voice_chat_${article.voiceChat}`)}
          </ArticleBadge>
        </Group>
      ),
      additionals: (
        <Group spacing={2}>
          {!article.additional.boxNumber &&
            !article.additional.farm &&
            !article.additional.firstTime &&
            !article.additional.firstWeekClear &&
            !article.additional.heading &&
            !article.additional.worldFirstRace && (
              <Text>{t('section_details_no_detail_provided')}</Text>
            )}
          {article.additional.firstWeekClear && (
            <ArticleBadge color={BadgeColor.fwc}>
              {t('section_details_first_week_clear')}
            </ArticleBadge>
          )}
          {article.additional.worldFirstRace && (
            <ArticleBadge color={BadgeColor.wfr}>
              {t('section_details_world_first_race')}
            </ArticleBadge>
          )}
          {article.additional.farm && (
            <ArticleBadge color={BadgeColor.farm}>{t('section_details_farm')}</ArticleBadge>
          )}
          {article.additional.firstTime && (
            <ArticleBadge color={BadgeColor.firstTime}>
              {t('section_details_first_time')}
            </ArticleBadge>
          )}
          {article.additional.heading && (
            <ArticleBadge color={BadgeColor.heading}>{t('section_details_heading')}</ArticleBadge>
          )}
          {article.additional.boxNumber && (
            <ArticleBadge color={BadgeColor.box}>{`${t('section_details_boxNumber')}: ${
              article.additional.boxNumber
            }`}</ArticleBadge>
          )}
        </Group>
      ),
      languageRestrictions: (
        <Group spacing={2}>
          {article.specifyUserLanguage && article.specifyUserLanguage.length !== 0 ? (
            article.specifyUserLanguage.map((language) => (
              <ArticleBadge color={BadgeColor.langRestriction}>
                {t(`lang_${language}`, { ns: 'data' })}
              </ArticleBadge>
            ))
          ) : (
            <Text>{t('section_details_no_language_restrictions_provided')}</Text>
          )}
        </Group>
      ),
    },
    schedule: !Object.hasOwn(article, 'schedule')
      ? undefined
      : {
          timezone: article.timezone && (
            <Group>
              <ArticleBadge
                color={BadgeColor.timezone}
                tooltip={timezone(article.timezone).displayName}
              >
                {timezone(article.timezone).Abbreviation}
              </ArticleBadge>
            </Group>
          ),
          summary: (article as ArticleData).schedule.writtenInDescription ? (
            <Text>{t('section_schedules_writtenInDescription')}</Text>
          ) : (
            <Stack>
              {article.isTemporary && (article as ArticleData).schedule.dateTime ? (
                <Group>
                  <Text>{`${TimeFunctions.fromDateToString(
                    // @ts-ignore client forces this properties not as undefined if isTemporary property is true
                    TimeFunctions.unixTimestampToDay(article.schedule.dateTime[0])
                  )} ~ ${TimeFunctions.fromDateToString(
                    // @ts-ignore
                    TimeFunctions.unixTimestampToDay(article.schedule.dateTime[1])
                  )}`}</Text>
                </Group>
              ) : (
                <Group>
                  {(article as ArticleData).schedule.dayPerWeek && (
                    <ArticleBadge color={BadgeColor.dayPerWeek}>{`${t(
                      'section_schedules_dayPerWeek'
                    )}: ${(article as ArticleData).schedule.dayPerWeek}`}</ArticleBadge>
                  )}
                  {(article as ArticleData).schedule.day &&
                    (article as ArticleData).schedule.day!.length !== 0 && (
                      <ArticleBadge color={BadgeColor.day}>{`${t('section_schedules_day')}: ${(
                        article as ArticleData
                      ).schedule
                        .day!.map((v, i) => {
                          if (v === 0) return '';
                          return t(`day_${i}`, { ns: 'data' });
                        })
                        .filter((v) => v !== '')
                        .join(', ')}`}</ArticleBadge>
                    )}
                  {(article as ArticleData).schedule.average &&
                    (article as ArticleData).schedule.average !== 0 && (
                      <ArticleBadge color={BadgeColor.average}>{`${t(
                        'section_schedules_average'
                      )}: ${(article as ArticleData).schedule.average}`}</ArticleBadge>
                    )}
                  {(article as ArticleData).schedule.adjustable && (
                    <Group>
                      {(article as ArticleData).schedule.adjustable && (
                        <ArticleBadge color={BadgeColor.adjustable}>
                          {t('section_schedules_adjustable')}
                        </ArticleBadge>
                      )}
                    </Group>
                  )}
                </Group>
              )}
              {(article as ArticleData).schedule.time &&
              (article as ArticleData).schedule.time!.flat(3).filter((v) => v !== '-1').length !==
                0 ? (
                <Stack>
                  <SubTitle>{t('section_schedules_detail')}</SubTitle>
                  <Table
                    sx={(theme) => ({
                      maxWidth: '100%',
                    })}
                  >
                    <thead>
                      <tr>
                        <th>{t('section_schedules_time_table_label_day')}</th>
                        <th>{t('section_schedules_time_table_label_start_time')}</th>
                        <th>{t('section_schedules_time_table_label_end_time')}</th>
                        <th>{t('section_schedules_time_table_label_activity_time')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(article as ArticleData).schedule.time!.map((day, i) => {
                        if (day[0] === '-1' && day[1] === '-1') return;
                        const [startHour, startMinute] = Array.from(day[0].split(':'), (v) =>
                          Number(v)
                        );
                        const [endHour, endMinute] = Array.from(day[1].split(':'), (v) =>
                          Number(v)
                        );
                        const diff =
                          startHour === -1 ||
                          endHour === -1 ||
                          startMinute === undefined ||
                          endMinute === undefined
                            ? t('section_schedules_time_table_diff_unavailable')
                            : `${
                                startHour < endHour ||
                                (startHour === endHour && startMinute < endMinute)
                                  ? Number(
                                      (
                                        endHour +
                                        endMinute / 60 -
                                        startHour -
                                        startMinute / 60
                                      ).toFixed(1)
                                    )
                                  : Number(
                                      (
                                        24 +
                                        endHour +
                                        endMinute / 60 -
                                        startHour -
                                        startMinute / 60
                                      ).toFixed(1)
                                    )
                              } ${t('section_schedules_time_table_diff_hours')}`;
                        // eslint-disable-next-line consistent-return
                        return (
                          <tr key={i}>
                            <td>
                              {t(
                                `section_schedules_time_table_type_${
                                  (article as ArticleData).schedule.timeType
                                }_${i}`
                              )}
                            </td>
                            <td>
                              {startHour !== -1 && startMinute !== undefined
                                ? `${startHour}:${
                                    startMinute < 10 ? `0${startMinute}` : startMinute
                                  }`
                                : `${t('section_schedules_time_table_time_not_specified')}`}
                            </td>
                            <td>
                              {endHour !== -1 && endMinute !== undefined
                                ? `${endHour}:${endMinute < 10 ? `0${endMinute}` : endMinute}`
                                : `${t('section_schedules_time_table_time_not_specified')}`}
                            </td>
                            <td>{diff}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Stack>
              ) : (
                !article.isTemporary && (
                  <Text>{t('section_schedules_time_table_not_specified')}</Text>
                )
              )}
            </Stack>
          ),
        },
    description: !Object.hasOwn(article, 'description') ? undefined : (
        article as ArticleData
      ).description.replace(/(<([^>]+)>)/gi, '') === '' ? (
      <Text>{t('section_description_no_description_provided')}</Text>
    ) : (
      <Center>
        <Paper
          withBorder
          sx={(theme) => ({
            padding: theme.spacing.md,
            width: '100%',
            [theme.fn.smallerThan('sm')]: {
              width: '100%',
            },
          })}
        >
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: (article as ArticleData).description }} />
          </TypographyStylesProvider>
        </Paper>
      </Center>
    ),
  };
}
