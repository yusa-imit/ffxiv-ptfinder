import BigContainer from '@components/base/BigContainer';
import {
  Box,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  Radio,
  Select,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import { UseListStateHandlers } from '@mantine/hooks';
import { Schedule } from '@type/data/ArticleData';
import { DatePicker, TimeInput } from '@mantine/dates';
import { Timezone, TimezonesValue } from '@type/data/Timezone';
import { timezone } from '@lib/timezone';
import { Check } from 'tabler-icons-react';
import { Article } from '../../../../../recoil/Article/index';
import { PhaseStyles } from '../Phase.styles';
import { PhaseStack } from '../PhaseStack';
import TimeSelect from './TimeSelect';

const Time_Select_Defaults = [
  [['0', '0']],
  [
    ['0', '0'],
    ['0', '0'],
  ],
  [
    ['0', '0'],
    ['0', '0'],
    ['0', '0'],
    ['0', '0'],
    ['0', '0'],
    ['0', '0'],
    ['0', '0'],
  ],
];

const timeToUnixTimestamp = (v: Date) => {
  return (v.getHours() * 60 + v.getMinutes()) * 60;
};
const dayToUnixTimestamp = (v: Date) => {
  return Math.floor(v.getTime() / 1000);
};
const unixTimestampToDay = (v: number) => {
  return new Date(v * 1000);
};

interface Phase3Props {
  errorMessages: string[];
  render: boolean;
  errorMessageHandler: UseListStateHandlers<string>;
}
export default function Phase3({ render, errorMessages, errorMessageHandler }: Phase3Props) {
  const route = useRouter();
  const { classes } = PhaseStyles();
  const { t } = useTranslation('article');
  const [article, changeArticle] = useRecoilState(Article);
  const phase3Error = {};
  const SelectData: {
    timezoneData: { label: string; value: Timezone }[];
  } = {
    timezoneData: Array.from(TimezonesValue, (v) => {
      const tz = timezone(v);
      return {
        value: v,
        label: `${tz.Abbreviation} : ${tz.displayName}`,
      };
    }),
  };
  const handleSchduleChange = (key: (keyof Schedule)[], value: unknown[]) => {
    const newArticle = { ...article };
    const newSchedule = { ...newArticle.schedule };
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const i in key) {
      // @ts-expect-error
      newSchedule[key[i]] = value[i];
    }
    newArticle.schedule = newSchedule;
    changeArticle(newArticle);
  };
  const [dayRadio, setDayRadio] = useState(true);
  const [dayDesc, setDayDesc] = useState(false);
  const [timeDesc, setTimeDesc] = useState(false);
  const [tempStartDay, setTempStartDay] = useState(0);
  const [tempStartTime, setTempStartTime] = useState(0);
  const [tempEndDay, setTempEndDay] = useState(0);
  const [tempEndTime, setTempEndTime] = useState(0);

  useEffect(() => {
    if (!article.schedule.dateTime) return;
    const date = new Date(article.schedule.dateTime[0] * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`;
    const day = `0${date.getDate()}`;
    const hour = `0${date.getHours()}`;
    const minute = `0${date.getMinutes()}`;
    const second = `0${date.getSeconds()}`;
    console.log(
      `${year}-${month.substr(-2)}-${day.substr(-2)} ${hour.substr(-2)}:${minute.substr(
        -2
      )}:${second.substr(-2)}`
    );
  }, [article]);
  useEffect(() => {
    console.log(article.schedule);
  }, [article]);
  useEffect(() => {
    if (article.schedule.timezone !== undefined) return;
    const setArticle = (value: Timezone) => {
      const newArticle = { ...article };
      const newSchedule = { ...newArticle.schedule };
      newSchedule.timezone = value;
      newArticle.schedule = newSchedule;
      changeArticle(newArticle);
    };
    if (article.language === 'EN' || article.language === 'FR' || article.language === 'DE') {
      setArticle('Pacific Daylight Time');
    }
    if (article.language === 'JP') {
      setArticle('Japan Standard Time');
    }
    if (article.language === 'KR') {
      setArticle('Korea Standard Time');
    }
    if (article.language === 'CN') {
      setArticle('China Standard Time');
    }
  }, [render]);
  useEffect(() => {
    if (!article.isTemporary) return;
    if (tempStartDay === 0 && tempEndDay !== 0) {
      setTempStartDay(tempEndDay);
    }
    if (tempStartDay !== 0 && tempEndDay === 0) {
      setTempEndDay(tempStartDay);
    }
  }, [tempStartDay, tempEndDay]);
  useEffect(() => {
    if (!article.isTemporary) return;
    const newDateTime = article.schedule.dateTime ? [...article.schedule.dateTime] : new Array(2);
    newDateTime[0] = tempStartDay + tempStartTime;
    handleSchduleChange(['dateTime'], [newDateTime]);
  }, [tempStartDay, tempStartTime]);
  useEffect(() => {
    if (!article.isTemporary) return;
    const newDateTime = article.schedule.dateTime ? [...article.schedule.dateTime] : new Array(2);
    newDateTime[1] = tempStartDay + tempStartTime;
    handleSchduleChange(['dateTime'], [newDateTime]);
  }, [tempEndDay, tempEndTime]);
  return (
    <BigContainer
      style={{ height: render ? 'fit-content' : 0 }}
      className={classes.inner}
      //style={{ position: current !== 0 ? 'absolute' : 'relative' }}
    >
      <PhaseStack title={t('phase3_schedule_description')}>
        <HorizontalGroupWithText text={t('phase3_writtenInDescription_title')}>
          <Checkbox
            label={t('phase3_writtenInDescription_desc')}
            styles={{ label: { fontWeight: 500 } }}
            checked={article.schedule.writtenInDescription}
            onChange={(e) =>
              handleSchduleChange(['writtenInDescription'], [e.currentTarget.checked])
            }
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase3_adjustable_title')}>
          <Checkbox
            label={t('phase3_adjustable_desc')}
            styles={{ label: { fontWeight: 500 } }}
            checked={article.schedule.adjustable}
            onChange={(e) => handleSchduleChange(['adjustable'], [e.currentTarget.checked])}
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase3_timezone_title')}>
          <Select
            data={SelectData.timezoneData}
            searchable
            value={article.schedule.timezone}
            onChange={(value) => {
              handleSchduleChange(['timezone'], [value]);
            }}
            sx={(theme) => ({
              width: '100%',
              maxWidth: '60%',
              [theme.fn.smallerThan('md')]: {
                maxWidth: '80%',
              },
              [theme.fn.smallerThan('sm')]: {
                maxWidth: '100%',
              },
            })}
            transition="pop"
            transitionDuration={100}
            transitionTimingFunction="ease"
            withinPortal
          />
        </HorizontalGroupWithText>
      </PhaseStack>
      {article.isTemporary ? (
        <PhaseStack title={t('phase3_temporary_schedule')}>
          <HorizontalGroupWithText>
            <Group className={classes.responsiveGroup}>
              <Title order={6}>{t('phase3_temporary_start_day')}</Title>
              <DatePicker
                value={tempStartDay === 0 ? new Date() : unixTimestampToDay(tempStartDay)}
                placeholder={t('phase3_temporary_date_placeholder')}
                onChange={(v) => {
                  if (!v) return;
                  setTempStartDay(dayToUnixTimestamp(v));
                }}
              />
            </Group>
            <Group>
              <Title order={6}>{t('phase3_temporary_start_time')}</Title>
              <TimeInput
                onChange={(v) => {
                  setTempStartTime(timeToUnixTimestamp(v));
                }}
              />
            </Group>
          </HorizontalGroupWithText>
          <HorizontalGroupWithText>
            <Group>
              <Title order={6}>{t('phase3_temporary_end_day')}</Title>
              <DatePicker
                value={tempEndDay === 0 ? new Date() : unixTimestampToDay(tempEndDay)}
                placeholder={t('phase3_temporary_date_placeholder')}
                onChange={(v) => {
                  if (!v) return;
                  setTempEndDay(dayToUnixTimestamp(v));
                }}
              />
            </Group>
            <Group>
              <Title order={6}>{t('phase3_temporary_end_time')}</Title>
              <TimeInput
                onChange={(v) => {
                  setTempEndTime(timeToUnixTimestamp(v));
                }}
              />
            </Group>
          </HorizontalGroupWithText>
        </PhaseStack>
      ) : (
        <>
          <PhaseStack title={t('phase3_day_select')}>
            <HorizontalGroupWithText text={t('phase3_day_in_desc_title')}>
              <Checkbox
                label={t('phase3_day_in_desc_desc')}
                styles={{ label: { fontWeight: 500 } }}
                checked={dayDesc}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    // @ts-expect-error
                    setDayRadio(undefined);
                    handleSchduleChange(['day', 'dayPerWeek'], [undefined, undefined]);
                  } else {
                    handleSchduleChange(['dayPerWeek'], [1]);
                    setDayRadio(true);
                  }
                  setDayDesc(e.currentTarget.checked);
                }}
              />
            </HorizontalGroupWithText>
            <Radio
              disabled={dayDesc}
              value="setByNumber"
              checked={dayRadio}
              label={<Title order={6}>{t('phase3_day_select_by_number')}</Title>}
              onChange={() => {
                console.log('hello');
                handleSchduleChange(['dayPerWeek', 'day'], [1, undefined]);
                setDayRadio(true);
              }}
            />
            <Radio
              disabled={dayDesc}
              value="setByNumber"
              checked={!dayRadio}
              label={<Title order={6}>{t('phase3_day_select_by_select')}</Title>}
              onChange={() => {
                handleSchduleChange(['dayPerWeek', 'day'], [undefined, new Array(7).fill(0)]);
                setDayRadio(false);
              }}
            />
            <Divider />
            {dayRadio === undefined ? (
              <></>
            ) : dayRadio ? (
              <HorizontalGroupWithText text={t('phase3_activity_day_by_number')}>
                <NumberInput
                  disabled={dayDesc}
                  defaultValue={1}
                  min={1}
                  max={7}
                  onChange={(value) => {
                    handleSchduleChange(['dayPerWeek'], [value]);
                  }}
                />
              </HorizontalGroupWithText>
            ) : (
              <HorizontalGroupWithText text={t('phase3_activity_day_by_select')}>
                <Group style={{ gap: 1 }}>
                  {article.schedule.day?.map((d, i) => (
                    <UnstyledButton
                      disabled={dayDesc}
                      key={i}
                      sx={(theme) => ({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 44,
                        height: 44,
                        borderRadius: 6,
                        color: theme.white,
                        fontWeight: 700,
                        overflow: 'hidden',
                        backgroundColor: theme.colors[theme.primaryColor][6],
                        position: 'relative',
                        '&:hover:enabled': {
                          filter: 'brightness(0.8)',
                        },
                        '&:active:enabled': {
                          filter: 'brightness(0.65)',
                        },
                        '&:disabled': {
                          backgroundColor: theme.colors.gray[4],
                        },
                      })}
                      onClick={() => {
                        // @ts-expect-error
                        const newArray = [...article.schedule.day];
                        newArray[i] = newArray[i] === 0 ? 1 : 0;
                        handleSchduleChange(['day'], [newArray]);
                      }}
                    >
                      {d === 1 && (
                        <Box
                          style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 255, 0, 0.5)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 700,
                            zIndex: 1,
                          }}
                        >
                          <Check strokeWidth={5} />
                        </Box>
                      )}
                      <Text>{t(`phase3_day_${i}`)}</Text>
                    </UnstyledButton>
                  ))}
                </Group>
              </HorizontalGroupWithText>
            )}
          </PhaseStack>
          <PhaseStack title={t('phase3_time_select')}>
            <HorizontalGroupWithText text={t('phase3_time_in_desc_title')}>
              <Checkbox
                label={t('phase3_time_in_desc_desc')}
                styles={{ label: { fontWeight: 500 } }}
                checked={timeDesc}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    handleSchduleChange(['time', 'timeType'], [undefined, undefined]);
                  } else {
                    handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[0]], 0]);
                  }
                  setTimeDesc(e.currentTarget.checked);
                }}
              />
            </HorizontalGroupWithText>
            <Radio
              value="0"
              checked={article.schedule.timeType === 0}
              label={<Title order={6}>{t('phase3_time_select_all')}</Title>}
              onChange={(event) => {
                handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[0]], 0]);
              }}
            ></Radio>
            <Radio
              value="1"
              checked={article.schedule.timeType === 1}
              label={<Title order={6}>{t('phase3_time_select_holiday')}</Title>}
              onChange={(event) => {
                handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[1]], 1]);
              }}
            ></Radio>
            <Radio
              value="2"
              checked={article.schedule.timeType === 2}
              label={<Title order={6}>{t('phase3_time_select_full')}</Title>}
              onChange={(event) => {
                handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[2]], 2]);
              }}
            ></Radio>
            <Divider />
            <TimeSelect article={article} translation="article" handler={handleSchduleChange} />
          </PhaseStack>
        </>
      )}
    </BigContainer>
  );
}
