import { Editor, RichTextEditorProps } from '@mantine/rte';
import dynamic from 'next/dynamic';
import {
  useContext,
  useEffect,
  forwardRef,
  RefAttributes,
  ForwardRefExoticComponent,
  Ref,
} from 'react';
import ReactQuill from 'node_modules/react-quill';

export default dynamic(() => import('@mantine/rte'), {
  ssr: false,
});

export const RTEDynamicForwarded = dynamic<
  RichTextEditorProps &
    RefAttributes<ReactQuill> & {
      forwardedRef: Ref<Editor>;
    }
>(
  async () => {
    const { default: RTE } = await import('@mantine/rte');
    return ({ forwardedRef, ...props }) => <RTE ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);
