import React from 'react';
import Comment from './Comment';
const postData = {
  breadcrumb: [
    { label: "Blog" },
    { label: "Framework" },
    { label: "Why Tailwind CSS Wins My Utility Belt" },
  ],
  title: "Why Tailwind CSS Wins My Utility Belt: A Dev's Guide",
  coverImage: "https://miro.medium.com/v2/resize:fit:700/1*Q0uAcG_S2J2gkcUaF5PyxA.png",
  author: {
    name: "Samuel Abera",
    profileImage: "https://lh3.googleusercontent.com/a/ACg8ocIexhmmTS8LcwWo1fPGY5Fl3KXpd-JuBE_Gj56P3rUR2g=s96-c",
  },
  date: "MAY 20, 2024",
  readTime: "5 MIN READ",
  content: [
    {
      heading: "1. Utility-First Philosophy",
      body: "Tailwind ditches bulky pre-built components and instead offers a massive toolbox of utility classes. These classes, like \"text-red-500\" or \"flex justify-center,\" target specific styles (color, layout) and can be easily combined to achieve your desired look. This gives you ultimate control and keeps your CSS nice and lean.",
    },
    {
      heading: "2. Rapid Prototyping",
      body: "Need to get a design off the ground quickly? Tailwind's utility classes make it a breeze. Forget digging through stylesheets - just apply classes directly in your HTML. This lets you iterate on designs faster and see the visual changes instantly.",
    },
    {
      heading: "3. Responsive Out of the Box",
      body: "Tailwind's utility classes are inherently responsive, meaning they adapt to different screen sizes. No need for complex media queries - just add a responsive variant to your class (e.g. \"text-lg\" for large screens). This saves you time and ensures your website looks sharp on any device.",
    },
    {
      heading: "4. Customization King",
      body: "Don't be fooled by Tailwind's utility-first approach. You can still create custom themes and components. Need a specific button style? No problem, define it with custom CSS and reuse it throughout your project. Tailwind integrates seamlessly with your existing workflow.",
    },
    {
      heading: "5. Framework Agnostic",
      body: "Tailwind plays well with others. Whether you're using React, Vue, Angular, or plain JavaScript, Tailwind integrates without a hitch. This flexibility makes it a valuable asset for any project regardless of your preferred framework.",
    },
    {
      heading: "Conclusion",
      body: "Tailwind CSS offers a unique approach to styling that prioritizes speed, customization, and responsiveness. It's a powerful tool that can streamline your workflow and help you build beautiful, modern websites. So, if you're looking for a CSS framework that empowers you to create with freedom, give Tailwind CSS a try!",
    },
  ],
};

const Post = () => {
  return (
    <div className="w-full h-full bg-white">
      {/* Adding top padding to ensure space for floating navbar */}
      <div className="w-full mx-auto py-10 bg-white pt-20 lg:pt-28 md:pt-24 xs:pt-20">
        {/* Title */}
        <h1 className="w-[92%] mx-auto lg:text-4xl md:text-3xl xs:text-2xl text-center font-serif font-semibold pb-4 pt-8 text-black">
          {postData.title}
        </h1>

        {/* Blog Cover Image */}
        <img
          src={postData.coverImage}
          alt="Blog Cover"
          className="xl:w-[60%] xs:w-[96%] mx-auto lg:h-[450px] md:h-[480px] rounded-lg"
        />

        {/* Blog Info */}
        <div className="w-[90%] mx-auto flex md:gap-4 xs:gap-2 justify-center items-center pt-4">
          <div className="flex gap-2 items-center">
            <img
              src={postData.author.profileImage}
              alt="Bloger Profile"
              className="md:w-[2.2rem] md:h-[2.2rem] xs:w-[2rem] xs:h-[2rem] rounded-full"
            />
            <h2 className="text-sm font-semibold text-black">{postData.author.name}</h2>
          </div>
          <div className="text-black">|</div>
          <h3 className="text-sm font-semibold text-black ">{postData.date}</h3>
          <div className="text-black">|</div>
          <h4 className="text-sm font-semibold text-black ">{postData.readTime}</h4>
        </div>

        {/* Blog Content */}
        <div className="py-6 bg-white">
          <div className="md:w-[80%] xs:w-[90%] mx-auto pt-4 text-black">
            {postData.content.map((section, index) => (
              <div key={index}>
                <h1 className="font-semibold text-lg mt-4 ">{section.heading}</h1>
                <p className="mt-2 text-md ">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Comment/>

    

    </div>
  );
};

export default Post;
