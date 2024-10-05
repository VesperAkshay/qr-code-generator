import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faLock, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

export default function WifiForm({ wifiDetails, setWifiDetails, setText }) {
  const handleWifiInputChange = (e) => {
    const { name, value } = e.target;
    setWifiDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setText(
      `WIFI:T:${wifiDetails.encryption};S:${wifiDetails.ssid};P:${wifiDetails.password};;`
    );
  };

  return (
    <div className="p-4 bg-purple-100 dark:bg-[#2b2661] rounded-lg shadow-md max-w-4xl mx-auto mb-6">
      <div className="space-y-6">
        {[
          { name: 'ssid', label: 'SSID', icon: faWifi, placeholder: 'Your Network Name' },
          { name: 'encryption', label: 'Encryption', icon: faLock, placeholder: 'WPA/WPA2' },
          { name: 'password', label: 'Password', icon: faNetworkWired, placeholder: 'Your Network Password' }
        ].map(({ name, label, icon, placeholder }) => (
          <div key={name} className="">
              <label htmlFor={name} className="block ml-6 text-gray-700 dark:text-gray-200 font-medium mb-1 capitalize">{label}</label>
            <div className="flex space-x-3 items-center">
            <FontAwesomeIcon icon={icon} className="text-gray-600 dark:text-gray-200" />
              <input
                type="text"
                id={name}
                name={name}
                value={wifiDetails[name] || ''}
                onChange={handleWifiInputChange}
                placeholder={placeholder}
                className="w-full p-3 border bg-transparent dark:text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
