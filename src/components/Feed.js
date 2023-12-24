import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestions from "./Suggestions";
import { useRecoilState } from "recoil";
import { userState } from "../../atom/userAtom";

export default function Feed() {
  const [currentUser] = useRecoilState(userState);

  return (
    <main
      className={`grid ${currentUser ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto" : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"}`}
    >
      <section
        className="md:col-span-2"
      >
        <Stories />
        <Posts />
      </section>
      <section
        className="hidden md:inline-grid md:col-span-1"
      >
        <div
          className="fixed w-[380px]"
        >
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  )
}
