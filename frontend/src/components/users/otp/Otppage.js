import React, { useState, useEffect } from "react";
import axiosInstance from "../../../axios/axiosconfig";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBeautDetails, setAccessToken } from "../../../feautures/loginslice";
import Cookies from "js-cookie";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";
import Otpform from "./Otpform";
import toast, { Toaster } from "react-hot-toast";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Otppage = () => {
  const otpdatas = useSelector((state) => state.otp);
  const signupdatas = useSelector((state) => state.signup);
  const [error, setError] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [timeover, setTimeOver] = useState(false);
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    const datas = {
      otp: otpdatas.value.otp,
      email: signupdatas.value.email,
    };
    console.log(datas, "OTP");
    if (otpdatas.value.beautotpstatus == true) {
      axiosInstance
        .post("beaut/confirmotp/", datas)
        .then((response) => {
          console.log(response.data);
          if (response.data.message == "Success") {
            toast.success("Otp Matched! Redirecting to Login Page");
            setTimeout(() => {
              navigate("../loginbeautician/");
            }, 3000);
          } else {
            toast.error("Invalid OTP!")
            //setError(true);
          }
        })
        .catch((error) => alert(error));
    }

    if (otpdatas.value.custotpstatus == true) {
      axiosInstance
        .post("cust/confirmotp/", datas)
        .then((response) => {
          console.log(response.data);
          if (response.data.message == "Success") {
            toast.success("Otp Matched! Redirecting to Login Page");
            setTimeout(() => {
              navigate("../logincustomer/");
            }, 3000);
          } else {
            toast.error("Invalid OTP!")
            //setError(true);
          }
        })
        .catch((error) => alert(error));
    }
  };

  useEffect(() => {
    
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(timer); 
        // Cleanup the interval on component unmount
      };
    } else {
      setTimeOver("Time Over");

      return;
    }
  }, [seconds,reRender]);

  const resendOTPHandle = () => {
    const toastId = toast.loading("Resending OTP to your mail...Please Wait");
    if (otpdatas.value.beautotpstatus == true) {
      const datas = {
        email: signupdatas.value.email,
      };
      axiosInstance
        .post("beaut/resendotp/", datas)
        .then((response) => {
          toast.dismiss(toastId);
          toast.success("OTP sent to your mail! Please check");
          setTimeOver(false)
          setSeconds(20)
          setReRender(!reRender)
          
        })
        .catch((error) => {
          alert(error);
        });
    }


    if (otpdatas.value.custotpstatus == true) {
      const datas = {
        email: signupdatas.value.email,
      };
      axiosInstance
        .post("cust/resendotp/", datas)
        .then((response) => {
          toast.dismiss(toastId);
          toast.success("OTP sent to your mail! Please check");
          setTimeOver(false)
          setSeconds(20)
          setReRender(!reRender)
        })
        .catch((error) => {
          alert(error);
        });
    }


  };

  return (
    <div>
      <Toaster />
      <Paper
        elevation={24}
        sx={{
          width: 500,
          height: 410,
          backgroundColor: "whitesmoke",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80")',
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
          marginLeft: "30%",
          marginTop: "40px",
          opacity: [0.9, 0.8, 0.8],
          paddingTop: "100px",

          "&:hover": {
            backgroundColor: "whitesmoke",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div className=""></div>
        <div className="row">
          <div class="container mt-5">
            <div class="row justify-content-center">
              <div class="col-md-6">
                <div class="">
                  <div>
                    <h3 class="text-center">OTP</h3>
                  </div>
                  <Otpform />
                  {!timeover ? (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{
                        marginLeft: "80px",
                      }}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={resendOTPHandle}
                      sx={{
                        marginLeft: "80px",
                        backgroundColor: "green",
                      }}
                    >
                      Resend OTP
                    </Button>
                  )}

                  {timeover ? (
                    <div className="text-danger justify-center ml-5 mt-2"></div>
                  ) : (
                    <div className="text-danger flex justify-center ml-4 mt-2">
                      Resend OTP in {seconds} seconds
                    </div>
                  )}

                  {error && (
                    <Alert
                      severity="error"
                      sx={{
                        marginTop: "20px",
                      }}
                    >
                      Wrong Credentials!
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Otppage;
