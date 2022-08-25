import BigContainer from '@components/base/BigContainer';
import { Paper } from '@mantine/core';
import { ArticleData } from '@type/data/ArticleData';

interface ArticleViewProps {
  article: ArticleData;
}

export default function ArticleView({ article }: ArticleViewProps) {
  return (
    <article>
      <Paper>
        <BigContainer></BigContainer>
      </Paper>
    </article>
  );
}
