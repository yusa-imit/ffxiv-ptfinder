import BigContainer from '@components/base/BigContainer';
import { Checkbox, Group, Select, Text, TextInput, Transition } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { WidthLimitedTooltip } from '@components/WidthLimitedTooltip';
import { HorizontalGroupWithText } from '@components/HorizontalGroupWithText';
import HelpIcon from '@components/icons/HelpIcon';
import { Article } from '../../../../../recoil/Article/index';
import { Phase1Styles } from './Phase1.styles';
import {
  DungeonType,
  Region,
  Region_Value,
  Language,
  Language_Value,
} from '../../../../../type/data/FFXIVInfo';
import { PhaseStack } from '../PhaseStack';

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

interface Phase1Props {
  current: number;
  increasing: boolean;
  errorHandler: React.Dispatch<SetStateAction<boolean>>;
}
export default function Phase1({ current, increasing, errorHandler }: Phase1Props) {
  const route = useRouter();
  const { classes } = Phase1Styles();
  const { t } = useTranslation('article');
  const [titleCheck, setTitleCheck] = useState(false);
  const [article, changeArticle] = useRecoilState(Article);
  const phase1Error = {
    titleError: () => {
      if (titleCheck) {
        errorHandler(false);
        return false;
      }
      errorHandler(true);
      return t('phase1_title_necessary');
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
          <PhaseStack title={t('phase1_article_basic')}>
            <TextInput
              className={classes.title}
              placeholder={t('phase1_title_placeholder')}
              label={t('phase1_title_label')}
              required
              onChange={titleOnChange}
              error={phase1Error.titleError()}
            />
            <WidthLimitedTooltip label={t('phase1_isTemporary_tooltip_label')}>
              <Group className={classes.responsiveGroup}>
                <Group
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Text size="sm" weight={500}>
                    {t('phase1_isTemporary')}
                  </Text>
                  <HelpIcon />
                </Group>

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
              </Group>
            </WidthLimitedTooltip>
          </PhaseStack>
          <PhaseStack title={t('phase1_game_label')}>
            <Group className={classes.responsiveGroup}>
              <HorizontalGroupWithText text={t('phase1_game_version')}>
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
              </HorizontalGroupWithText>
              <HorizontalGroupWithText text={t('phase1_game_major_patch')}>
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
              </HorizontalGroupWithText>
            </Group>
            <HorizontalGroupWithText text={t('phase1_dungeon_type')}>
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
            </HorizontalGroupWithText>
          </PhaseStack>
          <PhaseStack
            title={t('phase1_international')}
            titleHelp={t('phase1_international_tooltip')}
          >
            <Group className={classes.responsiveGroup}>
              <HorizontalGroupWithText text={t('phase1_region')}>
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
              </HorizontalGroupWithText>
              <HorizontalGroupWithText text={t('phase1_language')}>
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
              </HorizontalGroupWithText>
            </Group>
          </PhaseStack>
        </BigContainer>
      )}
    </Transition>
  );
}
