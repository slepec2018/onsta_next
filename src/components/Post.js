import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline"

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
      <p
        className="p-5 truncate"
      >
        <span
          className="font-bold mr-2"
        >
          {userName}
        </span>
        {caption}
      </p>
      <form
        className="flex items-center p-4"
      >
        <EmojiHappyIcon
          className="h-7"
        />
        <input
          type="text"
          placeholder="Enter your comment..."
          className="border-none flex-1 focus:ring-0"
        />
        <button
          className="text-blue-400 font-bold"
        >
          Post
        </button>
      </form>
    </div>
  )
}
