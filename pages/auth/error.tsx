import { useRouter } from 'next/router';

export default function error() {
  const route = useRouter();
  return <p>{JSON.stringify(route.query)}</p>;
}
