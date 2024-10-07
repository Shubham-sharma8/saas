'use client'
 
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { AiOutlineCheckCircle, AiOutlineShareAlt } from 'react-icons/ai';
import { FaPlusCircle } from 'react-icons/fa';

// import { subscribeUser, unsubscribeUser, sendNotification } from '@/app/actions'


 
// function urlBase64ToUint8Array(base64String: string) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
//   const base64 = (base64String + padding)
//     .replace(/-/g, '+')
//     .replace(/_/g, '/')

//   try {
//     const rawData = window.atob(base64)
//     const outputArray = new Uint8Array(rawData.length)

//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i)
//     }

//     return outputArray
//   } catch (error) {
//     console.error('Invalid Base64 string:', base64String, error)
//     throw new Error('Invalid Base64 string')
//   }
// }

// function PushNotificationManager() {
//   const [isSupported, setIsSupported] = useState(false)
//   const [subscription, setSubscription] = useState<PushSubscription | null>(
//     null
//   )
//   const [message, setMessage] = useState('')
 
//   useEffect(() => {
//     if ('serviceWorker' in navigator && 'PushManager' in window) {
//       setIsSupported(true)
//       registerServiceWorker()
//     }
//   }, [])
 
//   async function registerServiceWorker() {
//     const registration = await navigator.serviceWorker.register('/sw.js', {
//       scope: '/',
//       updateViaCache: 'none',
//     })
//     const sub = await registration.pushManager.getSubscription()
//     setSubscription(sub)
//   }
 
//   async function subscribeToPush() {
//     const registration = await navigator.serviceWorker.ready
//     const sub = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array(
//         process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//       ),
//     })
//     setSubscription(sub)
//     await subscribeUser(sub)
//   }
 
//   async function unsubscribeFromPush() {
//     await subscription?.unsubscribe()
//     setSubscription(null)
//     await unsubscribeUser()
//   }
 
//   async function sendTestNotification() {
//     if (subscription) {
//       await sendNotification(message)
//       setMessage('')
//     }
//   }
 
//   if (!isSupported) {
//     return <p>Push notifications are not supported in this browser.</p>
//   }
 
//   return (
//     <div>
//       <h3>Push Notifications</h3>
//       {subscription ? (
//         <>
//           <p>You are subscribed to push notifications.</p>
//           <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//           <input
//             type="text"
//             placeholder="Enter notification message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={sendTestNotification}>Send Test</button>
//         </>
//       ) : (
//         <>
//           <p>You are not subscribed to push notifications.</p>
//           <button onClick={subscribeToPush}>Subscribe</button>
//         </>
//       )}
//     </div>
//   )
// }

function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false);

  const handleAccept = () => {
    // Show the instructions after the button is clicked
    setShowInstructions(true);
  };
   
    useEffect(() => {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
      )
   
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])
   
    if (isStandalone) {
      return null // Don't show install button if already installed
    }
   
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f5', borderRadius: '8px' }}>
    {isIOS && (
      <>
        <h3 style={{ color: '#4a4a4a', marginBottom: '20px' }}>Install App</h3>
        <Button
          variant="primary"
          onClick={handleAccept}
          style={{
            backgroundColor: '#007bff',
            borderColor: '#007bff',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '30px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          <AiOutlineCheckCircle style={{ marginRight: '8px' }} />
          Accept
        </Button>

        {/* Show instructions only when the button is clicked */}
        {showInstructions && (
          <p style={{ marginTop: '20px', color: '#4a4a4a', fontSize: '14px' }}>
            To install this app on your iOS device, tap the share button
            <AiOutlineShareAlt style={{ margin: '0 5px' }} />
            and then &quot;Add to Home Screen&quot;
            <FaPlusCircle style={{ marginLeft: '5px' }} />.
          </p>
        )}
      </>
    )}
  </div>
}
   
  export default function PageHome() {
    return (
      <div>
        {/* <PushNotificationManager /> */}
        <InstallPrompt />
      </div>
    )
  }