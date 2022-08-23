import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import { Group, Title, Stack } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ArticleData } from '@type/data/ArticleData';
import { useTranslation } from 'next-i18next';

interface TimeSelectProps {
  article: ArticleData;
  disable?: boolean;
  translation?: string;
  handler?: unknown;
}
export default function TimeSelect({ article, translation, disable, handler }: TimeSelectProps) {
  const { t } = useTranslation(translation);
  if (article.schedule.timeType === undefined) return <></>;
  return (
    <Stack>
      <Title order={6}>{t('phase3_time_select_title')}</Title>
      {article.schedule.time?.map((arrLength2, arrIndex) => (
        <Group>
          {arrLength2.map((v, i) => (
            <>
              <HorizontalGroupWithText
                text={t(`phase3_time_type_${article.schedule.timeType}_${arrIndex}_start`)}
              >
                <TimeInput
                  disabled={disable}
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
            </>
          ))}
        </Group>
      ))}
    </Stack>
  );
}
