import React, { useState, useEffect } from "react";
import JoditEditor from 'jodit-react';
import { useRef } from "react";
import SuccessModal from "./partials/Successmodal";
import Loadingmodal from "./partials/Loadingmodal";
import Errormodal from "./partials/Errormodal";
import { useUser } from "../context/UserContext";

const Editpost = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const Id = urlParams.get('f');
    const { user } = useUser();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [imageUploaded, setImageUploaded] = useState(false);
    const [postData, setPostData] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        image: "",
    });

    const [SuccessModalConfig, setSuccessModalConfig] = useState({ isOpen: false, onClose: () => setSuccessModalConfig({ ...SuccessModalConfig, isOpen: false }) });
    const [LoadingModalConfig, setLoadingModalConfig] = useState({ isOpen: false });
    const [ErrorModalConfig, setErrorModalConfig] = useState({ isOpen: false, onClose: () => { setErrorModalConfig({ isOpen: false }) } });

    const getPostInfo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/view/${Id}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setPostData(data);
            // Initialize formData with postData values
            setFormData({
                title: data.title || "",
                subTitle: data.subTitle || "",
                image: "",
            });
            setContent(data.description);
        } catch (error) {
            console.log("something went wrong while getting post detail", error);
        }
    };

    useEffect(() => {
        const fetchPostInfo = () => {
            getPostInfo();
        };
        fetchPostInfo();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImage = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));

        if (e.target.files && e.target.files.length > 0) {
            setImageUploaded(true);
        }
    };

    const handleImageUpload = async (file) => {
        try {
            const urlRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/upload/presignedUrl?fileName=${file.name}&fileType=${file.type}`, {
                method: "GET",
                credentials: 'include',
            });
            const urlData = await urlRes.json();
            const { url, fileName } = urlData;

            const uploadResponse = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file,
            });

            return { uploadResponse, fileName };
        } catch (error) {
            console.log("something went wrong while uploading image", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingModalConfig({ isOpen: true });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const newPost = {
                _id: postData._id,
                title: formData.title,
                subTitle: formData.subTitle,
                description: content,
                author: postData.author,
                authorImage: postData.authorImage,
            };

            let thumbnailUploadResponse = { ok: true };

            if (formData.image !== "") {
                const { uploadResponse, fileName } = await handleImageUpload(formData.image);
                thumbnailUploadResponse = uploadResponse;
                const thumbnailKeyName = fileName;
                if (thumbnailUploadResponse.ok) {
                    newPost.thumbnail = `https://d376csz4lg8iex.cloudfront.net/${thumbnailKeyName}`;
                }

                //deleting image from s3 bucket
                const url = postData.thumbnail;
                const file = url.match(/\/([^\/]+)$/)[1];
                try {
                    if (file != "code-1.jpg") {
                        const imgres = await fetch(
                            `${import.meta.env.VITE_SERVER_URL}/upload/deleteObject`,
                            {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                credentials: "include",
                                body: JSON.stringify({ fileName: file })
                            }
                        );
                    }
                } catch (error) {
                    console.log("something went wrong while deleting image", error);
                }

            } else {
                newPost.thumbnail = postData.thumbnail;
            }


            console.log(newPost);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/create`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
                credentials: 'include',
            });

            // const data = await response.json();
            // console.log(response);
            if (response.status == 201) {
                setLoadingModalConfig({ isOpen: false });
                setSuccessModalConfig({ isOpen: true });
            } else {
                setLoadingModalConfig({ isOpen: false });
                setErrorModalConfig({ isOpen: true });
            }
        } catch (error) {
            console.log("something went wrong while uploading blog", error);
            setLoadingModalConfig({ isOpen: false });
            setErrorModalConfig({ isOpen: true });
        }
    };

    // console.log(postData);
    return (
        <>
            {/* Success Modal */}
            <SuccessModal SuccessModalConfig={SuccessModalConfig} />

            {/* Loading Modal */}
            <Loadingmodal LoadingModalConfig={LoadingModalConfig} />

            {/* Error Modal */}
            <Errormodal ErrorModalConfig={ErrorModalConfig} />
            <div className="w-full h-[50vh] bg-[url('../cstm-assets/blog.jpg')] bg-center bg-repeat"></div>

            <div className="container mx-auto p-20 font-sans font-medium">
                <h1 className="text-3xl font-bold text-black mb-6">Upload A New Blog...</h1>

                <form className="grid grid-cols-1 w-full gap-6 bg-gray-200 p-10 rounded-xl text-black" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="p-2">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter your blog Title"
                            className="block w-full rounded-md border-gray-300 shadow-md focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                            style={{ backgroundColor: "#f6f6f6" }}
                        />
                    </div>

                    {/* SubTitle */}
                    <div className="p-2">
                        <label htmlFor="subTitle">Subtitle</label>
                        <input
                            type="text"
                            id="subTitle"
                            name="subTitle"
                            value={formData.subTitle}
                            onChange={handleChange}
                            placeholder="Enter your blog Subtitle"
                            className="block w-full rounded-md border-gray-300 shadow-md focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
                            style={{ backgroundColor: "#f6f6f6" }}
                        />
                    </div>

                    {/* Description and Image Upload */}
                    <div className="p-2 grid grid-cols-1 md:grid-cols-1 gap-6 items-start">
                        {/* Image Upload */}
                        <div className="flex justify-start">
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer bg-gray-100 p-4 rounded-2xl shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                <i className="fa fa-upload text-2xl"> {imageUploaded ? 'Image uploaded successfully' : 'Upload image'}</i>
                            </label>
                            <input
                                id="image-upload"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="hidden"
                            />
                        </div>

                        {/* Description */}
                        <div className="w-full h-[500px]">
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={{
                                    height: 500,
                                }}
                                onBlur={(newContent) => setContent(newContent)}
                                className="h-full"
                            />
                        </div>
                    </div>

                    {/* Registration Button */}
                    <div className="col-span-full mt-6 p-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-full"
                        >
                            Update Blog
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Editpost;
