import { Link } from "react-router-dom";

export default function Menu({ isVisible, theme, onClose, user, logout }) {
  const accountButton = user ? (
    <div className="flex h-20 items-center gap-3 pl-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
        {user.name.charAt(0).toUpperCase()}
      </div>
      Hello ! {user.name}
    </div>
  ) : (
    <Link to="/signin" className="flex h-20 w-full items-center pl-10">
      Signin
    </Link>
  );

  return (
    isVisible && (
      <div className="fixed inset-0 z-10 flex">
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div
          className={`translate-x-4/5 fixed left-0 top-0 z-20 flex h-full min-h-screen w-4/5 transform flex-col shadow-xl bg-${theme}-nav pt-10 transition-transform duration-500`}
        >
          <div className="flex h-12 w-12 items-center pl-12">
            <i className="fa-solid fa-arrow-left" onClick={onClose}></i>
          </div>
          {accountButton}
          {user && (
            <Link
              to="/signin"
              className="flex h-20 w-full items-center pl-12"
              onClick={logout}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    )
  );
}
