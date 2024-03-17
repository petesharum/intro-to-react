// TODO: style
import { useRouteError } from 'react-router-dom';

import { Title } from '@/components/ui/title';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Title>Oops!</Title>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export { ErrorPage };
