import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import { useUser } from '../context';
import Comment from './Comment';

const Post = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const Id = urlParams.get('f');
  const { user } = useUser();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputcomment, setInputComment] = useState("");
  const [toggle, setToggle] = useState(false);

 

  const setComment = async (comment, depth) => {
    // console.log(comment,depth);
    if (comment != "") {
      const commentInfo = {
        postId: Id,
        commentText: comment,
        depth: depth,
        parentId:-1,
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

                          <Comment Id={Id} parentId={-1} depth={1} toggle={toggle}/>
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
