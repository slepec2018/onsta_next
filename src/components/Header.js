import Image from "next/image";
import { SearchIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div
      className="shadow-sm borde-b sticky top-0 bg-white z-30"
    >
      <div
        className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto"
      >
        <div
          className="h-24 w-24 relative hidden lg:inline-grid cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1024px-Instagram_logo.svg.png"
            fill
            className="object-contain"
            alt="onsta"
            priority={true}
          />
        </div>
        <div
          className="h-24 w-10 relative inline-grid lg:hidden cursor-pointer"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
            fill
            className="object-contain"
            alt="onsta"
          />
        </div>

        <div
          className="relative mt-1"
        >
          <div
            className="absolute top-2 left-2"
          >
            <SearchIcon
              className="h-5 text-gray-500"
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 pl-10 border-gray-500 text-sm focus:ring-black focus:border-black rounded-md"
          >
          </input>
        </div>

        <div
          className="flex space-x-4 items-center"
        >
          <HomeIcon
            className="hidden md:inline-flex h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
          />
          {session ? (
            <>
              <PlusCircleIcon
                className="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out"
              />
              <img
                src={session.user.image}
                alt="avatar"
                className="h-10 rounded-full cursor-pointer"
                onClick={signOut}
              />
            </>
          ) : (
            <button
              onClick={signIn}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
