import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../../../firebase";
import Header from "@/components/Header";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();

  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);
      const user = auth.currentUser.providerData[0];

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          userImg: user.photoURL,
          uid: user.uid,
          timestamp: serverTimestamp(),
          username: user.displayName.split(" ").join("").toLocaleLowerCase(),
        })
      }

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

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
          <div
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
              onClick={onGoogleClick}
              className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
