import React from 'react';

const Comment = () => {
  const commentData = {
    totalComments: 20,
    userImage: '../cstm-assets/logo.svg',
    userName: 'John Doe',
    timeAgo: '2 hours ago',
    commentText: 'This is a sample comment. I am writing it as an example.',
    replies: 5
  };

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
          <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">
            Comments ({commentData.totalComments})
          </h2>
          <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
            <div className="w-full relative flex justify-between gap-2">
              <input
                type="text"
                className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                placeholder="Write comments here...."
              />
              <a href="" className="absolute right-6 top-[18px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                    stroke="#111827"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full flex-col justify-start items-end gap-5 flex">
                <div className="w-full lg:pl-60 md:pl-20 sm:pl-10 pl-7 flex-col justify-start items-end gap-2.5 flex">
                  <div className="w-full p-6 bg-gray-150 rounded-2xl border border-gray-300 flex-col justify-start items-start gap-8 flex">
                    <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                      <div className="w-full justify-between items-center inline-flex">
                        <div className="justify-start items-center gap-2.5 flex">
                          <div className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                            <img
                              className="w-10 h-10 rounded-full object-cover"
                              src={commentData.userImage}
                              alt={commentData.userName}
                            />
                          </div>
                          <div className="flex-col justify-start items-start gap-1 inline-flex">
                            <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                              {commentData.userName}
                            </h5>
                            <h6 className="text-gray-500 text-xs font-normal leading-5">{commentData.timeAgo}</h6>
                          </div>
                        </div>
                       
                      </div>
                      <p className="text-gray-800 text-sm font-normal leading-snug">{commentData.commentText}</p>
                    </div>
                    <div className="w-full justify-between items-center inline-flex">
                      <div className="justify-start items-center gap-4 flex">
                        <div className="justify-start items-center gap-1.5 flex">
                          <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M7.04962 9.99504L7 10M12 10L11.9504 10.005M17 10L16.9504 10.005M10.5 3H13.5C16.7875 3 18.4312 3 19.5376 3.90796C19.7401 4.07418 19.9258 4.25989 20.092 4.46243C21 5.56878 21 7.21252 21 10.5V12.4777C21 13.8941 21 14.6023 20.8226 15.1779C20.4329 16.4427 19.4427 17.4329 18.1779 17.8226C17.6023 18 16.8941 18 15.4777 18C15.0811 18 14.8828 18 14.6985 18.0349C14.2966 18.1109 13.9277 18.3083 13.6415 18.6005C13.5103 18.7345 13.4003 18.8995 13.1803 19.2295L13.1116 19.3326C12.779 19.8316 12.6126 20.081 12.409 20.198C12.1334 20.3564 11.7988 20.3743 11.5079 20.2462C11.2929 20.1515 11.101 19.9212 10.7171 19.4605L10.2896 18.9475C10.1037 18.7244 10.0108 18.6129 9.90791 18.5195C9.61025 18.2492 9.23801 18.0748 8.83977 18.0192C8.70218 18 8.55699 18 8.26662 18C7.08889 18 6.50002 18 6.01542 17.8769C4.59398 17.5159 3.48406 16.406 3.12307 14.9846C3 14.5 3 13.9111 3 12.7334V10.5C3 7.21252 3 5.56878 3.90796 4.46243C4.07418 4.25989 4.25989 4.07418 4.46243 3.90796C5.56878 3 7.21252 3 10.5 3Z"
                                stroke="black"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              />
                            </svg>
                          </a>
                          <h5 className="text-gray-900 text-sm font-normal leading-snug">{commentData.replies} Replies</h5>
                        </div>
                        <div className="justify-start items-center gap-1.5 flex">
                          <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M10 8V4L3 10L10 16V12C15 12 19 14 21 18C20 13 16 9 10 8Z"
                                fill="black"
                              />
                            </svg>

                          </a>
                          <h5 className="text-gray-900 text-sm font-normal leading-snug">Reply</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;