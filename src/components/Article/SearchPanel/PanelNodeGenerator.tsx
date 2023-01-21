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
  TextInput,
  TextInputProps,
  createStyles,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { SearchDataValue } from './SearchPanelData';

const useFormStyle = createStyles((theme) => ({
  input: {
    minWidth: '80%',
    maxWidth: '100%',
    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export const Node = {
  ArticleType: (props: Omit<SelectProps, 'data' | 'label' | 'defaultValue'>) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).articleType;
    return (
      <Select
        data={data.data!}
        label={data.label}
        defaultValue={(data.data!.at(0) as SelectItem).value}
        {...props}
      />
    );
  },
  Title: (props: TextInputProps) => {
    const { classes } = useFormStyle();
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).title;
    return <TextInput {...props} className={classes.input} label={data.label} />;
  },
  IsTemporary: (props: CheckboxProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).isTemporary;
    return (
      <Input.Wrapper label={data.label}>
        <Checkbox label={data.data[0]} {...props} />
      </Input.Wrapper>
    );
  },
  MinimumWeek: (props: NumberInputProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).minimumWeek;
    return <NumberInput label={data.label} defaultValue={0} min={data.limit.min} {...props} />;
  },
  VoiceChat: (props: Omit<CheckboxGroupProps, 'children'>) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).voiceChat;
    return (
      <Checkbox.Group defaultValue={[]} {...props} label={data.label}>
        {data.data.map((v) => (
          <Checkbox label={v.label} value={v.value} key={v.value} />
        ))}
      </Checkbox.Group>
    );
  },
  Region: (props: Omit<SelectProps, 'data' | 'label'>) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).region;
    return <Select data={data.data} label={data.label} {...props} />;
  },
  Language: (props: Omit<SelectProps, 'data' | 'label'>) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).language;
    return <Select data={data.data} label={data.label} {...props} />;
  },
  Heading: (props: CheckboxProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).heading;
    return <Checkbox label={data.label} {...props} />;
  },
  FirstTime: (props: CheckboxProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).firstTime;
    return <Checkbox label={data.label} {...props} />;
  },
  FirstWeekClear: (props: CheckboxProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).firstWeekClear;
    return <Checkbox label={data.label} {...props} />;
  },
  WorldFirstRace: (props: CheckboxProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).worldFirstRace;
    return <Checkbox label={data.label} {...props} />;
  },
  Farm: (props: CheckboxProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).farm;
    return <Checkbox label={data.label} {...props} />;
  },
  BoxNumber: (props: NumberInputProps) => {
    const { t } = useTranslation('common');
    const data = SearchDataValue(t).boxNumber;
    return <NumberInput label={data.label} min={data.limit.min} max={data.limit.max} {...props} />;
  },
};
