// Uses Fast2SMS API. Replace with MSG91 or Twilio if preferred.
// Fast2SMS docs: https://docs.fast2sms.com

export async function sendOTPSms(mobile: string, otp: string): Promise<boolean> {
  // In development, just log the OTP
  if (process.env.NODE_ENV === "development" || !process.env.SMS_API_KEY) {
    console.log(`[DEV] OTP for ${mobile}: ${otp}`);
    return true;
  }

  const message = `${otp} is your OTP for Sri Mahalakshmi Community Hall booking. Valid for 5 minutes. Do not share with anyone.`;

  try {
    const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: process.env.SMS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "otp",
        message,
        language: "english",
        flash: 0,
        numbers: mobile,
      }),
    });
    const data = await res.json();
    return data.return === true;
  } catch (err) {
    console.error("SMS send failed:", err);
    return false;
  }
}
