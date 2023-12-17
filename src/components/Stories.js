import { useState, useEffect } from "react";
const minifaker = require("minifaker");
require("minifaker/locales/en");
import Story from "./Story";

export default function Stories() {
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
    <div>
      {storyUsers && (
        storyUsers.map(user => (
          <Story
            key={user.id}
            username={user.username}
            img={user.img}
          />
        )
      ))}
    </div>
  )
}
