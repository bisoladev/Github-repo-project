/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { moon, sun } from './icons';
import fetchUserData from './axios';

function App() {
  const [username, setUsername] = useState('octocat');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check for system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    // Check for manual preference
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['user', username],
    queryFn: () => fetchUserData(username),
    enabled: false,
  });

  const totalRepos = data?.total_private_repos
    ? // eslint-disable-next-line no-unsafe-optional-chaining
      data?.public_repos + data?.total_private_repos
    : data?.public_repos;
  const blogUrl: string = data?.blog;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="h-screen bg-bgLight dark:bg-bgDark">
      <div className="flex h-[100%] w-screen flex-col justify-center bg-bgLight py-10 align-middle text-white dark:bg-bgDark">
        <div className="mx-auto flex w-11/12 max-w-[730px] justify-between px-2 py-8 align-middle lg:w-4/6">
          <h1 className="text-[26px] font-bold text-[#222731] dark:text-white">
            devfinder
          </h1>
          <div className="my-auto flex align-middle">
            <p className="text-[13px] font-bold tracking-[2.5px] text-[#222731] dark:text-[#90A4D4]">
              {isDarkMode ? 'LIGHT' : 'DARK'}
            </p>{' '}
            <span className="pl-4">
              <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? sun : moon}
              </button>
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-shadow mx-auto mb-5 flex w-11/12 max-w-[730px] rounded-2xl bg-lightCard p-2.5 align-middle dark:bg-darkCard dark:shadow-none lg:w-4/6">
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
              value={username}
              // onKeyDown={handleKeyDownSearchDown}
              onChange={handleInputChange}
              className="w-full bg-transparent pl-1 font-normal placeholder:text-xs placeholder:text-lightText focus:outline-none dark:placeholder:text-white max-[350px]:pr-1 sm:pl-2 sm:placeholder:text-base"
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
        </form>
        <div className="card-shadow mx-auto flex w-11/12 max-w-[730px] flex-col justify-center rounded-2xl bg-lightCard p-8 align-middle text-lightText dark:bg-darkCard dark:text-white dark:shadow-none md:p-10 lg:w-4/6">
          <div className="grid-rows-auto grid grid-cols-[70px_auto] gap-x-6 gap-y-8 md:grid-cols-[150px_auto]">
            <div className=" col-start-1 col-end-2 row-start-1 row-end-3 h-[70px] w-[70px] rounded-full bg-bgLight dark:bg-bgDark md:h-[118px] md:w-[118px]">
              <img
                src={data?.avatar_url ?? '/img/oval-dp.svg'}
                alt="Profile pic"
                className="h-[70px] w-[70px] rounded-full md:h-[118px] md:w-[118px]"
              />
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-2">
              <div className="flex flex-col  lg:flex-row lg:justify-between">
                <div>
                  <h1 className="mb-1 text-base font-bold text-darkText dark:text-white md:text-2xl ">
                    {data ? data?.name : 'The Octocat'}
                  </h1>
                  <a
                    href="/"
                    className="text-[13px] text-primaryColor md:text-base"
                  >
                    @{data ? data?.login : 'octocat'}
                  </a>
                </div>
                <div>
                  <p className="text-[13px] md:text-[15px]">
                    Joined 25 Jan 2011
                  </p>
                </div>
              </div>
            </div>
            <div className="col-start-1 col-end-3 row-start-2 row-end-3 lg:col-start-2">
              <p
                className={`text-[13px] md:pt-8 md:text-[15px] lg:pt-0 ${
                  !data?.twitter_username ? 'dark:text-[#8E95A3]' : ''
                }`}
              >
                {data?.bio ? data?.bio : 'This profile has no bio'}
              </p>
            </div>
            <div className="col-start-1 col-end-3 row-start-3 row-end-4 mb-4 rounded-[10px] bg-bgLight px-6 py-3 dark:bg-bgDark md:px-10 lg:col-start-2">
              <ul className="grid grid-cols-3 gap-5 text-darkText dark:text-white">
                <li>
                  <p className="text-[11px] md:text-[13px]">Repos</p>
                  <p className="text-base font-bold md:text-[22px]">
                    {data ? totalRepos : '8'}
                  </p>
                </li>
                <li>
                  <p className="text-[11px] md:text-[13px]">Followers</p>
                  <p className="text-base font-bold  md:text-[22px]">
                    {data ? data?.followers : '3938'}
                  </p>
                </li>
                <li>
                  <p className="text-[11px] md:text-[13px]">Following</p>
                  <p className="text-base font-bold  md:text-[22px]">
                    {data ? data?.following : '9'}
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-start-1 col-end-3 row-start-4 row-end-5 lg:col-start-2">
              <ul className="grid grid-cols-1 gap-x-10 gap-y-5 text-[15px] min-[500px]:grid-cols-2">
                <li className="flex">
                  <svg
                    width="14"
                    height="20"
                    viewBox="0 0 14 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="003-pin">
                      <path
                        id="Shape"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.03013 0.00158203C9.42758 0.0504882 11.5835 1.33021 12.7973 3.4249C14.038 5.56599 14.072 8.13786 12.8882 10.3047L7.92872 19.3823L7.92196 19.3943C7.7038 19.7736 7.3129 20 6.87634 20C6.43974 20 6.04884 19.7736 5.83064 19.3943L5.82388 19.3823L0.86439 10.3047C-0.319437 8.13786 -0.285492 5.56599 0.95521 3.4249C2.16904 1.33021 4.32497 0.0504882 6.72239 0.00158203C6.82477 -0.000527343 6.92778 -0.000527343 7.03013 0.00158203ZM4.06376 6.25001C4.06376 7.80083 5.32544 9.06251 6.87626 9.06251C8.42712 9.06251 9.68876 7.80083 9.68876 6.25001C9.68876 4.69919 8.42708 3.43752 6.87626 3.43752C5.32544 3.43752 4.06376 4.69919 4.06376 6.25001Z"
                        fill="#4B6A9B"
                        className="dark:fill-white"
                      />
                    </g>
                  </svg>

                  <p className="pl-4 text-[13px] md:text-[15px]">
                    {data ? data?.location : 'San Francisco'}
                  </p>
                </li>
                <li className="flex">
                  <svg
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="004-twitter">
                      <path
                        id="Path"
                        d="M20 2.79876C19.2562 3.12501 18.4637 3.34126 17.6375 3.44626C18.4875 2.93876 19.1362 2.14126 19.4412 1.18001C18.6487 1.65251 17.7737 1.98626 16.8412 2.17251C16.0887 1.37126 15.0162 0.875015 13.8462 0.875015C11.5762 0.875015 9.74874 2.71751 9.74874 4.97626C9.74874 5.30126 9.77624 5.61376 9.84374 5.91126C6.43499 5.74501 3.41875 4.11126 1.3925 1.62251C1.03875 2.23626 0.831249 2.93876 0.831249 3.69501C0.831249 5.11501 1.5625 6.37376 2.6525 7.10251C1.99375 7.09001 1.3475 6.89876 0.799999 6.59751C0.799999 6.61001 0.799999 6.62626 0.799999 6.64251C0.799999 8.63501 2.22125 10.29 4.085 10.6713C3.75125 10.7625 3.3875 10.8063 3.01 10.8063C2.7475 10.8063 2.4825 10.7913 2.23375 10.7363C2.765 12.36 4.2725 13.5538 6.06499 13.5925C4.67 14.6838 2.89875 15.3413 0.981249 15.3413C0.644999 15.3413 0.3225 15.3263 0 15.285C1.81625 16.4562 3.96875 17.125 6.28999 17.125C13.835 17.125 17.96 10.875 17.96 5.45751C17.96 5.27626 17.9537 5.10126 17.945 4.92751C18.7587 4.35001 19.4425 3.62876 20 2.79876Z"
                        fill="#4B6A9B"
                        className={` dark:fill-white ${
                          !data?.twitter_username ? 'dark:fill-[#8E95A3]' : ''
                        }`}
                      />
                    </g>
                  </svg>

                  <p
                    className={`pl-4 text-[13px] md:text-[15px] ${
                      !data?.twitter_username ? 'dark:text-[#8E95A3]' : ''
                    }`}
                  >
                    {data?.twitter_username
                      ? `@${data?.twitter_username}`
                      : 'Not Available'}
                  </p>
                </li>
                <li className="flex">
                  <div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="002-url">
                        <path
                          id="Path"
                          d="M7.40416 5.01207C5.04862 7.44921 5.56264 11.4937 8.26088 13.2854C8.34979 13.3445 8.46807 13.3328 8.54444 13.2582C9.11248 12.7031 9.59303 12.1655 10.0138 11.4817C10.0782 11.3771 10.0381 11.2414 9.93014 11.1829C9.51858 10.9599 9.10905 10.5418 8.8785 10.1002L8.87823 10.1003C8.60205 9.55042 8.50803 8.93398 8.65424 8.29734C8.6544 8.29738 8.65455 8.29742 8.65471 8.29742C8.82295 7.48234 9.69799 6.72414 10.3663 6.02293C10.3649 6.02246 10.3635 6.02195 10.3621 6.02148L12.8662 3.46578C13.864 2.44731 15.5054 2.43891 16.5137 3.44715C17.5321 4.445 17.549 6.09468 16.5511 7.11312L15.0344 8.67281C14.9642 8.74499 14.9414 8.85031 14.9743 8.9455C15.3235 9.9582 15.4094 11.3861 15.1754 12.465C15.1688 12.4951 15.2061 12.5149 15.2277 12.4928L18.4557 9.19816C20.5179 7.09347 20.5004 3.66676 18.4168 1.58324C16.2906 -0.543044 12.829 -0.525348 10.7246 1.6225L7.41709 4.99824C7.41272 5.00285 7.40858 5.00754 7.40416 5.01207Z"
                          fill="#4B6A9B"
                          className="dark:fill-white"
                        />
                        <path
                          id="Path_2"
                          d="M13.439 13.7495C13.4389 13.7496 13.4388 13.7498 13.4388 13.7499C13.4409 13.749 13.4428 13.7482 13.4449 13.7473C14.1036 12.5426 14.2333 11.161 13.9246 9.81421L13.9232 9.81565L13.9217 9.81499C13.6285 8.61542 12.8241 7.42425 11.7316 6.69085C11.6376 6.62777 11.4875 6.63507 11.3995 6.70624C10.8461 7.1537 10.3044 7.72749 9.94697 8.45972C9.89083 8.57468 9.93287 8.71276 10.0435 8.77698C10.4583 9.0178 10.8329 9.37038 11.0837 9.83847L11.0841 9.83819C11.2796 10.1689 11.4722 10.7963 11.3474 11.4704C11.3474 11.4704 11.3472 11.4704 11.3472 11.4704C11.2308 12.3642 10.3282 13.184 9.61068 13.9228L9.61103 13.9232C9.06486 14.4817 7.67646 15.8971 7.12052 16.465C6.12267 17.4835 4.47299 17.5003 3.45455 16.5024C2.43612 15.5046 2.41928 13.8549 3.41713 12.8365L4.93834 11.2721C5.00728 11.2012 5.03072 11.0982 5.00006 11.0041C4.66228 9.96776 4.56975 8.57202 4.78295 7.49441C4.78889 7.46437 4.75193 7.44519 4.73049 7.46706L1.551 10.7122C-0.53228 12.8385 -0.514624 16.3003 1.5903 18.4052C3.71647 20.4884 7.16049 20.4532 9.24369 18.3271C9.9674 17.5175 13.0654 14.6492 13.439 13.7495Z"
                          fill="#4B6A9B"
                          className="dark:fill-white"
                        />
                      </g>
                    </svg>
                  </div>
                  <a
                    href={data ? blogUrl : '#'}
                    className="truncate pl-4 text-[13px] md:text-[15px]"
                  >
                    {data?.blog ?? 'Not available'}
                  </a>
                </li>
                <li className="flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="001-office-building">
                      <path
                        id="Shape"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.8583 1.55835L1.7 0.166681C1.275 0.100014 0.841666 0.216681 0.516666 0.491681C0.191666 0.775014 0 1.18335 0 1.60835V19.1667C0 19.625 0.375 20 0.833333 20H3.54166V15.625C3.54166 14.8167 4.19166 14.1667 5 14.1667H7.08333C7.89166 14.1667 8.54166 14.8167 8.54166 15.625V20H12.0833V3.00001C12.0833 2.28335 11.5667 1.67501 10.8583 1.55835ZM4.58333 12.2917H3.33333C2.98833 12.2917 2.70833 12.0117 2.70833 11.6667C2.70833 11.3217 2.98833 11.0417 3.33333 11.0417H4.58333C4.92833 11.0417 5.20833 11.3217 5.20833 11.6667C5.20833 12.0117 4.92833 12.2917 4.58333 12.2917ZM3.33333 9.79167H4.58333C4.92833 9.79167 5.20833 9.51167 5.20833 9.16667C5.20833 8.82167 4.92833 8.54167 4.58333 8.54167H3.33333C2.98833 8.54167 2.70833 8.82167 2.70833 9.16667C2.70833 9.51167 2.98833 9.79167 3.33333 9.79167ZM4.58333 7.29167H3.33333C2.98833 7.29167 2.70833 7.01167 2.70833 6.66667C2.70833 6.32167 2.98833 6.04168 3.33333 6.04168H4.58333C4.92833 6.04168 5.20833 6.32167 5.20833 6.66667C5.20833 7.01167 4.92833 7.29167 4.58333 7.29167ZM3.33333 4.79168H4.58333C4.92833 4.79168 5.20833 4.51168 5.20833 4.16668C5.20833 3.82168 4.92833 3.54168 4.58333 3.54168H3.33333C2.98833 3.54168 2.70833 3.82168 2.70833 4.16668C2.70833 4.51168 2.98833 4.79168 3.33333 4.79168ZM8.74999 12.2917H7.49999C7.15499 12.2917 6.87499 12.0117 6.87499 11.6667C6.87499 11.3217 7.15499 11.0417 7.49999 11.0417H8.74999C9.09499 11.0417 9.37499 11.3217 9.37499 11.6667C9.37499 12.0117 9.09499 12.2917 8.74999 12.2917ZM7.49999 9.79167H8.74999C9.09499 9.79167 9.37499 9.51167 9.37499 9.16667C9.37499 8.82167 9.09499 8.54167 8.74999 8.54167H7.49999C7.15499 8.54167 6.87499 8.82167 6.87499 9.16667C6.87499 9.51167 7.15499 9.79167 7.49999 9.79167ZM8.74999 7.29167H7.49999C7.15499 7.29167 6.87499 7.01167 6.87499 6.66667C6.87499 6.32167 7.15499 6.04168 7.49999 6.04168H8.74999C9.09499 6.04168 9.37499 6.32167 9.37499 6.66667C9.37499 7.01167 9.09499 7.29167 8.74999 7.29167ZM7.49999 4.79168H8.74999C9.09499 4.79168 9.37499 4.51168 9.37499 4.16668C9.37499 3.82168 9.09499 3.54168 8.74999 3.54168H7.49999C7.15499 3.54168 6.87499 3.82168 6.87499 4.16668C6.87499 4.51168 7.15499 4.79168 7.49999 4.79168Z"
                        fill="#4B6A9B"
                        className="dark:fill-white"
                      />
                      <path
                        id="Shape_2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.9166 7.79251L18.85 9.03501C19.5308 9.18584 20 9.77168 20 10.46V18.5417C20 19.3458 19.3458 20 18.5416 20H12.9166V7.79251ZM15.625 17.5H16.875C17.22 17.5 17.5 17.22 17.5 16.875C17.5 16.53 17.22 16.25 16.875 16.25H15.625C15.28 16.25 15 16.53 15 16.875C15 17.22 15.28 17.5 15.625 17.5ZM16.875 15H15.625C15.28 15 15 14.72 15 14.375C15 14.03 15.28 13.75 15.625 13.75H16.875C17.22 13.75 17.5 14.03 17.5 14.375C17.5 14.72 17.22 15 16.875 15ZM15.625 12.5H16.875C17.22 12.5 17.5 12.22 17.5 11.875C17.5 11.53 17.22 11.25 16.875 11.25H15.625C15.28 11.25 15 11.53 15 11.875C15 12.22 15.28 12.5 15.625 12.5Z"
                        fill="#4B6A9B"
                        className="dark:fill-white"
                      />
                    </g>
                  </svg>

                  <p className="pl-4 text-[13px] md:text-[15px]">
                    {data?.company ?? 'Nil'}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
