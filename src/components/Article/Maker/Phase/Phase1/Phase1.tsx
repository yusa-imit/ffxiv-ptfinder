import BigContainer from '@components/base/BigContainer';
import {
  Checkbox,
  Group,
  Select,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
  Transition,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Help } from 'tabler-icons-react';
import { Article } from '../../../../../recoil/Article/index';
import { Phase1Styles } from './Phase1.styles';
import {
  DungeonType,
  Region,
  Region_Value,
  Language,
  Language_Value,
} from '../../../../../type/data/FFXIVInfo';

const DEV_Game_Version = [
  { value: '6', label: '6' },
  { value: '5', label: '5' },
  { value: '4', label: '4' },
  { value: '3', label: '3' },
  { value: '2', label: '2' },
];

const Major_Patch = [
  { label: '0', value: '0' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
];

export default function Phase1({ current, increasing }: { current: number; increasing: boolean }) {
  const route = useRouter();
  const { classes } = Phase1Styles();
  const { t } = useTranslation('article');
  const [titleCheck, setTitleCheck] = useState(false);
  const [article, changeArticle] = useRecoilState(Article);
  const phase1Error = {
    titleError: () => {
      if (titleCheck) return false;
      return 'phase1_title_necessary';
    },
  };
  const titleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== '') {
      const newArticle = { ...article };
      setTitleCheck(true);
      newArticle.title = event.currentTarget.value;
      changeArticle(newArticle);
    } else {
      setTitleCheck(false);
    }
  };
  const SelectData: {
    DungeonTypeData: { label: string; value: DungeonType }[];
    RegionData: { label: string; value: Region }[];
    LanguageData: { label: string; value: Language }[];
  } = {
    DungeonTypeData: [
      { label: t('phase1_dungeon_type_raid'), value: 'raid' },
      { label: t('phase1_dungeon_type_extreme'), value: 'extreme' },
      { label: t('phase1_dungeon_type_ultimate'), value: 'ultimate' },
      { label: t('phase1_dungeon_type_alliance'), value: 'alliance' },
      { label: t('phase1_dungeon_type_etc'), value: 'etc' },
    ],
    RegionData: Array.from(Region_Value, (v) => ({ label: t(`phase1_region_${v}`), value: v })),
    LanguageData: Array.from(Language_Value, (v) => ({
      label: t(`phase1_language_${v}`),
      value: v,
    })),
  };

  useEffect(() => {
    const newArticle = { ...article };
    if (route.locale === 'en' || !route.locale) {
      newArticle.language = 'EN';
      newArticle.region = 'NA';
    } else if (route.locale === 'jp') {
      newArticle.language = 'JP';
      newArticle.region = 'JP';
    } else if (route.locale === 'kr') {
      newArticle.language = 'KR';
      newArticle.region = 'KR';
    } else if (route.locale === 'cn') {
      newArticle.language = 'CN';
      newArticle.region = 'CN';
    }
    changeArticle(newArticle);
  }, []);
  return (
    <Transition
      transition={increasing ? 'slide-right' : 'slide-left'}
      mounted={current === 0}
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <BigContainer className={classes.inner} style={styles}>
          <TextInput
            className={classes.title}
            placeholder={t('phase1_title_placeholder')}
            label={t('phase1_title_label')}
            required
            onChange={titleOnChange}
            error={phase1Error.titleError()}
          />
          <div className={classes.toLeft}>
            <Tooltip label={t('phase1_isTemporary_tooltip_label')}>
              <Checkbox
                label={t('phase1_isTemporary_label')}
                styles={{ label: { fontWeight: 600 } }}
                checked={article.isTemporary}
                onChange={(e) => {
                  const newArticle = { ...article };
                  newArticle.isTemporary = e.currentTarget.checked;
                  changeArticle(newArticle);
                }}
              />
            </Tooltip>
          </div>
          <Group direction="column" className={classes.gameLabelToLeft}>
            <Text size="sm" weight={600}>
              {t('phase1_game_label')}
            </Text>
            <Group>
              <Text size="sm" weight={600}>
                {t('phase1_game_version')}
              </Text>
              <Select
                data={DEV_Game_Version}
                value={article.game.version}
                onChange={(value) => {
                  const newArticle = { ...article };
                  newArticle.game = {
                    version: value === null ? '' : value,
                    patch: newArticle.game.patch,
                  };
                  changeArticle(newArticle);
                }}
                transition="pop"
                transitionDuration={100}
                transitionTimingFunction="ease"
              ></Select>
              <Text size="sm" weight={600}>
                {t('phase1_major_patch')}
              </Text>
              <Select
                data={Major_Patch}
                value={article.game.patch}
                onChange={(value) => {
                  const newArticle = { ...article };
                  newArticle.game = {
                    patch: value === null ? '' : value,
                    version: newArticle.game.version,
                  };
                  changeArticle(newArticle);
                }}
                transition="pop"
                transitionDuration={100}
                transitionTimingFunction="ease"
              ></Select>
            </Group>
          </Group>
          <Group direction="column" className={classes.gameLabelToLeft}>
            <Text size="sm" weight={600}>
              {t('phase1_dungeon_type')}
            </Text>
            <Select
              data={SelectData.DungeonTypeData}
              value={article.type}
              onChange={(value) => {
                const newArticle = { ...article };
                newArticle.type = value === null ? 'etc' : (value as DungeonType);
                changeArticle(newArticle);
              }}
              transition="pop"
              transitionDuration={100}
              transitionTimingFunction="ease"
            />
          </Group>
          <Group direction="column" className={classes.gameLabelToLeft}>
            <Group style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text size="sm" weight={600}>
                {t('phase1_international')}
              </Text>
              <Tooltip
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                label={t('phase1_international_tooltip')}
              >
                <ThemeIcon radius={9999} size="sm">
                  <Help />
                </ThemeIcon>
              </Tooltip>
            </Group>
            <Group>
              <Text size="sm" weight={600}>
                {t('phase1_region')}
              </Text>
              <Select
                data={SelectData.RegionData}
                value={article.region}
                onChange={(value) => {
                  const newArticle = { ...article };
                  newArticle.region = value === null ? 'JP' : (value as Region);
                  changeArticle(newArticle);
                }}
                transition="pop"
                transitionDuration={100}
                transitionTimingFunction="ease"
              />
              <Text size="sm" weight={600}>
                {t('phase1_dungeon_type')}
              </Text>
              <Select
                data={SelectData.LanguageData}
                value={article.language}
                onChange={(value) => {
                  const newArticle = { ...article };
                  newArticle.language = value === null ? 'JP' : (value as Language);
                  changeArticle(newArticle);
                }}
                transition="pop"
                transitionDuration={100}
                transitionTimingFunction="ease"
              />
            </Group>
          </Group>
        </BigContainer>
      )}
    </Transition>
  );
}
