import { ReactNode } from 'react';
import { SearchIndexContext } from '../../../type/SearchIndex';
import { SearchData } from './SearchPanelData';

function NodeGenerator(searchData: SearchData) {
  switch (searchData.component) {
    case 'Checkbox':
      break;

    default:
      break;
  }
}
export function PanelNodeGenerator(): Record<keyof SearchIndexContext, ReactNode> {
  return {
    a: <></>,
  };
}
