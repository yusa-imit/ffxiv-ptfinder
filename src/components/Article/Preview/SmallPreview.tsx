import { Card } from '@mantine/core';
import { ArticleDataSummaryWithMeta } from '../../../type/data/ArticleData';
import { User } from '../../../type/data/User';

interface SmallPreviewProps {
  articleWithMeta: ArticleDataSummaryWithMeta;
  userData: User;
}
export default function SmallPreview({ articleWithMeta, userData }: SmallPreviewProps) {
  return <Card>{JSON.stringify(articleWithMeta)}</Card>;
}
