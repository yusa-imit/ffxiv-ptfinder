import { SelectItem } from '@mantine/core/lib/Select/types';
import { ReactNode } from 'react';
import { Region_Value } from '@type/data/FFXIVInfo';
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
export const SearchDataValue: Record<SearchKeys, SearchData> = {
  articleType: {
    component: 'Select',
    label: 'search_article_type',
    data: [
      { value: 'recruit', label: 'article_type_recruit' },
      { value: 'enlist', label: 'article_type_enlist' },
    ],
  },
  title: {
    component: 'Input',
    label: 'phase1_title_label',
  },
  isTemporary: {
    component: 'Checkbox',
    label: 'phase1_isTemporary',
  },
  content: {
    component: 'None',
    label: 'phase1_content',
  },
  availableJobs: {
    component: 'None',
    label: 'phase2_my_job_selection',
  },
  minimumWeek: {
    component: 'NumberInput',
    label: 'phase2_minimum_week_label',
    limit: {
      min: 0,
    },
  },
  voiceChat: {
    component: 'Checkbox.Group',
    label: 'phase2_voicechat_title',
    data: [
      { value: '0', label: 'phase2_voicechat_value_0' },
      { value: '1', label: 'phase2_voicechat_value_1' },
      { value: '2', label: 'phase2_voicechat_value_2' },
    ],
  },
  region: {
    component: 'Select',
    label: 'phase1_region',
    data: Array.from(Region_Value, (v) => ({ value: v, label: `phase1_region_${v}` })),
  },
  language: {
    component: 'Select',
    label: 'phase1_language',
    data: Array.from(Language_Value, (v) => ({ value: v, label: `phase1_language_${v}` })),
  },
  heading: {
    component: 'Checkbox',
    label: 'phase2_isHeading_title',
  },
  firstTime: {
    component: 'Checkbox',
    label: 'phase2_isFirstTime_title',
  },
  firstWeekClear: {
    component: 'Checkbox',
    label: 'phase2_isFirstWeekClear_title',
  },
  worldFirstRace: {
    component: 'Checkbox',
    label: 'phase2_worldFirstRace_title',
  },
  farm: {
    component: 'Checkbox',
    label: 'phase2_isFarm_title',
  },
  boxNumber: {
    component: 'NumberInput',
    label: 'phase2_box_number_label',
    limit: {
      min: 0,
      max: 2,
    },
  },
};
