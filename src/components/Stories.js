import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atom/userAtom";
const minifaker = require("minifaker");
require("minifaker/locales/en");
import Story from "./Story";

export default function Stories() {
  const [storyUsers, setStoryUsers] = useState([]);
  const [currentUser] = useRecoilState(userState);

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
          { currentUser && (
            <Story
              username={currentUser?.username}
              img={currentUser?.userImg}
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
