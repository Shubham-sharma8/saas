import React, { useEffect, useRef } from 'react';

const RazorpayButton: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', 'pl_P8zcTTUfmUUUHs');
    script.async = true;
    
    // Append the script inside the form element
    if (formRef.current) {
      formRef.current.appendChild(script);
    }

    // Cleanup script on unmount
    return () => {
      if (formRef.current) {
        formRef.current.removeChild(script);
      }
    };
  }, []);

  return <form ref={formRef}></form>;
};

export default RazorpayButton;
