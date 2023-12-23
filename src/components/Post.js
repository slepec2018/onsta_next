import { useState, useEffect } from "react";
import Moment from "react-moment";
import { DotsHorizontalIcon, HeartIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Post({ img, userImg, caption, userName, id }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex(like => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

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

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      })
    }
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
            {hasLiked ? (
              <HeartIconFilled
                className="text-red-400 btn"
                onClick={likePost}
              />
            ) : (
              <HeartIcon
                className="btn"
                onClick={likePost}
              />
            )}
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
        {likes.length > 0 && (
          <p
            className="font-bold mb-1"
          >
            {likes.length} likes
          </p>
        )}
        <span
          className="font-bold mr-2"
        >
          {userName}
        </span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div
          className="mx-10 max-h-24 overflow-y-scroll scrollbar-none"
        >
          {comments.map((comment) => (
            <div
              className="flex items-center space-x-2 mb-2"
            >
              <img
                src={comment.data().userImage}
                alt="user-image"
                className="h-7 rounded-full object-cover"
              />
              <p
                className="font-semibold "
              >
                {comment.data().username}
              </p>
              <p
                className="flex-1 truncate"
              >
                {comment.data().comment}
              </p>
              <Moment
                fromNow
              >
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
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
