import { WithId, Document } from 'mongodb';

export function dbIdRemover<T extends WithId<Document>, R = Document>(value: T): R {
  const { _id, ...rest } = value;
  return rest as R;
}
