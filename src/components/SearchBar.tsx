function SearchBar() {
  return (
    <div className="mx-auto mb-5 flex w-11/12 max-w-[730px]  rounded-2xl bg-darkCard p-2.5 align-middle lg:w-4/6">
      <div className="my-auto px-1 min-[350px]:px-2 md:px-6">
        <svg
          className="w-[20px] md:w-auto"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.6087 0C4.7591 0 0 4.74609 0 10.5797C0 16.4133 4.75915 21.1594 10.6087 21.1594C13.2162 21.1594 15.6071 20.2163 17.4563 18.6542L22.575 23.747C22.7449 23.9157 22.9664 24 23.1884 24C23.4118 24 23.635 23.9145 23.8049 23.7438C24.1435 23.4032 24.142 22.8527 23.8017 22.5139L18.6893 17.4274C20.2652 15.5807 21.2174 13.189 21.2174 10.5797C21.2174 4.74609 16.4582 0 10.6087 0ZM16.9346 16.7705C18.5071 15.1744 19.4782 12.9879 19.4782 10.5797C19.4782 5.70488 15.4994 1.73908 10.6087 1.73908C5.71794 1.73908 1.73913 5.70488 1.73913 10.5797C1.73913 15.4542 5.71794 19.4203 10.6087 19.4203C13.0163 19.4203 15.2029 18.4591 16.8027 16.9016C16.8211 16.879 16.8407 16.8571 16.8617 16.836C16.885 16.8125 16.9094 16.7907 16.9346 16.7705Z"
            fill="#0079FF"
          />
        </svg>
      </div>

      <input
        placeholder="Search Github username..."
        className="w-full bg-transparent pl-1 placeholder:text-xs placeholder:text-white focus:outline-none max-[350px]:pr-1 sm:pl-2 sm:placeholder:text-base"
      />

      <p className="my-auto hidden whitespace-nowrap px-4 pt-1 text-xs text-redText md:px-8 md:text-base">
        No results
      </p>

      <div className="ml-auto">
        <button
          type="submit"
          className="rounded-lg bg-primaryColor px-3 py-3 text-sm font-bold text-white hover:bg-[#60ABFF] md:px-6 md:text-base"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
