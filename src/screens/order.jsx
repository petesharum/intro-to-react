import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Order() {
  return (
    <div className="flex h-screen w-full flex-col">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b px-4 md:px-6">
        <a className="flex items-center gap-2" href="#">
          <Package2Icon className="h-6 w-6" />
          <span className="text-lg font-semibold">Acme POS</span>
        </a>
      </header>
      <main className="flex flex-1 flex-row gap-4 p-4 md:gap-8 md:p-10">
        <div className="flex w-[300px] flex-col rounded-lg border">
          <div className="flex h-12 items-center border-b px-4">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            <h1 className="font-medium">Categories</h1>
          </div>
          <div className="h-[calc(100vh-_theme(spacing.16)-_theme(spacing.12))] flex-1 overflow-auto">
            <ul className="grid gap-1 text-sm">
              <li className="py-2 pl-4">Appetizers</li>
              <li className="py-2 pl-4">Main Courses</li>
              <li className="py-2 pl-4">Beverages</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 flex-col rounded-lg border">
          <div className="flex h-12 items-center border-b px-4">
            <h1 className="font-medium">Menu Items</h1>
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="bg-white pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                  placeholder="Search items..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="h-[calc(100vh-_theme(spacing.16)-_theme(spacing.12))] flex-1 overflow-auto">
            <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
              <Button
                className="flex aspect-square w-full flex-col items-start gap-1 rounded-lg p-4"
                variant="ghost"
              >
                <img
                  alt="Quesadilla"
                  className="aspect-video rounded-lg object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div className="font-semibold">Quesadilla</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Cheese, tortilla, chicken
                </div>
                <div className="ml-auto font-semibold">$5.99</div>
              </Button>
              <Button
                className="flex aspect-square w-full flex-col items-start gap-1 rounded-lg p-4"
                variant="ghost"
              >
                <img
                  alt="Burger"
                  className="aspect-video rounded-lg object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div className="font-semibold">Burger</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Beef patty, lettuce, tomato
                </div>
                <div className="ml-auto font-semibold">$7.99</div>
              </Button>
              <Button
                className="flex aspect-square w-full flex-col items-start gap-1 rounded-lg p-4"
                variant="ghost"
              >
                <img
                  alt="Salad"
                  className="aspect-video rounded-lg object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div className="font-semibold">Salad</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Mixed greens, vinaigrette
                </div>
                <div className="ml-auto font-semibold">$4.99</div>
              </Button>
              <Button
                className="flex aspect-square w-full flex-col items-start gap-1 rounded-lg p-4"
                variant="ghost"
              >
                <img
                  alt="Pizza"
                  className="aspect-video rounded-lg object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div className="font-semibold">Pizza</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Pepperoni, cheese, marinara
                </div>
                <div className="ml-auto font-semibold">$9.99</div>
              </Button>
              <Button
                className="flex aspect-square w-full flex-col items-start gap-1 rounded-lg p-4"
                variant="ghost"
              >
                <img
                  alt="Tacos"
                  className="aspect-video rounded-lg object-cover"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div className="font-semibold">Tacos</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Beef, lettuce, cheese
                </div>
                <div className="ml-auto font-semibold">$6.99</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-[300px] flex-col rounded-lg border">
          <div className="flex h-12 items-center border-b px-4">
            <h1 className="font-medium">Order</h1>
          </div>
          <div className="h-[calc(100vh-_theme(spacing.16)-_theme(spacing.12))] flex-1 overflow-auto">
            <div className="grid gap-4 px-4">
              <div className="flex items-center">
                <div className="font-semibold">Quesadilla</div>
                <div className="ml-auto">x1</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold">Burger</div>
                <div className="ml-auto">x1</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold">Salad</div>
                <div className="ml-auto">x1</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold">Pizza</div>
                <div className="ml-auto">x1</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold">Tacos</div>
                <div className="ml-auto">x1</div>
              </div>
            </div>
            <div className="border-t px-4 py-2">
              <div className="flex items-center">
                <div className="font-semibold">Total</div>
                <div className="ml-auto font-semibold">$34.95</div>
              </div>
            </div>
          </div>
          <Button className="rounded-none">Submit Order</Button>
        </div>
      </main>
    </div>
  );
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export { Order };
