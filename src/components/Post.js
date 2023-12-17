import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon } from "@heroicons/react/outline"

export default function Post({ img, userImg, caption, userName, id }) {
  return (
    <div
      className="bg-white my-7 border rounded-md "
    >
      <div
        className="flex items-center p-5"
      >
        <img
          src={userImg}
          alt={userName}
          className="h-12 rounded-full object-cover border p-1 mr-3"
        />
        <p
          className="font-bold flex-1"
        >
          {userName}
        </p>
        <DotsHorizontalIcon
          className="h-5"
        />
      </div>
      <img
        src={img}
        className="object-cover w-full"
      />
      <div
        className="flex justify-between px-4 pt-4"
      >
        <div
          className="flex space-x-4"
        >
          <HeartIcon
            className="btn"
          />
          <ChatIcon
            className="btn"
          />
        </div>
        <BookmarkIcon
          className="btn"
        />
      </div>
    </div>
  )
}
