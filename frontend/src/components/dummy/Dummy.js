import React, { useEffect,useState } from "react";
import HeaderDashboard from "../users/header/HeaderDashboard";
import Contents from "../users/customer/Contents";
import Topstackcust from "../users/customer/Topstackcust";
import "./Dummy.css";
import Header from "../users/header/Header";

const Dummy = () => {
  const [seconds, setSeconds] = useState(5);
  const [data, setData] = useState("");  // Initial timer value in seconds

  useEffect(() => {
    // if(seconds===-1){
    //   setSeconds(0)
    //   alert("Completed")
    //   return
    // }
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(timer); 
       // Cleanup the interval on component unmount
      };
    }
    else {
      setData("OVER")
      
      return

    }
  }, [seconds]);

  return (
    <div className="outer">
      <div className="">
        {/* <Contents /> */}
      </div>
      <div className="">
      Time remaining: {seconds} seconds
      </div>
      {data}
    </div>
  );
};

export default Dummy;

{
  /* <div className="">
      <div className="row">
        <HeaderDashboard />
      </div>

      <div className="row">
        <div className="col-3">


          <Contents/>

        </div>
        <div className="col-9 ">
        
          <div className="row   " >
            <div className="col-3 dashboard ">
              Dashboard
              

            </div>
            <div className="col-6 ">
             

            </div>
            <div className="col-3 mt-2 ">
            <Topstackcust/>



            </div>

          </div>
          <hr />

        </div>


      </div>

    </div> */
}
