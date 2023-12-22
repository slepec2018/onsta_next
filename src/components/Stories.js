import { useState, useEffect } from "react";
const minifaker = require("minifaker");
require("minifaker/locales/en");
import Story from "./Story";
import { useSession } from "next-auth/react";

export default function Stories() {
  const { data: session } = useSession();
  const [storyUsers, setStoryUsers] = useState([]);

  useEffect(() => {
    const storyUsers = minifaker.array(20, (i) => ({ 
      username: minifaker.username({ locale: "en" }).toLowerCase(),
      img: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      id: i,
    }));

    setStoryUsers(storyUsers);
  }, []);
  
  return (
    <div
      className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border-1 overflow-x-scroll rounded-sm scrollbar-none"
    >
      {storyUsers && (
        <>
          { session && (
            <Story
              username={session.user.username}
              img={session.user.image}
              isUser="true"
            />
          )}
          {storyUsers.map(user => (
            <Story
              key={user.id}
              username={user.username}
              img={user.img}
            />
          ))}
        </>
      )}
    </div>
  )
}
