import React, { useState, useEffect } from "react";
import JoditEditor from 'jodit-react';
import { useRef } from "react";
import SuccessModal from "./partials/Successmodal";
import Loadingmodal from "./partials/Loadingmodal";
import Errormodal from "./partials/Errormodal";
import { useUser } from "../context";

const CreatePost = () => {
    const {user}=useUser();
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [imageUploaded, setImageUploaded] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        image: "",
    });

    const [SuccessModalConfig, setSuccessModalConfig] = useState({ isOpen: false, onClose: () => setSuccessModalConfig({ ...SuccessModalConfig, isOpen: false }) });
    const [LoadingModalConfig, setLoadingModalConfig] = useState({ isOpen: false });
    const [ErrorModalConfig, setErrorModalConfig] = useState({ isOpen: false, onClose: () => {setErrorModalConfig({ isOpen: false })} });
    
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    // Handle image upload
    const handleImage = (e) => {
        // console.log(e.target.files[0]);
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));

        if (e.target.files && e.target.files.length > 0) {
            setImageUploaded(true); // Update the state to indicate an image has been uploaded
        }
        // console.log(imageUploaded);
    };

    const handleImageUpload = async (file) => {
        // 1. Get pre-signed url for the file-name file-type
        // 2. Make a PUT request to that pre-signed with the body = file => Initiate the upload on s3

        try {

            const urlRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/upload/presignedUrl?fileName=${file.name}&fileType=${file.type}`,
                {
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

            return {
                uploadResponse,
                fileName,
            };

        } catch (error) {
            console.log("something went wrong while uploading image", error);
            // $("#loadingModal").modal("hide");
            // $("#errorModal").modal("show");
        }

    }


    // Handle form submit
    // console.log(user);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData.image);
        // console.log(content);

        // $("#loadingModal").modal("show");
        // $("#successModal").modal("hide");
        // $("#errorModal").modal("hide");
        setLoadingModalConfig({ isOpen: true });
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            
            let thumbnailUploadResponse = { ok: true };
            let thumbnailKeyName = "code-1.jpg";
            if(formData.image!=""){
            const { uploadResponse, fileName } = await handleImageUpload(
                formData.image
            );
            thumbnailUploadResponse = uploadResponse;
            thumbnailKeyName = fileName;
             }
            

            const newPost = {
                title: formData.title,
                subTitle: formData.subTitle,
                description: content,
                author:user.displayName,
                authorImage:user.image,
            }

            if (thumbnailUploadResponse.ok) {
                newPost.thumbnail = `https://d376csz4lg8iex.cloudfront.net/${thumbnailKeyName}`;
            }
            
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/post/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data);
            if (data.id) {
                setLoadingModalConfig({ isOpen: false });
                setSuccessModalConfig({ isOpen: true });
                // $("#loadingModal").modal("hide");
                // $("#successModal").modal("show");
            } else {
                setLoadingModalConfig({ isOpen: false });
                setErrorModalConfig({ isOpen: true });
                // $("#loadingModal").modal("hide");
                // $("#errorModal").modal("show");
            }
        } catch (error) {
            console.log("something went wrong while uploading blog", error);
            setLoadingModalConfig({ isOpen: false });
            setErrorModalConfig({ isOpen: true });
            // $("#loadingModal").modal("hide");
            // $("#errorModal").modal("show");
        }

    };

    return (

        <>

            {/* Success Modal */}
            <SuccessModal SuccessModalConfig={SuccessModalConfig} />

            {/* Loading Modal */}
            <Loadingmodal LoadingModalConfig={LoadingModalConfig} />

            {/* Error Modal */}
            <Errormodal ErrorModalConfig={ErrorModalConfig} />
            <div className="w-full h-[50vh] bg-[url('../cstm-assets/blog.jpg')] bg-center  bg-repeat"></div>

            <div className="container mx-auto p-20 font-sans font-medium">
                <h1 className="text-3xl font-bold text-black mb-6">Upload A New Blog...</h1>

                <form className="grid grid-cols-1 w-full gap-6 bg-gray-200 p-10 rounded-xl text-black" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="p-2">
                        <label className=""
                            htmlFor="title"
                        >
                            Title
                        </label>
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
                        <label className=""
                            htmlFor="Subtitle"
                        >
                            Subtitle
                        </label>
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
                    <div className="p-2 grid grid-cols-1 md:grid-cols-1 gap-6 items-start ">
                        {/* Image Upload */}
                        <div className="flex justify-start">
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer bg-gray-100 p-4 rounded-2xl shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                {/* Upload icon */}
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
                        <div className="w-full h-[500px]"> {/* Adjust the height and width as needed */}
                            <JoditEditor
                                ref={editor}
                                value={content}
                                config={{
                                    height: 500,  // Set the height directly
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
                            className=" bg-blue-500 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-full"
                        >
                            Upload Blog
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreatePost;
