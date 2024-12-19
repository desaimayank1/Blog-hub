import React from 'react';

const Dashboard = () => {
    // Data for the cards
    const cardsData = [
        {
            type: "Article",
            title: "Boost your conversion rate",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
            author: "Roel Aufderehar",
            date: "Mar 16, 2020",
            readTime: "6 min read",
            imageUrl: "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
            authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            type: "Video",
            title: "How to use search engine optimization to drive sales",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
            author: "Brenna Goyette",
            date: "Mar 10, 2020",
            readTime: "4 min read",
            imageUrl: "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
            authorImage: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            type: "Case Study",
            title: "Improve your customer experience",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
            author: "Daniela Metz",
            date: "Feb 12, 2020",
            readTime: "11 min read",
            imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
            authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            type: "Case Study",
            title: "Improve your customer experience",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
            author: "Daniela Metz",
            date: "Feb 12, 2020",
            readTime: "11 min read",
            imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
            authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        }
    ];

    return (
    <>
            <div className="w-full h-screen bg-[url('../img/theme/light/code-2.jpg')] bg-center bg-cover bg-no-repeat">
                <div class="mx-auto max-w-7xl pt-16 sm:pt-24">
                    <div class="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
                        <div class="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-center">
                            <div class="space-y-8">
                                <div class="space-y-4">
                                    <div class="space-y-2">
                                       
                                        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                            <span class="sm:text-6xl">
                                            </span> Wireless Bluetooth Earbuds
                                            <span
                                                class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">StellarGlo
                                            </span>

                                            go beyond sound.
                                        </h1>
                                    </div>

                                    <p class="text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Immerse yourself in superior audio quality with the StellarGlo Wireless Bluetooth Earbuds.
                                        These sleek and lightweight earbuds deliver crystal-clear sound and rich bass.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>

                <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
                    <div className="absolute inset-0">
                        <div className="h-1/3 bg-white sm:h-2/3"></div>
                    </div>
                    <div className="relative mx-auto max-w-7xl">


                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Column me neatly.</h2>
                            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
                                This is your life and it's ending one minute @ a time...
                            </p>
                        </div>


                        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
                            {cardsData.map((card, index) => (
                                <div key={index} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                                    <div className="flex-shrink-0">
                                        <img className="h-48 w-full object-cover" src={card.imageUrl} alt="" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-indigo-600">
                                                <a href="#" className="hover:underline">{card.type}</a>
                                            </p>
                                            <a href="#" className="mt-2 block">
                                                <p className="text-xl font-semibold text-gray-900">{card.title}</p>
                                                <p className="mt-3 text-base text-gray-500">{card.description}</p>
                                            </a>
                                        </div>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0">
                                                <a href="#">
                                                    <span className="sr-only">{card.author}</span>
                                                    <img className="h-10 w-10 rounded-full" src={card.authorImage} alt="" />
                                                </a>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    <a href="#" className="hover:underline">{card.author}</a>
                                                </p>
                                                <div className="flex space-x-1 text-sm text-gray-500">
                                                    <time datetime={card.date}>{card.date}</time>
                                                    <span aria-hidden="true">·</span>
                                                    <span>{card.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
            );
};

            export default Dashboard;
