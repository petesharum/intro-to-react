import { Link } from 'react-router-dom';

import { Button } from '@/lib/ui/button';
import { Title } from '@/lib/shared-components/title';

function EmptyCart() {
  return (
    <div className="relative col-span-full">
      <img
        className="w-1/2 max-w-[950px] md:translate-x-[10%]"
        src="/images/empty-bag.png"
        alt="An empty paper bag."
      />
      <div className="left-1/2 top-1/2 flex flex-col gap-4 md:absolute md:w-1/2 md:translate-y-[-50%]">
        <Title>Move along, folks. Nothing&nbsp;here to&nbsp;see</Title>
        <div className="flex flex-col items-start gap-8">
          <p>
            Psst...if you&apos;re really that hungry, try adding something to
            your cart.
          </p>
          <Button asChild>
            <Link to="/menu">Start a new order</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export { EmptyCart };
