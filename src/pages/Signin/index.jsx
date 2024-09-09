import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

export default function Signin() {
  const { login } = useAuth();

  return (
    <div className="bg-rainy-gradStart flex h-full w-full flex-col items-center p-10">
      <h1 className="text-textLight my-auto text-center text-3xl font-semibold leading-[3rem]">
        Weather
        <br /> Always <br />
        Good
        <br />
        <i class="fa-regular fa-face-smile"></i>
      </h1>

      <button
        onClick={login}
        className="text-text-textDark my-5 flex items-center gap-3 rounded-xl bg-white/50 px-6 py-4 font-semibold"
      >
        <i className="fa-brands fa-google text-lg"></i>
        Login with Google
      </button>
      <Link to="/" className="text-textNeutral mb-5 block">
        Login later
      </Link>
    </div>
  );
}
