import BigContainer from '@components/base/BigContainer';
import JobIcon from '@components/Jobs/Icon/JobIcon';
import { JobSort } from '@constant/JobSort';
import {
  Badge,
  Group,
  Paper,
  Stack,
  Title,
  Text,
  MantineColor,
  Tooltip,
  Button,
  Box,
  TypographyStylesProvider,
  Center,
  Table,
} from '@mantine/core';
import { ArticleData } from '@type/data/ArticleData';
import { useTranslation } from 'next-i18next';
import { timezone } from '@lib/timezone';
import { useEffect } from 'react';
import TimeFunctions from '@lib/TimeFunctions';
import ArticleBadge from './ArticleBadge';
import Section from './Section';
import SubTitle from './SubTitle';
import { RoleIconDiv } from '../../Jobs/Icon/RoleIconDiv';

interface ArticleViewProps {
  article: ArticleData;
}

export default function ArticleView({ article }: ArticleViewProps) {
  const { t } = useTranslation(['article_view', 'data']);
  const BadgeColor: { [key: string]: MantineColor } = {
    isTemporary: 'red',
    region: 'blue',
    language: 'cyan',
    minimumWeek: 'indigo',
    voiceChat: 'lime',
    fwc: 'pink',
    wfr: 'pink',
    farm: 'orange',
    firstTime: 'yellow',
    heading: 'yellow',
    box: 'orange',
    langRestriction: 'teal',
    timezone: 'grape',
    adjustable: 'blue',
    dayPerWeek: 'green',
    day: 'green',
  };
  return (
    <BigContainer
      sx={(theme) => ({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      })}
    >
      <article style={{ width: '100%', position: 'relative' }}>
        <Stack>
          <Section title={t('section_title_title')}>
            <Title order={1} style={{ wordBreak: 'break-word', lineBreak: 'auto' }}>
              {article.title}
            </Title>
          </Section>
          <Section title={t('section_default_title')}>
            {article.isTemporary && (
              <Group>
                <ArticleBadge color={BadgeColor.isTemporary}>
                  {t('section_default_isTemporary_badge')}
                </ArticleBadge>
              </Group>
            )}
            {
              // TODO
            }
            <Group>
              <ArticleBadge>DEV_Unending Coil of Bahamut (Extreme)</ArticleBadge>
            </Group>
            <Group>
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
          </Section>
          <Section title={t('section_jobs_title')}>
            <SubTitle>{t('section_jobs_job_all')}</SubTitle>
            {article.jobs.flat(3).length === 0 ? (
              <Text>{t('section_jobs_job_not_specified')} </Text>
            ) : (
              <Group spacing="xs">
                {Array.from(new Set(article.jobs.flat(3)), (v) => v)
                  .sort((a, b) => JobSort[a].sort - JobSort[b].sort)
                  .map((v) => (
                    <JobIcon job={v} isChecked={false} disableHoverStyle key={v} />
                  ))}
              </Group>
            )}
            <SubTitle>{t('section_jobs_job_position')}</SubTitle>
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
          </Section>
          <Section title={t('section_details_title')}>
            <SubTitle>{t('section_details_essentials')}</SubTitle>
            <Group>
              <ArticleBadge color={BadgeColor.minimumWeek}>{`${t(
                'section_details_essentials_minimum_week'
              )} : ${article.minimumWeek}`}</ArticleBadge>
              <ArticleBadge color={BadgeColor.voiceChat}>
                {t(`section_details_essentials_voice_chat_${article.voiceChat}`)}
              </ArticleBadge>
            </Group>

            <SubTitle>{t('section_details_additionals')}</SubTitle>
            <Group>
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
                <ArticleBadge color={BadgeColor.heading}>
                  {t('section_details_heading')}
                </ArticleBadge>
              )}
              {article.additional.boxNumber && (
                <ArticleBadge color={BadgeColor.box}>{`${t('section_details_boxNumber')}: ${
                  article.additional.boxNumber
                }`}</ArticleBadge>
              )}
            </Group>

            <SubTitle>{t('section_details_language_restrictions')}</SubTitle>
            <Group>
              {article.specifyUserLanguage && article.specifyUserLanguage.length !== 0 ? (
                article.specifyUserLanguage.map((language) => (
                  <ArticleBadge color={Badge.langRestriction}>
                    {t(`lang_${language}`, { ns: 'data' })}
                  </ArticleBadge>
                ))
              ) : (
                <Text>{t('section_details_no_language_restrictions_provided')}</Text>
              )}
            </Group>
          </Section>
          <Section title={t('section_schedules_title')}>
            <SubTitle>{t('section_schedules_article_timezone')}</SubTitle>
            {article.schedule.timezone && (
              <Group>
                <ArticleBadge
                  color={BadgeColor.timezone}
                  tooltip={timezone(article.schedule.timezone).displayName}
                >
                  {timezone(article.schedule.timezone).Abbreviation}
                </ArticleBadge>
              </Group>
            )}

            <SubTitle>{t('section_schedules_summary')}</SubTitle>
            {article.schedule.writtenInDescription ? (
              <Text>{t('section_schedules_writtenInDescription')}</Text>
            ) : (
              <Stack>
                {article.isTemporary && article.schedule.dateTime ? (
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
                    {article.schedule.dayPerWeek && (
                      <ArticleBadge color={BadgeColor.dayPerWeek}>{`${t(
                        'section_schedules_dayPerWeek'
                      )}: ${article.schedule.dayPerWeek}`}</ArticleBadge>
                    )}
                    {article.schedule.day && article.schedule.day.length !== 0 && (
                      <ArticleBadge color={BadgeColor.day}>{`${t(
                        'section_schedules_day'
                      )}: ${article.schedule.day
                        .map((v, i) => {
                          if (v === 0) return '';
                          return t(`day_${i}`, { ns: 'data' });
                        })
                        .filter((v) => v !== '')
                        .join(', ')}`}</ArticleBadge>
                    )}
                    {article.schedule.average && article.schedule.average !== 0 && (
                      <ArticleBadge color={BadgeColor.average}>{`${t(
                        'section_schedules_average'
                      )}: ${article.schedule.average}`}</ArticleBadge>
                    )}
                    {article.schedule.adjustable && (
                      <Group>
                        {article.schedule.adjustable && (
                          <ArticleBadge color={BadgeColor.adjustable}>
                            {t('section_schedules_adjustable')}
                          </ArticleBadge>
                        )}
                      </Group>
                    )}
                  </Group>
                )}
                {article.schedule.time &&
                article.schedule.time.flat(3).filter((v) => v !== '-1').length !== 0 ? (
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
                        {article.schedule.time.map((day, i) => {
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
                                  `section_schedules_time_table_type_${article.schedule.timeType}_${i}`
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
                  <Text>{t('section_schedules_time_table_not_specified')}</Text>
                )}
              </Stack>
            )}
          </Section>
          <Section title={t('section_description_title')}>
            {article.description.replace(/(<([^>]+)>)/gi, '') === '' ? (
              <Text>{t('section_description_no_description_provided')}</Text>
            ) : (
              <Center>
                <Paper
                  withBorder
                  sx={(theme) => ({
                    padding: theme.spacing.md,
                    width: '90%',
                    [theme.fn.smallerThan('sm')]: {
                      width: '100%',
                    },
                  })}
                >
                  <TypographyStylesProvider>
                    <div dangerouslySetInnerHTML={{ __html: article.description }} />
                  </TypographyStylesProvider>
                </Paper>
              </Center>
            )}
          </Section>
        </Stack>
      </article>
    </BigContainer>
  );
}
