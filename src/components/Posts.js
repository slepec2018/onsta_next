import Post from "./Post";

export default function Posts() {
  const posts = [
    {
      id: 1,
      userName: "codewithsahand",
      userImg: "https://avatars.dzeninfra.ru/get-zen_doc/1626348/pub_5e2d90bae6e8ef00ad1aa039_5e2d9c90028d6800b09ba9e0/scale_1200",
      img: "https://images.unsplash.com/photo-1683009427500-71296178737f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Nice picture"
    },
    {
      id: 2,
      userName: "ghavidelsahand",
      userImg: "https://avatars.dzeninfra.ru/get-zen_doc/1626348/pub_5e2d90bae6e8ef00ad1aa039_5e2d9c90028d6800b09ba9e0/scale_1200",
      img: "https://images.unsplash.com/photo-1702012464618-3cee08e53644?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "New picture from my city"
    }
  ];

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  )
}
