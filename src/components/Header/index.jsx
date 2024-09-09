import { useState, useRef } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/authContext";
import firebase from "../../utils/firebase";
import Menu from "./Menu";
import SearchInput from "./SearchInput";

export default function Header({ weather, setWeather, setIsLoading, theme }) {
  const [isShowInput, setIsShowInput] = useState(false);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { user, logout, setUser } = useAuth();
  const inputRef = useRef(null);

  const updateUserHistory = async (location) => {
    const newHistory = [
      ...user.history,
      { name: location.name, country: location.country },
    ];
    setUser({
      ...user,
      history: newHistory,
    });
    firebase.updateUserData(user.id, { history: newHistory });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setIsShowInput(false);
    const location = inputRef.current.value;
    const data = await api.getForecastWeather(location);
    updateUserHistory(data.location);
    setWeather(data);
    setIsLoading(false);
  };

  return (
    <header className="relative flex h-12 items-center justify-between">
      {isShowInput ? (
        <SearchInput
          inputRef={inputRef}
          onSearch={handleSearch}
          onClose={() => setIsShowInput(false)}
          history={user.history}
          setWeather={setWeather}
          setIsLoading={setIsLoading}
        />
      ) : (
        <>
          <Menu
            isVisible={isShowMenu}
            theme={theme}
            onClose={() => setIsShowMenu(false)}
            user={user}
            logout={logout}
          />
          <button
            className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-neutral-100/30"
            onClick={() => setIsShowMenu(true)}
          >
            <i className="fa-solid fa-bars text-textDark text-xl"></i>
          </button>
          <h1 className="text-textDark mx-auto flex font-medium">
            <i className="fa-solid fa-location-dot pr-2 text-sm"></i>
            {weather.location.name}, {weather.location.country}
          </h1>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-lg hover:bg-neutral-100/30"
            onClick={() => setIsShowInput(true)}
          >
            <i className="fa-solid fa-magnifying-glass text-textDark text-xl"></i>
          </button>
        </>
      )}
    </header>
  );
}
