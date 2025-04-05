import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import emailjs from "@emailjs/browser"
import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

// This function is used to send an email using the QStash service and Resend service
// It takes an object with email, subject, and message as parameters
// and sends an email using the Resend service with the provided details
// It returns a promise that resolves when the email is sent successfully
// or rejects with an error if there is an issue with sending the email

// export const sendEmail = async ({
//   email,
//   subject,
//   message,
// }: {
//   email: string;
//   subject: string;
//   message: string;
// }) => {
//   await qstashClient.publishJSON({
//     api: {
//       name: "email",
//       provider: resend({ token: config.env.resendToken }),
//     },
//     body: {
//       from: "JS Mastery <contact@adrianjsmastery.com>",
//       to: [email],
//       subject,
//       html: message,
//     },
//   });
// };



// this function is used to send an email using emailjs service
//  Email types enum for better type safety
export enum EmailType {
  WELCOME = "welcome",
  VERIFICATION = "verification",
  PASSWORD_RESET = "password_reset",
  NOTIFICATION = "notification",
  // Add more email types as needed
}

// Base email parameters
interface BaseEmailParams {
  email: string
  subject?: string
}

// Welcome email parameters
interface WelcomeEmailParams extends BaseEmailParams {
  name: string
  companyName?: string
  websiteLink?: string
  companyEmail?: string
  logoUrl?: string
}

// Verification email parameters
interface VerificationEmailParams extends BaseEmailParams {
  name: string
  verificationLink: string
}

// Password reset email parameters
interface PasswordResetEmailParams extends BaseEmailParams {
  name: string
  resetLink: string
}

// Notification email parameters
interface NotificationEmailParams extends BaseEmailParams {
  message: string
}

// Default values based on your provided code
const DEFAULT_COMPANY_NAME = "Dengi inc"
const DEFAULT_WEBSITE_LINK = "igbanibodengi.vercel.app"
const DEFAULT_COMPANY_EMAIL = "mcmorgan6560@gmail.com"
const DEFAULT_LOGO_URL = "https://github.com/shadcn.png"

// Send welcome email
export const sendWelcomeEmail = async ({
  email,
  name,
  companyName = DEFAULT_COMPANY_NAME,
  websiteLink = DEFAULT_WEBSITE_LINK,
  companyEmail = DEFAULT_COMPANY_EMAIL,
  logoUrl = DEFAULT_LOGO_URL,
}: WelcomeEmailParams) => {
  const templateParams = {
    email,
    name,
    company_name: companyName,
    website_link: websiteLink,
    company_email: companyEmail,
    logo_url: logoUrl,
  }

  return sendEmail(EmailType.WELCOME, templateParams)
}

// Send verification email
export const sendVerificationEmail = async ({
  email,
  name,
  verificationLink,
  subject = "Verify Your Email Address",
  companyName = DEFAULT_COMPANY_NAME,
  websiteLink = DEFAULT_WEBSITE_LINK,
  companyEmail = DEFAULT_COMPANY_EMAIL,
  logoUrl = DEFAULT_LOGO_URL,
}: VerificationEmailParams & {
  companyName?: string
  websiteLink?: string
  companyEmail?: string
  logoUrl?: string
}) => {
  const templateParams = {
    email,
    subject,
    name,
    verification_link: verificationLink,
    company_name: companyName,
    website_link: websiteLink,
    company_email: companyEmail,
    logo_url: logoUrl,
  }

  // You'll need to create a separate template for verification emails
  return sendEmail(EmailType.VERIFICATION, templateParams)
}

// Send password reset email
export const sendPasswordResetEmail = async ({
  email,
  name,
  resetLink,
  subject = "Reset Your Password",
  companyName = DEFAULT_COMPANY_NAME,
  websiteLink = DEFAULT_WEBSITE_LINK,
  companyEmail = DEFAULT_COMPANY_EMAIL,
  logoUrl = DEFAULT_LOGO_URL,
}: PasswordResetEmailParams & {
  companyName?: string
  websiteLink?: string
  companyEmail?: string
  logoUrl?: string
}) => {
  const templateParams = {
    email,
    subject,
    name,
    reset_link: resetLink,
    company_name: companyName,
    website_link: websiteLink,
    company_email: companyEmail,
    logo_url: logoUrl,
  }

  // You'll need to create a separate template for password reset emails
  return sendEmail(EmailType.PASSWORD_RESET, templateParams)
}

// Send notification email
export const sendNotificationEmail = async ({
  email,
  message,
  subject
}: NotificationEmailParams) => {
  const templateParams = {
    email,
    message,
    subject,
  }

  return sendEmail(EmailType.NOTIFICATION, templateParams)
}

// Base email sending function
const sendEmail = async (type: EmailType, templateParams: Record<string, any>) => {
  try {
    // Get the appropriate template ID based on email type
    const templateId = getTemplateId(type)
    const serviceId = config.env.emailjs.serviceId

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      config.env.emailjs.publicKey
    )

    console.log(`${type} email sent successfully:`, response)
    return response
  } catch (error) {
    console.error(`Failed to send ${type} email:`, error)
    throw error
  }
}

// Function to get template ID based on email type
const getTemplateId = (type: EmailType): string => {
  switch (type) {
    case EmailType.WELCOME:
      return config.env.emailjs.templates.welcome // Your welcome template ID
    case EmailType.VERIFICATION:
      return config.env.emailjs.templates.verification || "" // You'll need to create this template
    case EmailType.PASSWORD_RESET:
      return config.env.emailjs.templates.passwordReset || "" // You'll need to create this template
    case EmailType.NOTIFICATION:
      return config.env.emailjs.templates.notification || "" // You'll need to create this template
    default:
      throw new Error(`Unknown email type: ${type}`)
  }
}



// Base email sending function
// const sendEmail = async (type: EmailType, templateParams: Record<string, any>) => {
//   try {
//     const templateId = getTemplateId(type)

//     const response = await emailjs.send(
//       config.env.emailjs.serviceId,
//       templateId,
//       templateParams,
//       config.env.emailjs.publicKey,
//     )

//     console.log(`${type} email sent successfully:`, response)
//     return response
//   } catch (error) {
//     console.error(`Failed to send ${type} email:`, error)
//     throw error
//   }
// }

