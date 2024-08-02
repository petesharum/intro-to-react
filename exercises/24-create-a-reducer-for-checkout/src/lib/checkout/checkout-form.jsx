import { Button } from '@/lib/ui/button';

function CheckoutForm({ children, onSubmit }) {
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

function CheckoutFormSubmit({ isPending, children }) {
  return (
    <Button form="payment-info" type="submit" isPending={isPending}>
      {children}
    </Button>
  );
}

export { CheckoutForm, CheckoutFormSubmit };
