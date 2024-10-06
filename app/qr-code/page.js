'use client';

import dynamic from 'next/dynamic';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import CategorySelector from '../CategorySelector/page';
import VCardForm from '../VCardForm/page';
import WifiForm from '../WifiForm/page';
import ColorPicker from '../ColorPicker/page';
import QRCodeCanvas from '../QRCodeCanvas/page';
import SizeSlider from '../SizeSlider/page';
import FileUploader from '../FileUploader/page';
import DownloadButton from '../DownloadButton/page';
import { useEffect, useRef, useState } from 'react';

const QRCodeStyling = dynamic(() => import('qr-code-styling'), { ssr: false });

export default function QRCodeGenerator() {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const qrCodeInstance = new QRCodeStyling({
        width: size,
        height: size,
        data: text,
        dotsOptions: { color, type: shape },
        cornersSquareOptions: { type: frame },
        cornersDotOptions: { type: eyeShape, color: eyeColor },
        backgroundOptions: { color: bgColor },
      });
      setQrCode(qrCodeInstance);
    }
  }, [text, color, bgColor, size, shape, frame, eyeShape, eyeColor]);

}
