import { SelectItem } from '@mantine/core/lib/Select/types';
import { ReactNode } from 'react';
import { Region_Value } from '@type/data/FFXIVInfo';
import { TFunction } from 'next-i18next';
import { SearchIndexContext, SearchKeys } from '../../../type/SearchIndex';
import { Language_Value } from '../../../type/data/FFXIVInfo';

export interface SearchData {
  component: 'Select' | 'Input' | 'NumberInput' | 'Checkbox' | 'Checkbox.Group' | 'None';
  label: string;
  data?: (string | SelectItem)[];
  limit?: {
    max?: number;
    min?: number;
  };
}
export const SearchDataValue = (t: TFunction) => ({
  articleType: {
    component: 'Select',
    label: t('search_article_type'),
    data: [
      { value: 'recruit', label: t('article_type_recruit', { ns: 'data' }) },
      { value: 'enlist', label: t('article_type_enlist', { ns: 'data' }) },
    ],
  },
  title: {
    component: 'Input',
    label: t('search_title_label'),
    data: [t('search_title')],
  },
  isTemporary: {
    component: 'Checkbox',
    label: t('search_isTemporary_label'),
    data: [t('search_isTemporary')],
  },
  minimumWeek: {
    component: 'NumberInput',
    label: t('search_minimum_week_label'),
    limit: {
      min: 0,
    },
  },
  voiceChat: {
    component: 'Checkbox.Group',
    label: t('search_voicechat_label'),
    data: [
      { value: '0', label: t('phase2_voicechat_value_0') },
      { value: '1', label: t('phase2_voicechat_value_1') },
      { value: '2', label: t('phase2_voicechat_value_2') },
    ],
  },
  region: {
    component: 'Select',
    label: t('search_region_label'),
    data: Array.from(Region_Value, (v) => ({ value: v, label: t(`region_${v}`, { ns: 'data' }) })),
  },
  language: {
    component: 'Select',
    label: t('search_language_label'),
    data: Array.from(Language_Value, (v) => ({
      value: v,
      label: t(`lang_${v}`, { ns: 'data' }),
    })),
  },
  heading: {
    component: 'Checkbox',
    label: t('search_isHeading_label'),
  },
  firstTime: {
    component: 'Checkbox',
    label: t('search_isFirstTime_label'),
  },
  firstWeekClear: {
    component: 'Checkbox',
    label: t('search_isFirstWeekClear_label'),
  },
  worldFirstRace: {
    component: 'Checkbox',
    label: t('search_worldFirstRace_label'),
  },
  farm: {
    component: 'Checkbox',
    label: t('search_isFarm_label'),
  },
  boxNumber: {
    component: 'NumberInput',
    label: t('search_box_number_label'),
    limit: {
      min: 0,
      max: 2,
    },
  },
});
