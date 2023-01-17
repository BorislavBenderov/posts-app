import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const onLogout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      {user ? (
        <Link to="/create">Create Post</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <div>
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width="100" height="100" />
            <button onClick={onLogout}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
