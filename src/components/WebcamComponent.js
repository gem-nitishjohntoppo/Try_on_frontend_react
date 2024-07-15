import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WebcamComponent = ({ selectedJewelry }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const captureFrame = useCallback(async () => {
    if (webcamRef.current && canvasRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const response = await axios.post('/api/process_frame', {
            frame: imageSrc,
            jewelry_types: selectedJewelry,
          });

          const processedImage = response.data.image;
          const img = new Image();
          img.src = `data:image/jpeg;base64,${processedImage}`;
          img.onload = () => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous frame
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          };
        } catch (error) {
          console.error('Error processing frame:', error);
        }
      }
    }
  }, [webcamRef, canvasRef, selectedJewelry]);

  const startWebcam = () => {
    if (!isWebcamOn) {
      setIsWebcamOn(true);
    }
  };

  const stopWebcam = () => {
    if (isWebcamOn) {
      setIsWebcamOn(false);
      setIsProcessing(false);
      clearCanvas();
    }
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const processFrame = () => {
    if (!isProcessing) {
      setIsProcessing(true);
      captureFrame();
    }
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(captureFrame, 100); // Capture frame every 100ms
      return () => clearInterval(interval);
    }
  }, [isProcessing, captureFrame]);

  return (
    <div className="my-4">
      {isWebcamOn && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          className="d-block mx-auto"
        />
      )}
      <canvas ref={canvasRef} width={640} height={480} className="d-block mx-auto mt-3" />
      <button className="btn btn-secondary btn-block mt-3" onClick={startWebcam}>
        Start Webcam
      </button>
      <button className="btn btn-danger btn-block mt-3" onClick={stopWebcam}>
        Stop Webcam
      </button>
      <button className="btn btn-primary btn-block mt-3" onClick={processFrame}>
        Try On
      </button>
    </div>
  );
};

export default WebcamComponent;
