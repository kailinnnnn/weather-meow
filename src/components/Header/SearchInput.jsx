import api from "../../utils/api";

export default function SearchInput({
  inputRef,
  onSearch,
  onClose,
  history,
  setWeather,
  setIsLoading,
}) {
  const handleSearchLocation = async (location) => {
    setIsLoading(true);
    const data = await api.getForecastWeather(location);
    setWeather(data);
    setIsLoading(false);
  };

  return (
    <div className="absolute flex h-full w-full flex-col items-center gap-2 lg:right-0 lg:w-fit">
      <div className="flex w-full gap-2">
        <div className="flex grow items-center rounded-lg bg-neutral-100">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            onClick={onSearch}
          >
            <i className="fa-solid fa-magnifying-glass p-5 text-lg text-textDark"></i>
          </button>
          <input
            type="text"
            className="w-full rounded-lg bg-transparent p-2 leading-8 focus:outline-none"
            placeholder="Search for Places ... "
            ref={inputRef}
          />
        </div>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-lg text-textDark"></i>
        </button>
      </div>
      <div className="h-content flex w-full flex-col rounded-lg">
        {history &&
          history.map((item, index) => (
            <button
              key={index}
              className="flex h-12 w-full items-center bg-neutral-100/40 p-5 text-textDark first:rounded-t-lg last:rounded-b-lg hover:bg-neutral-100/55"
              onClick={() => handleSearchLocation(item.name)}
            >
              <i className="fa-solid fa-clock-rotate-left pr-3 text-xs"></i>
              {item.name}, {item.country}
            </button>
          ))}
      </div>
    </div>
  );
}
