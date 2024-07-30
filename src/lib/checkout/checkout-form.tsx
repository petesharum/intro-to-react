import { Button } from '@/lib/ui/button';

type CheckoutFormProps = Pick<
  React.ComponentPropsWithoutRef<'form'>,
  'children' | 'onSubmit'
>;

function CheckoutForm({ children, onSubmit }: CheckoutFormProps) {
  return (
    <form
      className="grid grid-cols-12 gap-x-4 gap-y-8"
      id="payment-info"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

type CheckoutFormSubmitProps = {
  isPending: boolean;
  children: React.ReactNode;
};

function CheckoutFormSubmit({ isPending, children }: CheckoutFormSubmitProps) {
  return (
    <Button form="payment-info" type="submit" isPending={isPending}>
      {children}
    </Button>
  );
}

export { CheckoutForm, CheckoutFormSubmit };
