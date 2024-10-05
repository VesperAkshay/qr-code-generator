import React, { useState, useEffect, useRef } from 'react';
import { FaClipboard, FaCamera, FaImage, FaTimes, FaCheck, FaLightbulb } from 'react-icons/fa';
import QrScanner from "qr-scanner";
import toast from 'react-hot-toast';

export default function QRScanner() {
    const [scannedData, setScannedData] = useState({});
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [noCameraFound, setNoCameraFound] = useState(false);
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [hasFlash, setHasFlash] = useState(false);
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);

    useEffect(() => {
        const initQrScanner = async () => {
            if (!videoRef.current) return;

            qrScannerRef.current = new QrScanner(
                videoRef.current,
                result => handleScan(result.data),
                {
                    onDecodeError: error => {
                        console.error('QR decoding error:', error);
                    },
                    highlightCodeOutline: true,
                    highlightScanRegion: true,
                }
            );

            try {
                await fetchDevices();
                if (selectedDeviceId) {
                    await qrScannerRef.current.setCamera(selectedDeviceId);
                }
                await qrScannerRef.current.start();

                // Check for flash support
                const flashAvailable = await qrScannerRef.current.hasFlash();
                setHasFlash(flashAvailable);

            } catch (err) {
                console.error('Error starting QR scanner:', err);
            }
        };

        const fetchDevices = async () => {
            try {
                const mediaDevices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = mediaDevices.filter(device => device.kind === 'videoinput' && device.deviceId !== '');
                setDevices(videoDevices);
                setNoCameraFound(videoDevices.length === 0);
                if (!selectedDeviceId && videoDevices.length > 0) {
                    setSelectedDeviceId(videoDevices[0].deviceId);
                }
            } catch (err) {
                setNoCameraFound(true);
                console.error('Error fetching devices:', err);
            }
        };

        if (isCameraActive) {
            initQrScanner();
        }

        return () => {
            if (qrScannerRef.current) {
                qrScannerRef.current.stop();
            }
        };
    }, [isCameraActive, selectedDeviceId]);

    const handleScan = (data) => {
        if (data) {
            const scannedText = typeof data === 'object' && data.text ? data.text : data;
            setScannedData({ error: false, result: scannedText });
        }
    };

    const handleFileError = (_) => {
        setScannedData({ error: true, result: "Error while scanning the image!" });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        QrScanner.scanImage(file, { returnDetailedScanResult: true })
            .then(result => {
                handleScan(result.data);
            })
            .catch(e => handleFileError(e));
    };

    const toggleCamera = () => {
        setIsCameraActive(!isCameraActive);
        setScannedData({});
    };

    const toggleFlash = async () => {
        if (qrScannerRef.current) {
            try {
                const newFlashState = !isFlashOn;
                await qrScannerRef.current.toggleFlash();
                setIsFlashOn(newFlashState);
            } catch (error) {
                console.error('Error toggling flash:', error);
            }
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(scannedData.result)
            .then(() => {
                toast.success('Copied to clipboard');
            })
            .catch(err => {
                toast.error('Failed to copy');
                console.error('Failed to copy: ', err);
            });
    };

    const handleDeviceChange = (event) => {
        const newDeviceId = event.target.value;
        setSelectedDeviceId(newDeviceId);
        if (qrScannerRef.current) {
            qrScannerRef.current.setCamera(newDeviceId);
        }
    };

    return (
        <div className="p-8 bg-purple-100 dark:bg-[#2b2661] shadow-lg rounded-lg max-w-lg mx-auto">
            <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800 flex items-center justify-center dark:text-gray-200">
                <FaCamera className="mr-2" /> QR Code Scanner
            </h1>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center dark:text-gray-300">
                    <FaCamera className="mr-2" /> Scan with Camera
                </h2>
                <div className="flex w-full justify-center gap-5 items-center">
                    <button
                        onClick={toggleCamera}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-600 disabled:opacity-50"
                        disabled={noCameraFound}
                    >
                        {isCameraActive && !noCameraFound ? <FaTimes className="mr-2" /> : <FaCheck className="mr-2" />}
                        {isCameraActive && !noCameraFound ? 'Turn Off Camera' : 'Turn On Camera'}
                    </button>

                    {noCameraFound ? (
                        <div className="px-4 py-2 rounded-md mb-4 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 flex flex-col items-center">
                            <p className="font-semibold flex items-center justify-between">No Camera Found!</p>
                            <p className="text-xs">Check site permissions and devices</p>
                        </div>
                    ) : (
                        <select
                            onChange={handleDeviceChange}
                            value={selectedDeviceId || ''}
                            className="bg-gray-200 text-gray-800 w-60 px-4 py-2 rounded-md mb-4 flex items-center justify-center truncate"
                        >
                            {devices.map((device, index) => (
                                <option key={index} value={device.deviceId}>
                                    {device.label || `Camera ${index + 1}`}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {(isCameraActive && !noCameraFound) && (
                    <div className="relative">
                        <video
                            id="videoContainer"
                            className="w-full h-full aspect-square object-cover rounded-lg"
                            ref={videoRef}
                        />
                        {hasFlash && (
                            <button
                                onClick={toggleFlash}
                                className="absolute top-2 right-2 text-white"
                            >
                                <FaLightbulb size={32} className={isFlashOn ? 'text-yellow-500' : 'text-gray-500'} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center  dark:text-gray-200">
                    <FaImage className="mr-2" /> Scan from Image
                </h2>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4 w-full p-2 border border-gray-400  dark:text-gray-200 rounded-lg"
                />
            </div>

            {scannedData.result && (
                <div
                    className={`p-4 rounded-lg font-semibold flex items-center justify-between ${
                        scannedData.error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                >
                    <span>Scanned Data: {scannedData.result}</span>
                    <button onClick={copyToClipboard}
                            className="ml-4 text-blue-600 hover:text-blue-800 flex items-center">
                        <FaClipboard size={24} className="mr-2" /> Copy
                    </button>
                </div>
            )}
        </div>
    );
}