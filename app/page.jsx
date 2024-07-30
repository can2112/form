"use client";
import nextClient from "@/utils/nextClient";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [screen, setScreen] = useState("mobile");
  const [otp, setOtp] = useState(1234);
  const [mobileErr, setMobileErr] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selfie, setSelfie] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [selfieErr, setSelfieErr] = useState("");
  const [name, setName] = useState("");

  const requestOtp = (number) => {
    nextClient.post("/request-otp", number);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the camera", error);
    }
  };

  const takeSelfie = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const imageData = canvasRef.current.toDataURL("image/png");
    setSelfie(imageData);
  };

  useEffect(() => {
    if (screen == "personal") {
      startCamera();
    }
  }, [screen]);
  return (
    <main>
      <div className=" flex justify-center items-center h-screen">
        {screen === "mobile" && (
          <div className=" w-[90%]  md:w-1/2 !bg-white h-[65%] flex flex-col md:flex-row    rounded  relative justify-between">
            <div className="md:w-1/2 w-full p-0">
              <Image
                src={
                  "https://as1.ftcdn.net/v2/jpg/03/15/40/34/1000_F_315403482_MVo1gSOOfvwCwhLZ9hfVSB4MZuQilNrx.jpg"
                }
                alt="fja"
                width={700}
                height={700}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col md:w-1/2 md:justify-center md:items-between w-full py-1 px-2">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-black">Coffee Brewery</h1>
              <input
                placeholder="Mobile"
                type="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="text-black border-2 border-slate-200 rounded px-1 py-2 "
              />
              <p className="text-red-500 absolute top-16 ">{mobileErr}</p>
              <button
                className="text-white bg-blue-600 mt-5  px-2 py-2 rounded"
                onClick={() => {
                  if (phone.length < 10) {
                    return setMobileErr("Please enter valid number");
                  }
                  requestOtp(phone);
                  setScreen("otp");
                }}
              >
                Send OTP
              </button>
            </div>
          </div>
        )}

        {screen === "otp" && (
          <div className=" w-[90%]  md:w-1/2 bg-white h-[65%] flex flex-col md:flex-row    rounded   justify-between">
            <div className="md:w-1/2 w-full p-0">
              <Image
                src={
                  "https://as1.ftcdn.net/v2/jpg/03/15/40/34/1000_F_315403482_MVo1gSOOfvwCwhLZ9hfVSB4MZuQilNrx.jpg"
                }
                alt="fja"
                width={100}
                height={100}
                className=" w-full h-full"
              />
            </div>
            <div className="flex flex-col w-1/2 py-4 h-full justify-center px-3 text-black">
              <label className="px-1">OTP</label>
              <input
                placeholder="Mobile"
                type="number"
                value={otp}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="text-black bg-gray-300 rounded px-1 py-3 border border-blue-100"
              />

              <button
                className="text-white bg-blue-500 mt-5  px-2 py-2 rounded"
                onClick={() => {
                  setScreen("personal");
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {screen === "personal" && (
          <div className="w-[90%]  md:w-1/2 !bg-white h-[65%] flex flex-col md:flex-row    rounded  relative justify-between">
            <div className="md:w-1/2 w-full p-0">
              <Image
                src={
                  "https://as1.ftcdn.net/v2/jpg/03/15/40/34/1000_F_315403482_MVo1gSOOfvwCwhLZ9hfVSB4MZuQilNrx.jpg"
                }
                alt="fja"
                width={100}
                height={100}
                className=" w-full h-full"
              />
            </div>
            <div className="bg-white w-1/2 flex flex-col py-3 gap-3 rounded px-2 h-1/2">
              {!selfie && (
                <div>
                  <video
                    ref={videoRef}
                    width="300"
                    height="240"
                    autoPlay
                    className="w-full"
                  />
                  <canvas
                    ref={canvasRef}
                    width="300"
                    height="240"
                    style={{ display: "none" }}
                  />

                  <button
                    type="button"
                    className="bg-green-500 p-2 rounded-md
                  w-full mt-4 "
                    onClick={takeSelfie}
                  >
                    Take Selfie
                  </button>
                </div>
              )}

              {selfie && (
                <div className="relative">
                  <img src={selfie} alt="Selfie" className="w-full h-full" />
                </div>
              )}
              <div className=" flex flex-col gap-3 w-full h-full relative top-0">
                <p className="text-red-500 absolute top-24">{selfieErr}</p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy/MM/dd"
                  className="w-full p-2 rounded-md text-black border border-blue-100"
                  placeholderText="Select a date"
                />
                <input
                  type="text"
                  value={name}
                  className="text-black p-2 rounded-md w-full border border-blue-100"
                  placeholder="Full name"
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 p-2 w-full mt-2 rounded-md"
                  onClick={() => {
                    if (!selfie) {
                      return setSelfieErr("Please capture selfie");
                    }
                    console.log({
                      selfie: selfie,
                      name: name,
                      date: startDate,
                      phone: phone,
                      otp: otp,
                    });
                    alert(name, startDate, phone, otp);
                    setScreen("submitted");
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {screen == "submitted" && (
          <div className="w-1/3 bg-gray-400 flex flex-col py-3 gap-4 rounded px-2">
            <h1>Form Submitted</h1>
            <p>Thank you, {name}! We have received your submission.</p>
          </div>
        )}
      </div>
    </main>
  );
}
