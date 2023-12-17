import { getProviders, signIn } from "next-auth/react";
import Header from "@/components/Header";

export default function signin({providers}) {
  return (
    <>
      <Header />
      <div
        className="flex justify-center space-x-7 mt-20"
      >
        <img
          src="https://mlabs-wordpress-site.s3.amazonaws.com/wp-content/uploads/2022/08/gerenciador-instagram.png"
          alt="onsta-style"
          className="hidden object-cover rotate-6 md:inline-flex md:w-48"
        />
        <div
          className=""
        >
          {Object.values(providers).map((provider) => (
            <div
              key={provider.name}
              className="flex flex-col items-center"
            >
              <img
                src="https://www.comopegarmina.com.br/wp-content/uploads/2019/01/instagram-logo-2.png"
                alt="onsta"
                className="w-32 object-cover"
              />
              <p
                className="text-sm italic my-10 text-center"
              >
                This app is created for learning purpose
              </p>
              <button
                onClick={() => signIn(provider.id, {callbackUrl: "/"})}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {providers}
  }
}
