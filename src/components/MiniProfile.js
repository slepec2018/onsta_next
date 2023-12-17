export default function MiniProfile() {
  return (
    <div
      className="flex items-center justify-between mt-14 ml-10"
    >
      <img
        src="https://avatars.dzeninfra.ru/get-zen_doc/1626348/pub_5e2d90bae6e8ef00ad1aa039_5e2d9c90028d6800b09ba9e0/scale_1200"
        alt="user-image"
        className="h-16 rounded-full border p-[2px]"
      />
      <div
        className="flex-1 ml-4"
      >
        <h2
          className="font-bold"
        >
          codewithme
        </h2>
        <h3
         className="text-sm text-gray-400"
        >
          Welcome to onstagram
        </h3>
      </div>
      <button
        className="font-semibold text-blue-400 text-sm"
      >
        Sign out
      </button>
    </div>
  )
}
