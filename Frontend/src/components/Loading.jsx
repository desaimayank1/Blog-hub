import { useLottie } from "lottie-react";
import Loader from "../assets/loader.json"

const Loading =()=>{
    const options = {
        animationData: Loader,
        loop: true
      };
      const { View } = useLottie(options);
   return(
    <div className="w-full h-screen flex justify-center justify-items-center items-center">
        <div className="w-80 h-80 "
        >{View}</div>
        </div>
   )
}

export default Loading