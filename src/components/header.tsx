import Image from 'next/image';
import Link from 'next/link';

import ModeToggle from '@/components/mode-toggle';
import SearchInput from '@/components/search-input';
import UserAvatar from '@/components/user-avatar';

const Header = () => (
  <header className="sticky top-0 z-20 flex h-16 w-full items-center border-b border-b-slate-200 bg-white/50 backdrop-blur-md dark:border-b-slate-700 dark:bg-slate-900/40">
    <div className="mx-8 flex w-full items-center justify-between md:container md:mx-auto">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="flex h-10 w-full gap-2 text-slate-800 dark:text-white"
        >
          {/* <img src={logo} alt="Vidly logo" className="w-full h-full" /> */}
          <Image
            src="/favicon.svg"
            alt="FilmFiesta"
            width={40}
            height={40}
            // className="w-full"
          />
          <span className="self-end text-xl font-semibold">FilmFiesta</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <SearchInput />
        <ModeToggle />
        <UserAvatar />
      </div>
    </div>
  </header>
);

export default Header;
