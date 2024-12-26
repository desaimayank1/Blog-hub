import React from "react";

const Profile = () => {
  const profileData = {
    backgroundImage:
      "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80",
    avatar: "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg",
    name: "Jenna Stones",
    location: "Los Angeles, California",
    job: "Solution Manager - Creative Tim Officer",
    university: "University of Computer Science",
    stats: {
      friends: 22,
      photos: 10,
      comments: 89,
    },
    bio: `An artist of considerable range, Jenna the name taken by
    Melbourne-raised, Brooklyn-based Nick Murphy writes,
    performs and records all of his own music, giving it a
    warm, intimate feel with a solid groove structure.`,
  };

  return (
    <main className="profile-page">
      {/* Top section with background image */}
      <section className="relative block h-[60vh]">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${profileData.backgroundImage})`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>

      {/* Profile Section */}
      <section className="relative py-16 bg-white pt-32">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-gray-100 w-3/4 mx-auto mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6 bg-gray-150 rounded-lg">
              <div className="flex flex-wrap justify-center">
                {/* Avatar Section */}
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center relative">
                  {/* Centering the avatar vertically */}
                  <div className="absolute top-1/8 transform -translate-y-1/2">
                    <img
                      alt="..."
                      src={profileData.avatar}
                      className="shadow-xl rounded-full w-50 h-50 object-cover border-2 border-white"
                    />
                  </div>
                </div>

                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    
                  </div>
                </div>

                {/* Stats Section */}
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black">
                        {profileData.stats.friends}
                      </span>
                      <span className="text-sm text-black">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black">
                        {profileData.stats.photos}
                      </span>
                      <span className="text-sm text-black">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-black">
                        {profileData.stats.comments}
                      </span>
                      <span className="text-sm text-black">Comments</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-black mb-2">
                  {profileData.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-black"></i>
                  {profileData.location}
                </div>
                <div className="mb-2 text-black mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-black"></i>
                  {profileData.job}
                </div>
                <div className="mb-2 text-black">
                  <i className="fas fa-university mr-2 text-lg text-black"></i>
                  {profileData.university}
                </div>
              </div>

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-black">
                      {profileData.bio}
                    </p>
                    <a href="#pablo" className="font-normal text-pink-500">
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
