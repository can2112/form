"use client";
import { useRef, useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [screen, setScreen] = useState("mobile");
  const [otp, setOtp] = useState(1234);
  const [mobileErr, setMobileErr] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [selfie, setSelfie] = useState(null);

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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Selfie submitted:", selfie);
  };
  return (
    <main>
      <p>this is a new next app</p>

      <div className=" flex justify-center items-center h-screen">
        {screen === "mobile" && (
          <div className="w-1/3 bg-gray-400 flex flex-col py-3 gap-2 rounded px-2 relative">
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
        )}

        {screen === "otp" && (
          <div className="w-1/3 bg-gray-400 flex flex-col py-3 gap-4 rounded px-2">
            <input
              placeholder="Mobile"
              type="number"
              value={otp}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              className="text-black bg-gray-300 rounded px-1 py-3"
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
        )}

        {screen === "personal" && (
          <div className="w-1/3 bg-gray-400 flex flex-col py-3 gap-4 rounded px-2">
            <h1>Take a Selfie</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <video ref={videoRef} width="320" height="240" autoPlay></video>
                <canvas
                  ref={canvasRef}
                  width="320"
                  height="240"
                  style={{ display: "none" }}
                ></canvas>
              </div>
              <button type="button" onClick={startCamera}>
                Start Camera
              </button>
              <button type="button" onClick={takeSelfie}>
                Take Selfie
              </button>
              <button type="submit">Submit</button>
            </form>
            {selfie && (
              <div>
                <h2>Your Selfie</h2>
                <img src={selfie} alt="Selfie" />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
