import BigContainer from '@components/base/BigContainer';
import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import WithAsterisk from '@components/WithAsterisk';
import { timezone } from '@lib/timezone';
import {
  Box,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  Radio,
  Select,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { UseListStateHandlers } from '@mantine/hooks';
import { Schedule } from '@type/data/ArticleData';
import { Timezone, TimezonesValue } from '@type/data/Timezone';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { Check } from 'tabler-icons-react';
import { Article } from '../../../../../recoil/Article/index';
import { PhaseStyles } from '../Phase.styles';
import { PhaseStack } from '../PhaseStack';
import TimeSelect from './TimeSelect';

interface Phase3Props {
  errorMessages: string[];
  render: boolean;
  errorMessageHandler: UseListStateHandlers<string>;
}
export default function Phase3({ render, errorMessages, errorMessageHandler }: Phase3Props) {
  const Time_Select_Defaults = [
    [['-1', '-1']],
    [
      ['-1', '-1'],
      ['-1', '-1'],
    ],
    [
      ['-1', '-1'],
      ['-1', '-1'],
      ['-1', '-1'],
      ['-1', '-1'],
      ['-1', '-1'],
      ['-1', '-1'],
      ['-1', '-1'],
    ],
  ];
  const timeToUnixTimestamp = (v: Date) => {
    return (v.getHours() * 60 + v.getMinutes()) * 60;
  };
  const dayToUnixTimestamp = (v: Date) => {
    return Math.floor(v.getTime() / 1000);
  };
  const extractDayFromDate = (v: Date) => {
    return Math.floor(
      new Date(v.getFullYear(), v.getMonth(), v.getDate(), 0, 0, 0, 0).getTime() / 1000
    );
  };
  const unixTimestampToDay = (v: number) => {
    return new Date(v * 1000);
  };
  const { classes } = PhaseStyles();
  const { t } = useTranslation('article');
  const [article, changeArticle] = useRecoilState(Article);

  const [dayRadio, setDayRadio] = useState(true);
  const [dayDesc, setDayDesc] = useState(false);
  const [timeDesc, setTimeDesc] = useState(false);
  const [tempStartDay, setTempStartDay] = useState(extractDayFromDate(new Date()));
  const [tempStartTime, setTempStartTime] = useState(0);
  const [tempEndDay, setTempEndDay] = useState(extractDayFromDate(new Date()));
  const [tempEndTime, setTempEndTime] = useState(0);

  const phase3Error = {
    startTimeNotSetErrorHandler: () => {
      if (!render) return;
      if (tempStartTime === 0) {
        if (!errorMessages.includes(t('phase3_start_time_not_set_error'))) {
          errorMessageHandler.append(t('phase3_start_time_not_set_error'));
        }
      } else if (errorMessages.includes(t('phase3_start_time_not_set_error'))) {
        errorMessageHandler.filter((v) => v !== t('phase3_start_time_not_set_error'));
      }
    },
    getStartTimeNotSetLabel: () => {
      if (tempStartTime === 0) {
        return t('phase3_start_time_not_set_error');
      }
      return false;
    },
    endTimeNotSetErrorHandler: () => {
      if (!render) return;
      if (tempEndTime === 0) {
        if (!errorMessages.includes(t('phase3_end_time_not_set_error'))) {
          errorMessageHandler.append(t('phase3_end_time_not_set_error'));
        }
      } else if (errorMessages.includes(t('phase3_end_time_not_set_error'))) {
        errorMessageHandler.filter((v) => v !== t('phase3_end_time_not_set_error'));
      }
    },
    getEndTimeNotSetLabel: () => {
      if (tempEndTime === 0) {
        return t('phase3_end_time_not_set_error');
      }
      return false;
    },
  };
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
  const handleSchduleChange = (key: (keyof Schedule)[], value: unknown[], by?: string) => {
    changeArticle((prev) => {
      const newArticle = { ...prev };
      const newSchedule = { ...newArticle.schedule };
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const i in key) {
        // @ts-expect-error
        newSchedule[key[i]] = value[i];
      }
      newArticle.schedule = newSchedule;
      return newArticle;
    });
  };

  useEffect(() => {
    if (!article.schedule.dateTime) return;
    const getString = (datetime: number) => {
      const date = new Date(datetime * 1000);
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
    };
    //getString(tempStartDay + tempStartTime);
    //getString(tempEndDay + tempEndTime);
    //getString(article.schedule.dateTime[0]);
    //getString(article.schedule.dateTime[1]);
  }, [article]);

  useEffect(() => {
    if (article.schedule.timezone !== undefined) return;
    const setNewArticle = (value: Timezone) => {
      changeArticle((prev) => {
        const newArticle = { ...prev };
        const newSchedule = { ...newArticle.schedule };
        newSchedule.timezone = value;
        newArticle.schedule = newSchedule;
        return newArticle;
      });
    };
    if (article.language === 'EN' || article.language === 'FR' || article.language === 'DE') {
      setNewArticle('Pacific Daylight Time');
    }
    if (article.language === 'JP') {
      setNewArticle('Japan Standard Time');
    }
    if (article.language === 'KR') {
      setNewArticle('Korea Standard Time');
    }
    if (article.language === 'CN') {
      setNewArticle('China Standard Time');
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
    phase3Error.startTimeNotSetErrorHandler();
    if (!article.isTemporary) return;
    const newDateTime = article.schedule.dateTime ? [...article.schedule.dateTime] : new Array(2);
    newDateTime[0] = tempStartDay + tempStartTime;
    handleSchduleChange(['dateTime'], [newDateTime]);
  }, [tempStartDay, tempStartTime]);
  useEffect(() => {
    phase3Error.endTimeNotSetErrorHandler();
    if (!article.isTemporary) return;
    const newDateTime = article.schedule.dateTime ? [...article.schedule.dateTime] : new Array(2);
    newDateTime[1] = tempEndDay + tempEndTime;
    handleSchduleChange(['dateTime'], [newDateTime]);
  }, [tempEndDay, tempEndTime]);
  useEffect(() => {
    if (article.isTemporary) {
      handleSchduleChange(
        ['dateTime', 'timeType', 'time'],
        [[extractDayFromDate(new Date()), extractDayFromDate(new Date())], undefined, undefined]
      );
    }
    if (!article.isTemporary) {
      handleSchduleChange(
        ['timeType', 'time', 'dateTime'],
        [0, [...Time_Select_Defaults[0]], undefined]
      );
      setTempEndDay(extractDayFromDate(new Date()));
      setTempEndTime(0);
      setTempStartDay(extractDayFromDate(new Date()));
      setTempStartTime(0);
    }
  }, [article.isTemporary]);
  useEffect(() => {
    if (article.schedule.time?.flat(3).filter((v) => v !== '-1').length === 0) {
      handleSchduleChange(['average'], [undefined]);
    }
    let dayCount = 0;
    let time = 0;
    article.schedule.time?.forEach((timeArray) => {
      if (timeArray[0] === '-1' || timeArray[1] === '-1') return;
      const [startHour, startMinute] = Array.from(timeArray[0].split(':'), (v) => Number(v));
      const [endHour, endMinute] = Array.from(timeArray[1].split(':'), (v) => Number(v));
      const diff =
        startHour < endHour || (startHour === endHour && startMinute < endMinute)
          ? Number((endHour + endMinute / 60 - startHour - startMinute / 60).toFixed(1))
          : Number((24 + endHour + endMinute / 60 - startHour - startMinute / 60).toFixed(1));
      dayCount += 1;
      time += diff;
    });
    if (dayCount === 0) return;
    handleSchduleChange(['average'], [(time / dayCount).toFixed(1)]);
  }, [article.schedule.time]);
  // TODO
  // Somthing happening here...
  // @error
  // @error_description some state changes after rendering, set time and timeType to undefined.
  // @temp solving upper problem with unexistable data value into default form value.
  useEffect(() => {
    if (!article.isTemporary) {
      if (!timeDesc) {
        if (!article.schedule.time && !article.schedule.timeType) {
          handleSchduleChange(['timeType', 'time'], [0, [...Time_Select_Defaults[0]]]);
        }
      }
    }
  }, [article.schedule.time, article.schedule.timeType]);
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
            checked={article.schedule.writtenInDescription}
            onChange={(e) =>
              handleSchduleChange(['writtenInDescription'], [e.currentTarget.checked])
            }
          />
        </HorizontalGroupWithText>
        <HorizontalGroupWithText text={t('phase3_adjustable_title')}>
          <Checkbox
            label={t('phase3_adjustable_desc')}
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
              <Title order={6}>
                <WithAsterisk>{t('phase3_temporary_start_time')}</WithAsterisk>
              </Title>
              <TimeInput
                error={phase3Error.getStartTimeNotSetLabel()}
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
              <Title order={6}>
                <WithAsterisk>{t('phase3_temporary_end_time')}</WithAsterisk>
              </Title>
              <TimeInput
                error={phase3Error.getEndTimeNotSetLabel()}
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
                checked={dayDesc}
                disabled={article.schedule.writtenInDescription}
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
            <Title order={6}>{t('phase3_day_select_radio_label')}</Title>
            <Radio
              disabled={dayDesc || article.schedule.writtenInDescription}
              value="0r"
              checked={dayDesc ? false : dayRadio}
              label={t('phase3_day_select_by_number')}
              onChange={() => {
                handleSchduleChange(['dayPerWeek', 'day'], [1, undefined]);
                setDayRadio(true);
              }}
            />
            <Radio
              disabled={dayDesc || article.schedule.writtenInDescription}
              value="1"
              checked={dayDesc ? false : !dayRadio}
              label={t('phase3_day_select_by_select')}
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
                  disabled={dayDesc || article.schedule.writtenInDescription}
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
                      disabled={dayDesc || article.schedule.writtenInDescription}
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
                disabled={article.schedule.writtenInDescription}
                label={t('phase3_time_in_desc_desc')}
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
            <Title order={6}>{t('phase3_time_select_radio_label')}</Title>

            <Radio
              disabled={timeDesc || article.schedule.writtenInDescription}
              value="0"
              checked={article.schedule.timeType === 0}
              label={t('phase3_time_select_all')}
              onChange={(event) => {
                handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[0]], 0]);
              }}
            ></Radio>
            <Radio
              disabled={timeDesc || article.schedule.writtenInDescription}
              value="1"
              checked={article.schedule.timeType === 1}
              label={t('phase3_time_select_holiday')}
              onChange={(event) => {
                handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[1]], 1]);
              }}
            ></Radio>
            <Radio
              disabled={timeDesc || article.schedule.writtenInDescription}
              value="2"
              checked={article.schedule.timeType === 2}
              label={t('phase3_time_select_full')}
              onChange={(event) => {
                handleSchduleChange(['time', 'timeType'], [[...Time_Select_Defaults[2]], 2]);
              }}
            ></Radio>

            <Divider />
            <TimeSelect
              article={article}
              translation="article"
              disable={timeDesc || article.schedule.writtenInDescription}
              handler={handleSchduleChange}
            />
          </PhaseStack>
        </>
      )}
    </BigContainer>
  );
}
