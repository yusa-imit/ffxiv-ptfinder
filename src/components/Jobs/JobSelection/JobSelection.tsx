import { Group, Menu, MenuProps } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { JobSort } from '@constant/JobSort';
import { useRecoilState } from 'recoil';
import {
  Tank_Value,
  Job,
  Healer_Value,
  Melee_Value,
  Range_Value,
  Caster_Value,
  Limited_Value,
} from '../../../type/data/FFXIVInfo';
import RoleIcon from '../Icon/RoleIcon';
import JobIcon from '../Icon/JobIcon';
import { Article } from '../../../recoil/Article/index';

interface JobSelectionProps extends MenuProps {
  jobs: Job[];
  index: number;
  partyNumber: number;
  disableOpen?: boolean;
}
export default function JobSelection({
  jobs,
  index,
  partyNumber,
  disableOpen,
  ...etc
}: JobSelectionProps) {
  const { t } = useTranslation('job_selection');
  const [article, setArticle] = useRecoilState(Article);
  const [roles, setRoles] = useState({ t: false, d: false, h: false });
  const onJobIconClick = (job: Job) => {
    const newArticle = { ...article };
    const newPartys = [...article.jobs];
    const newJobs = [...newPartys[partyNumber]];
    if (article.jobs[partyNumber][index].includes(job)) {
      const jobArray: Job[] = [];
      newJobs[index].forEach((v) => {
        if (v === job) return;
        jobArray.push(v);
      });
      newJobs[index] = jobArray;
    } else {
      newJobs[index] = [...newJobs[index], job];
    }
    newPartys[partyNumber] = newJobs;
    newArticle.jobs = newPartys;
    setArticle(newArticle);
  };
  useEffect(() => {
    const newState = { t: false, d: false, h: false };
    jobs.forEach((job) => {
      switch (JobSort[job].role) {
        case 'TANK':
          newState.t = true;
          break;
        case 'HEALER':
          newState.h = true;
          break;
        case 'DPS':
          newState.d = true;
          break;
        case 'LIMITED':
          newState.d = true;
          break;
        default:
          break;
      }
    });
    setRoles(newState);
  }, [jobs.length]);

  if (disableOpen) {
    return <RoleIcon roles={roles} disableClick />;
  }
  return (
    <Menu {...etc}>
      <Menu.Target>
        <RoleIcon roles={roles} />
      </Menu.Target>
      <Menu.Dropdown style={{ position: 'absolute' }}>
        <Menu.Label>{t('job_tank_label')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Tank_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={article.jobs[partyNumber][index].includes(v)}
              onClick={() => {
                onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_healer_label')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Healer_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={article.jobs[partyNumber][index].includes(v)}
              onClick={() => {
                onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_melee_label')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Melee_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={article.jobs[partyNumber][index].includes(v)}
              onClick={() => {
                onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_range_label')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Range_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={article.jobs[partyNumber][index].includes(v)}
              onClick={() => {
                onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_caster_label')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Caster_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={article.jobs[partyNumber][index].includes(v)}
              onClick={() => {
                onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
        <Menu.Label>{t('job_limited_label')}</Menu.Label>
        <Group spacing="xs" position="left" px={12}>
          {Limited_Value.map((v, i) => (
            <JobIcon
              job={v}
              key={v + i}
              isChecked={article.jobs[partyNumber][index].includes(v)}
              onClick={() => {
                onJobIconClick(v);
              }}
            />
          ))}
        </Group>
        <Menu.Divider />
      </Menu.Dropdown>
    </Menu>
  );
}
