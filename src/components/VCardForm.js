import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faPhone, faEnvelope, faMapMarkerAlt, faCalendarAlt, faLink } from '@fortawesome/free-solid-svg-icons';

export default function VCardForm({ vCardDetails, setVCardDetails, setText }) {
  const handleVCardInputChange = (e) => {
    const { name, value } = e.target;
    setVCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    setText(
      `BEGIN:VCARD\nVERSION:3.0\nFN:${vCardDetails.fullName}\nORG:${vCardDetails.organization}\nTEL:${vCardDetails.phone}\nEMAIL:${vCardDetails.email}\nADR:${vCardDetails.address}\nBDAY:${vCardDetails.birthday}\nURL:${vCardDetails.url}\nEND:VCARD`
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-4xl mx-auto mb-6">
      <div className="space-y-6">
        {[
          { name: 'fullName', label: 'Full Name', icon: faUser, placeholder: 'John Doe' },
          { name: 'organization', label: 'Organization', icon: faBuilding, placeholder: 'Company Inc.' },
          { name: 'phone', label: 'Phone', icon: faPhone, placeholder: '+1234567890' },
          { name: 'email', label: 'Email', icon: faEnvelope, placeholder: 'example@example.com' },
          { name: 'address', label: 'Address', icon: faMapMarkerAlt, placeholder: '123 Main St, Anytown, USA' },
          { name: 'birthday', label: 'Birthday', icon: faCalendarAlt, type: 'date' },
          { name: 'url', label: 'URL', icon: faLink, placeholder: 'http://example.com' }
        ].map(({ name, label, icon, placeholder, type = 'text' }) => (
          <div key={name} className="flex items-center space-x-4">
            <FontAwesomeIcon icon={icon} className="text-gray-600" />
            <div className="flex-1">
              <label htmlFor={name} className="block text-gray-700 font-medium mb-1 capitalize">{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={vCardDetails[name] || ''}
                onChange={handleVCardInputChange}
                placeholder={placeholder}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
