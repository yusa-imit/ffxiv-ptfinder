import { ErrorDict } from '@constant/ErrorDict';

export type AvailableErrors = keyof typeof ErrorDict;
function Err(code: AvailableErrors): {
  code: AvailableErrors;
  message: { name: string; description: string };
} {
  return { code, message: ErrorDict[code] };
}
export { Err as Errors };
