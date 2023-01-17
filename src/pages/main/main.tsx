import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "newposts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);

    setPostsList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postsList?.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
};
