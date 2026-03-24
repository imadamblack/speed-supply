export default function fbEvent(
  eventName,
  userData = {
    phone: '',
    email: '',
    externalID: ''
  },
  eventID = Date.now(),
  clientData = {}
) {
  const standardEvents = ['PageView', 'Purchase', 'Lead', 'Contact', 'CompleteRegistration', 'InitiateCheckout'];
  const isStandard = standardEvents.includes(eventName);

  console.log(userData);
  try {
    if (typeof fbq !== 'undefined') {
      if (isStandard) {
        fbq('track', eventName, clientData);
      } else {
        fbq('trackCustom', eventName, clientData);
      }
    }
  } catch (err) {
    console.error('fbq error:', err);
  }

  const payload = JSON.stringify({
    eventName,
    eventID,
    user: {
      ph: userData.phone,
      em: userData.email,
      externalID: userData.externalID
    },
    clientData
  });

  return fetch(`/api/fb-event`, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json()).catch(err => console.log(err));
}


export function gtagSendEvent(conversionId, data = {}) {
  const fullName = data.fullName ?? '';
  const phone = data.phone ?? '';
  const [firstName = '', lastName = ''] = fullName.split(' ');

  gtag('set', 'user_data', {
    phone_number: phone.trim(),
    address: {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    },
  });

  gtag('event', 'conversion', {
    send_to: `${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}/${conversionId}`,
    event_callback: () => {},
  });


  return false;
}
