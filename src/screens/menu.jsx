import { Title } from '@/components/ui/title';
import { Filters } from '@/components/menu/filters';
import { MenuItems } from '@/components/menu/menu-items';

function Menu() {
  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 pt-8">
        <Filters />
      </div>
      <main className="col-span-10 flex flex-col gap-8">
        <Title>Menu</Title>
        <MenuItems />
      </main>
    </>
  );
}

export { Menu };
