import { ReactNode } from 'react';
import {
  Checkbox,
  CheckboxGroupProps,
  CheckboxProps,
  Input,
  InputProps,
  NumberInput,
  NumberInputProps,
  Select,
  SelectItem,
  SelectProps,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { SearchIndexContext } from '../../../type/SearchIndex';
import { SearchData, SearchDataValue } from './SearchPanelData';

export function PanelNodeGenerator() {
  const { t } = useTranslation('common');
  const data = SearchDataValue(t);
  return {
    ArticleType: (props: Omit<SelectProps, 'data' | 'label' | 'defaultValue'>) => (
      <Select
        data={data.articleType.data!}
        label={data.articleType.label}
        defaultValue={(data.articleType.data!.at(0) as SelectItem).value}
        {...props}
      />
    ),
    Title: (props: InputProps) => (
      <Input.Wrapper label={data.title.label}>
        <Input {...props} />
      </Input.Wrapper>
    ),
    IsTemporary: (props: CheckboxProps) => <Checkbox label={data.isTemporary.label} {...props} />,
    MinimumWeek: (props: NumberInputProps) => (
      <NumberInput
        label={data.minimumWeek.label}
        defaultValue={0}
        min={data.minimumWeek.limit!.min!}
        {...props}
      />
    ),
    VoiceChat: (props: Omit<CheckboxGroupProps, 'children'>) => (
      <Checkbox.Group defaultValue={[]} {...props}>
        {(data.voiceChat.data as SelectItem[]).map((v) => (
          <Checkbox label={v.label} value={v.value} />
        ))}
      </Checkbox.Group>
    ),
    Region: (props: Omit<SelectProps, 'data' | 'label'>) => (
      <Select data={data.region.data!} label={data.region.label} {...props} />
    ),
    Language: (props: Omit<SelectProps, 'data' | 'label'>) => (
      <Select data={data.language.data!} label={data.language.label} {...props} />
    ),
    Heading: (props: CheckboxProps) => <Checkbox label={data.heading.label} {...props} />,
    FirstTime: (props: CheckboxProps) => <Checkbox label={data.firstTime.label} {...props} />,
    FirstWeekClear: (props: CheckboxProps) => (
      <Checkbox label={data.firstWeekClear.label} {...props} />
    ),
    WorldFirstRace: (props: CheckboxProps) => (
      <Checkbox label={data.worldFirstRace.label} {...props} />
    ),
    Farm: (props: CheckboxProps) => <Checkbox label={data.farm.label} {...props} />,
    BoxNumber: (props: NumberInputProps) => (
      <NumberInput
        label={data.boxNumber.label}
        min={data.boxNumber.limit!.min!}
        max={data.boxNumber.limit!.max!}
        {...props}
      />
    ),
  };
}
