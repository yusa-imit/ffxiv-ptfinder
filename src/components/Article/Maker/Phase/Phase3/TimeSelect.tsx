import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import { Group, Title, Stack, Checkbox, ActionIcon, Tooltip } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ArticleData } from '@type/data/ArticleData';
import { useTranslation } from 'next-i18next';
import { createRef, useEffect, useRef, useState, startTransition } from 'react';
import { Rotate } from 'tabler-icons-react';

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
        <div key={arrIndex}>
          {article.schedule.timeType === 2 && (
            <Group key={`pre_${arrIndex}`}>
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
          <Group key={arrIndex}>
            {arrLength2.map((v, i) => {
              if (state[arrIndex]) return <></>;
              const now = new Date();
              const current =
                !article.schedule.time || article.schedule.time[arrIndex][i] === '-1'
                  ? null
                  : new Date(
                      now.getFullYear(),
                      now.getMonth(),
                      now.getDay(),
                      Number(article.schedule.time[arrIndex][i].split(':')[0]),
                      Number(article.schedule.time[arrIndex][i].split(':')[1])
                    );
              const reset = () => {
                const newTime = [...(article.schedule.time as string[][])];
                const newArr = [...newTime[arrIndex]];
                newArr[i] = '-1';
                newTime[arrIndex] = newArr;
                // @ts-ignore
                handler(['time'], [newTime]);
              };
              return (
                <HorizontalGroupWithText
                  key={`${arrIndex}_${i}`}
                  text={t(
                    `phase3_time_type_${article.schedule.timeType}_${arrIndex}_${
                      i === 0 ? 'start' : 'end'
                    }`
                  )}
                >
                  <Group spacing={1}>
                    <TimeInput
                      value={current}
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
                    <Tooltip label={t('phase3_reset_time')}>
                      <ActionIcon variant="filled" color="red" size={36} onClick={reset}>
                        <Rotate />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </HorizontalGroupWithText>
              );
            })}
          </Group>
        </div>
      ))}
    </Stack>
  );
}
