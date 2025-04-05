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

// Email types enum for better type safety
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
  companyName?: string
  websiteLink?: string
  companyEmail?: string
  logoUrl?: string
}

// Verification email parameters
interface VerificationEmailParams extends BaseEmailParams {
  userName: string
  verificationLink: string
}

// Password reset email parameters
interface PasswordResetEmailParams extends BaseEmailParams {
  userName: string
  resetLink: string
}

// Notification email parameters
interface NotificationEmailParams extends BaseEmailParams {
  message: string
}

// Function to get template ID based on email type
const getTemplateId = (type: EmailType): string => {
  switch (type) {
    case EmailType.WELCOME:
      return config.env.emailjs.templates.welcome
    case EmailType.VERIFICATION:
      return config.env.emailjs.templates.verification
    case EmailType.PASSWORD_RESET:
      return config.env.emailjs.templates.passwordReset
    case EmailType.NOTIFICATION:
      return config.env.emailjs.templates.notification
    default:
      throw new Error(`Unknown email type: ${type}`)
  }
}


// Send welcome email
export const sendWelcomeEmail = async ({
  email,
  subject = "Welcome to our platform!",
  companyName = "Fullstack Template",
  websiteLink = "https://fullstack-template-one.vercel.app/",
  companyEmail = "contact@fullstack.com",
  logoUrl = "https://github.com/shadcn.png",
}: WelcomeEmailParams & {
  companyName?: string
  websiteLink?: string
  companyEmail?: string
  logoUrl?: string
}) => {
  const templateParams = {
    to_email: email,
    subject,
    company_name: companyName,
    website_link: websiteLink,
    company_email: companyEmail,
    logo_url: logoUrl,
    from_name: companyName,
    reply_to: companyEmail,
  }

  return sendEmail(EmailType.WELCOME, templateParams)
}


// Send verification email
export const sendVerificationEmail = async ({
  email,
  userName,
  verificationLink,
  subject = "Verify Your Email Address",
}: VerificationEmailParams) => {
  const templateParams = {
    to_email: email,
    subject,
    user_name: userName,
    verification_link: verificationLink,
    from_name: "JS Mastery",
    reply_to: "contact@adrianjsmastery.com",
  }

  return sendEmail(EmailType.VERIFICATION, templateParams)
}

// Send password reset email
export const sendPasswordResetEmail = async ({
  email,
  userName,
  resetLink,
  subject = "Reset Your Password",
}: PasswordResetEmailParams) => {
  const templateParams = {
    to_email: email,
    subject,
    user_name: userName,
    reset_link: resetLink,
    from_name: "JS Mastery",
    reply_to: "contact@adrianjsmastery.com",
  }

  return sendEmail(EmailType.PASSWORD_RESET, templateParams)
}

// Send notification email
export const sendNotificationEmail = async ({
  email,
  message,
  subject = "New Notification",
}: NotificationEmailParams) => {
  const templateParams = {
    to_email: email,
    subject,
    message,
    from_name: "JS Mastery",
    reply_to: "contact@adrianjsmastery.com",
  }

  return sendEmail(EmailType.NOTIFICATION, templateParams)
}

// Base email sending function
const sendEmail = async (type: EmailType, templateParams: Record<string, any>) => {
  try {
    const templateId = getTemplateId(type)

    const response = await emailjs.send(
      config.env.emailjs.serviceId,
      templateId,
      templateParams,
      config.env.emailjs.publicKey,
    )

    console.log(`${type} email sent successfully:`, response)
    return response
  } catch (error) {
    console.error(`Failed to send ${type} email:`, error)
    throw error
  }
}

