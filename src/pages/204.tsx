import Error from 'next/error';

export default function Custom204() {
  return <Error statusCode={204} title="No Content" />;
}
