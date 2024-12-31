import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useUser } from '../context';


const Post = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const Id = urlParams.get('f');
  const { user } = useUser();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputcomment, setInputComment] = useState("");
  const [toggle, setToggle] = useState(false);

  const [replyInputVisible, setReplyInputVisible] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [repliesVisible, setRepliesVisible] = useState({});
  const handleReplyClick = (index) => {
    if (replyInputVisible === index) {
      setReplyInputVisible(null); // Hide input if already visible
    } else {
      setReplyInputVisible(index); // Show input for the selected comment
    }
  };

  const handleReplySubmit = (index) => {
    console.log(`Reply to comment ${index}:`, replyText);
    setReplyInputVisible(null); // Hide input after submitting
    setReplyText(""); // Clear input field
    // Add logic to handle reply submission, such as updating the comment list
  };


  const toggleRepliesVisibility = (index) => {
    setRepliesVisible((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibility of replies for this comment
    }));
  };

  const setComment = async (comment, depth) => {
    // console.log(comment,depth);
    if (comment != "") {
      const commentInfo = {
        postId: Id,
        commentText: comment,
        depth: depth,
      }
      console.log(commentInfo);
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/comment/create`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentInfo),
        })
        if (response.status == 201) {
          setInputComment("");
          // window.location.reload();
        }
      } catch (error) {
        console.log("something went wrong while getting comment", error);
      }
    }
  }

  const getPostInfo = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/view/${Id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // console.log(response);
      // console.log(data);
      setPostData(data);
      setLoading(false);
    } catch (error) {
      console.log("something went wrong while getting post detail", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchPostInfo = () => {
      getPostInfo();
    }
    fetchPostInfo();
  }, [toggle])

  const handleEdit = async () => {
    try {
      window.location.href = `/edit?f=${Id}`
    } catch (error) {
      console.log("something went wrong while Editing", error);
    }
  }

  const handleDelete = async () => {
    const url = postData.thumbnail;
    const fileName = url.match(/\/([^\/]+)$/)[1];
    console.log(fileName)
    try {
      let imgres = {};
      if (fileName != "code-1.jpg") {
        imgres = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/upload/deleteObject`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ fileName: fileName })
          }
        );
      }
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/delete?postId=${Id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (fileName != "code-1.jpg" && (response.status == 200 && imgres.status == 200)) {
        window.location.href = '/';
      }
      if (fileName == "code-1.jpg" && (response.status == 200)) {
        window.location.href = '/';
      }
    } catch (error) {
      console.log("something went wrong while deleting post", error);
    }
  }

  // console.log(user);
  // console.log(postData);
  return (
    <>
      {
        loading ? (
          <div className="text-center mt-12">
            <p>Loading blogs...</p>
          </div>
        ) : (
          <div className="w-full h-full bg-white">
            {/* Adding top padding to ensure space for floating navbar */}
            <div className="w-full mx-auto py-10 bg-white pt-20 lg:pt-28 md:pt-24 xs:pt-20">
              {/* Title */}
              <div className="w-[92%] mx-auto flex items-center justify-between lg:text-4xl md:text-3xl xs:text-2xl text-center font-serif font-semibold pb-4 pt-8 text-black">
                {/* Edit button */}
                {user._id == postData.userId && <button
                  onClick={handleEdit}
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md font-sans text-lg font-medium transition duration-300">
                  Edit
                </button>}

                {/* Title */}
                <h1 className="flex-1 text-center text-4xl md:text-6xl xs:text-2xl">
                  {postData.title}
                </h1>

                {/* Delete button */}
                {user._id == postData.userId && <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded-md font-sans text-lg font-medium transition duration-300">
                  Delete
                </button>}
              </div>


              {/* Blog Cover Image */}
              <img
                src={postData.thumbnail}
                alt="Blog Cover"
                className="xl:w-[60%] xs:w-[96%] mx-auto lg:h-[450px] md:h-[480px] rounded-lg"
              />

              {/* Blog Info */}
              <div className="w-[90%] mx-auto flex md:gap-4 xs:gap-2 justify-center items-center pt-4">
                <div className="flex gap-2 items-center">
                  <img
                    src={postData.authorImage}
                    alt="Bloger Profile"
                    className="md:w-[3rem] md:h-[3rem] xs:w-[2rem] xs:h-[2rem] rounded-full"
                  />
                  <h2 className="text-md font-semibold text-black">{postData.author}</h2>
                </div>
                <div className="text-black">|</div>
                <h3 className="text-sm font-semibold text-black ">{postData.postDate}</h3>
                <div className="text-black">|</div>
                <time className="text-black">{formatDistanceToNow(postData.createdAt, { addSuffix: true })}</time>
              </div>

              {/* Blog Content */}
              <div className="py-6 bg-white">
                <div className="md:w-[80%] xs:w-[90%] mx-auto pt-4 text-black">
                  <h1 className="font-semibold text-lg mt-4 ">{parse(DOMPurify.sanitize(postData.description))}</h1>
                  {/* <p className="mt-2 text-md ">{section.body}</p> */}
                </div>
              </div>
            </div>

            {/* comments */}
            <section className="py-5 relative">
              <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
                  <h2 className="text-gray-900 text-3xl font-bold font-manrope leading-normal">
                    Comments
                  </h2>
                  <div className="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">


                    <div className="w-full flex justify-between items-center gap-2">
                      <input
                        type="text"
                        className="w-full h-12 py-3 px-5 rounded-lg border border-gray-300 bg-white shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed"
                        placeholder="Write comments here...."
                        value={inputcomment}
                        onChange={(e) => {
                          setInputComment(e.target.value);
                        }}
                      />
                      <button
                        onClick={() => {
                          setComment(inputcomment, 1);
                          setToggle(!toggle);
                        }}
                        className="h-12 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                            stroke="#FFFFFF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>


                    <div className="w-full flex-col justify-start items-start gap-8 flex">
                      <div className="w-full flex-col justify-start items-start gap-5 flex">
                        <div className="w-full pl-7 flex-col justify-start items-start gap-2 flex">

                          <div className="space-y-4"> {/* Container for all comments */}
                            {postData.commentList.map((commentData, index) => (
                              <div
                                key={index}
                                className="w-auto min-w-[900px] max-w-full p-3 bg-gray-150 rounded-2xl border border-gray-300 flex-col justify-start items-start gap-3 flex"
                              >
                                <div className="w-full flex-col justify-center items-start gap-3.5 flex">
                                  <div className="w-full justify-between items-center inline-flex">
                                    <div className="justify-start items-center gap-3 flex">
                                      <div className="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-1 flex">
                                        <img
                                          className="w-10 h-10 rounded-full object-cover"
                                          src={commentData.authorImage}
                                          alt={commentData.userName}
                                        />
                                      </div>
                                      <div className="flex-col justify-start items-start gap-1 inline-flex">
                                        <h5 className="text-gray-900 text-sm font-semibold leading-snug">
                                          {commentData.author}
                                        </h5>
                                        <h6 className="text-gray-500 text-xs font-normal leading-5">
                                          {commentData.timeAgo}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                  <p className="text-gray-800 text-sm font-normal leading-snug">
                                    {commentData.commentText}
                                  </p>
                                </div>
                                <div className="w-full justify-between items-center inline-flex">
                                  <div className="justify-start items-center gap-4 flex">
                                    <div className="justify-start items-center gap-1.5 flex">
                                      <a onClick={() => handleReplyClick(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                          <path
                                            d="M10 8V4L3 10L10 16V12C15 12 19 14 21 18C20 13 16 9 10 8Z"
                                            fill="black"
                                          />
                                        </svg>
                                      </a>
                                      <h5 className="text-gray-900 text-sm font-normal leading-snug">Reply</h5>
                                    </div>
                                    <div className="justify-start items-center gap-1.5 flex">
                                      <a onClick={() => toggleRepliesVisibility(index)}>
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
                                  </div>
                                </div>

                                {/* Reply Input Section */}
                                {replyInputVisible === index && (
                                  <div className="w-full mt-2 flex gap-2">
                                    <input
                                      type="text"
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                                      placeholder="Write your reply..."
                                    />

                                    <button
                                      onClick={() => {
                                        handleReplySubmit(index)
                                      }}
                                      className="h-12 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none flex items-center justify-center"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M11.3011 8.69906L8.17808 11.8221M8.62402 12.5909L8.79264 12.8821C10.3882 15.638 11.1859 17.016 12.2575 16.9068C13.3291 16.7977 13.8326 15.2871 14.8397 12.2661L16.2842 7.93238C17.2041 5.17273 17.6641 3.79291 16.9357 3.06455C16.2073 2.33619 14.8275 2.79613 12.0679 3.71601L7.73416 5.16058C4.71311 6.16759 3.20259 6.6711 3.09342 7.7427C2.98425 8.81431 4.36221 9.61207 7.11813 11.2076L7.40938 11.3762C7.79182 11.5976 7.98303 11.7083 8.13747 11.8628C8.29191 12.0172 8.40261 12.2084 8.62402 12.5909Z"
                                          stroke="#FFFFFF"
                                          strokeWidth="1.6"
                                          strokeLinecap="round"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                )}

                                {/* Display Replies Section */}
                                {repliesVisible[index] && commentData.replies > 0 && (
                                  <div className="mt-4 pl-6 space-y-2">
                                    {commentData.repliesList.map((reply, replyIndex) => (
                                      <div key={replyIndex} className="flex-col p-2 bg-gray-100 rounded-lg">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 bg-stone-300 rounded-full">
                                            <img
                                              className="w-8 h-8 rounded-full object-cover"
                                              src={reply.authorImage}
                                              alt={reply.userName}
                                            />
                                          </div>
                                          <div>
                                            <h6 className="text-gray-800 text-sm font-semibold">{reply.author}</h6>
                                            <p className="text-gray-600 text-xs">{reply.commentText}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>


          </div>
        )
      }

    </>
  );
};

export default Post;
