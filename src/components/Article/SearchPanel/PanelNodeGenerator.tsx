import { ReactNode } from 'react';
import { Checkbox, Input, NumberInput, Select, SelectItem } from '@mantine/core';
import ContentRetriever, { ContentRetrieverProps } from '@components/ContentRetriever';
import { SearchIndexContext } from '../../../type/SearchIndex';
import { SearchData, SearchDataValue } from './SearchPanelData';

function NodeGenerator(searchData: SearchData) {
  switch (searchData.component) {
    case 'None':
      throw new Error(
        'None component cannot be generated by node generator, please make this component manually.'
      );
    case 'Select':
      return <Select data={searchData.data!} />;
    case 'Input':
      return (
        <Input.Wrapper label={searchData.label}>
          <Input />
        </Input.Wrapper>
      );
    case 'Checkbox':
      return <Checkbox label={searchData.label} />;
    case 'NumberInput':
      return <NumberInput min={searchData.limit!.min} max={searchData.limit!.max} />;
    case 'Checkbox.Group':
      return (
        <Checkbox.Group defaultValue={[]} label={searchData.label}>
          {(searchData.data as SelectItem[]).map((v) => (
            <Checkbox label={v.label} value={v.value} />
          ))}
        </Checkbox.Group>
      );
    default:
      break;
  }
}
export function PanelNodeGenerator(): Record<
  keyof SearchIndexContext,
  ReactNode | ((props: ContentRetrieverProps) => JSX.Element)
> {
  return {
    articleType: NodeGenerator(SearchDataValue.articleType),
    title: NodeGenerator(SearchDataValue.title),
    isTemporary: NodeGenerator(SearchDataValue.isTemporary),
    content: <></>,
    availableJobs: <></>,
    minimumWeek: NodeGenerator(SearchDataValue.minimumWeek),
    voiceChat: NodeGenerator(SearchDataValue.voiceChat),
    region: NodeGenerator(SearchDataValue.region),
    language: NodeGenerator(SearchDataValue.language),
    heading: NodeGenerator(SearchDataValue.heading),
    firstTime: NodeGenerator(SearchDataValue.firstTime),
    firstWeekClear: NodeGenerator(SearchDataValue.firstWeekClear),
    worldFirstRace: NodeGenerator(SearchDataValue.worldFirstRace),
    farm: NodeGenerator(SearchDataValue.farm),
    boxNumber: NodeGenerator(SearchDataValue.boxNumber),
  };
}
