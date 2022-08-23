import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import { Group, Title, Stack, Checkbox } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ArticleData } from '@type/data/ArticleData';
import { useTranslation } from 'next-i18next';
import { createRef, useEffect, useRef, useState } from 'react';

interface TimeSelectProps {
  article: ArticleData;
  disable?: boolean;
  translation?: string;
  handler?: unknown;
}
export default function TimeSelect({ article, translation, disable, handler }: TimeSelectProps) {
  const { t } = useTranslation(translation);
  const [state, setState] = useState([false, false, false, false, false, false, false]);
  useEffect(() => {
    setState([false, false, false, false, false, false, false]);
  }, [article.schedule.timeType]);
  if (article.schedule.timeType === undefined) return <></>;
  return (
    <Stack>
      <Title order={6}>{t('phase3_time_select_title')}</Title>
      {article.schedule.time?.map((arrLength2, arrIndex) => (
        <>
          {article.schedule.timeType === 2 && (
            <Group>
              <Title order={6}>{t(`phase3_day_${arrIndex}`)}</Title>
              <Checkbox
                label={`${t(`phase3_day_${arrIndex}`)} ${t('phase3_time_not_activity_day')}`}
                checked={state[arrIndex]}
                onChange={(e) => {
                  const newArr = [...state];
                  newArr[arrIndex] = e.currentTarget.checked;
                  setState(newArr);

                  const newTime = [...(article.schedule.time as string[][])];
                  newTime[arrIndex] = ['-1', '-1'];
                  // @ts-ignore
                  handler(['time'], [newTime]);
                }}
              />
            </Group>
          )}
          <Group>
            {arrLength2.map((v, i) => {
              if (state[arrIndex]) return <></>;
              return (
                <HorizontalGroupWithText
                  text={t(`phase3_time_type_${article.schedule.timeType}_${arrIndex}_start`)}
                >
                  <TimeInput
                    disabled={disable || state[arrIndex]}
                    onChange={(value) => {
                      const newTime = [...(article.schedule.time as string[][])];
                      const newArr = [...newTime[arrIndex]];
                      newArr[i] = `${value.getHours()}:${value.getMinutes()}`;
                      newTime[arrIndex] = newArr;
                      // @ts-ignore
                      handler(['time'], [newTime]);
                    }}
                  />
                </HorizontalGroupWithText>
              );
            })}
          </Group>
        </>
      ))}
    </Stack>
  );
}
