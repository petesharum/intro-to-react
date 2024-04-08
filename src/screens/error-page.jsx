import { useRouteError } from 'react-router-dom';

import { Title } from '@/lib/ui/title';

export default function ErrorPage({ message }) {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="relative col-span-full">
      <img
        className="w-1/2 max-w-[950px] md:translate-x-[10%]"
        src="/images/puppy.jpeg"
        alt="An empty paper bag."
      />
      <div className="left-1/2 top-1/2 flex flex-col gap-4 md:absolute md:w-1/2 md:translate-y-[-50%]">
        <Title>Oops!</Title>
        <div className="flex flex-col items-start gap-8">
          <p>
            An unexpected error has occurred. It&apos;s probably our fault, and
            we are very sorry. To make it up to you, here&apos;s a photo of a
            cute puppy created by AI.
          </p>
          <p>
            <i>
              {message ||
                error?.statusText ||
                error?.message ||
                'Unknown error!'}
            </i>
          </p>
        </div>
      </div>
    </div>
  );
}

export { ErrorPage };
