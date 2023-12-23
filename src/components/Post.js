import { useState } from "react";
import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function Post({ img, userImg, caption, userName, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  async function sendComment(event) {
    event.preventDefault();
    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    })
  } 

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
      {session && (
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
      )}
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
      {session && (
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
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            type="submit"
            className="text-blue-400 font-bold disabled:text-blue-200"
            disabled={!comment.trim()}
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}
