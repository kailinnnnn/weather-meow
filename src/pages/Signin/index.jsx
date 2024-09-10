import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

export default function Signin() {
  const { login } = useAuth();

  return (
    <div className="flex h-full w-full flex-col items-center bg-rainy-gradStart p-10">
      <h1 className="my-auto text-center text-3xl font-semibold leading-[3rem] text-textLight">
        Weather
        <br /> Always <br />
        Good
        <br />
        <i className="fa-regular fa-face-smile"></i>
      </h1>

      <button
        onClick={login}
        className="text-text-textDark my-5 flex items-center gap-3 rounded-xl bg-white/50 px-6 py-4 font-semibold"
      >
        <i className="fa-brands fa-google text-lg"></i>
        Login with Google
      </button>
      <Link to="/" className="mb-5 block text-textNeutral">
        Login later
      </Link>
    </div>
  );
}
