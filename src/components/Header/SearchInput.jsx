import api from "../../utils/api";

export default function SearchInput({
  inputRef,
  onSearch,
  onClose,
  history,
  setWeather,
  setIsLoading,
}) {
  return (
    <div className="top-100 absolute left-0 right-0 flex h-full w-full flex-col items-center gap-2">
      <div className="flex w-full gap-2">
        <div className="flex grow items-center rounded-lg bg-neutral-100/40">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            onClick={onSearch}
          >
            <i className="fa-solid fa-magnifying-glass text-textDark p-5 text-lg"></i>
          </button>
          <input
            type="text"
            className="w-full rounded-lg bg-transparent p-2 leading-8 focus:outline-none"
            placeholder="Search for Places ... "
            ref={inputRef}
          />
        </div>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100/40 hover:bg-neutral-100/55"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark text-textDark text-lg"></i>
        </button>
      </div>
      <div className="h-content flex w-full flex-col rounded-lg">
        {history.map((item, index) => (
          <button
            key={index}
            className="text-textDark flex h-12 w-full items-center bg-neutral-100/40 p-5 first:rounded-t-lg last:rounded-b-lg hover:bg-neutral-100/55"
            onClick={async () => {
              setIsLoading(true);
              const data = await api.getForecastWeather(item.name);
              setWeather(data);
              setIsLoading(false);
            }}
          >
            <i className="fa-solid fa-clock-rotate-left pr-3 text-xs"></i>
            {item.name}, {item.country}
          </button>
        ))}
      </div>
    </div>
  );
}
