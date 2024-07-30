"use client";
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
          <div className="w-1/3 bg-white flex   rounded  relative">
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8AAxAr9ZNr9JCwn2QZ35rSWWuiayhh0ayQ&s"
              }
              alt="fja"
              width={100}
              height={100}
              className="w-full h-full"
            />
            <div className=" flex flex-col px-2 py-4 ">
              <input
                placeholder="Mobile"
                type="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="text-black bg-gray-300 rounded px-1 py-3 "
              />
              <p className="text-red-500 absolute top-16 ">{mobileErr}</p>
              <button
                className="text-white bg-blue-500 mt-5  px-2 py-2 rounded"
                onClick={() => {
                  if (phone.length < 10) {
                    return setMobileErr("Please enter valid number");
                  }
                  setScreen("otp");
                }}
              >
                Request Otp
              </button>
            </div>
          </div>
        )}

        {screen === "otp" && (
          <div className="w-1/2 bg-white flex  gap-4 rounded ">
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8AAxAr9ZNr9JCwn2QZ35rSWWuiayhh0ayQ&s"
              }
              alt="fja"
              width={100}
              height={100}
              className="w-full h-full"
            />
            <div className="flex flex-col w-full py-4 h-full justify-center px-3 text-black">
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
          <div className=" flex justify-between w-1/2">
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8AAxAr9ZNr9JCwn2QZ35rSWWuiayhh0ayQ&s"
              }
              alt="fja"
              width={100}
              height={100}
              className="w-full h-full"
            />
            <div className="bg-white flex flex-col py-3 gap-4 rounded px-2">
              {!selfie && (
                <div>
                  <div>
                    <video
                      ref={videoRef}
                      width="320"
                      height="240"
                      autoPlay
                      className="w-full"
                    ></video>
                    <canvas
                      ref={canvasRef}
                      width="320"
                      height="240"
                      style={{ display: "none" }}
                      className="w-full"
                    ></canvas>
                  </div>

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
                <div>
                  <img src={selfie} alt="Selfie" className="w-full " />

                  <p className="text-red-500">{selfieErr}</p>
                </div>
              )}

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
                className="bg-blue-500 p-2 w-full mt-4 rounded-md"
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
