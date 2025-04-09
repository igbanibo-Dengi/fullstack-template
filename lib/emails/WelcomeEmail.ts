// lib/emails/welcomeEmail.ts

export const getWelcomeEmailHTML = (fullName: string) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #4F46E5; margin-bottom: 20px;">Welcome aboard, ${fullName} 👋</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          We're excited to have you join our platform!
        </p>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          You now have access to tools, features, and a community designed to help you grow and succeed.
        </p>
        <p style="color: #555; font-size: 16px; line-height: 1.6;">
          If you ever have questions or need support, feel free to reach out—we're here to help.
        </p>

        <div style="margin: 30px 0; text-align: center;">
          <a href="https://igbanibodengi.vercel.app" target="_blank" style="background-color: #4F46E5; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Explore Now
          </a>
        </div>

        <p style="color: #555; font-size: 16px;">Cheers,</p>
        <p style="color: #111; font-size: 16px;"><strong>The fullstack-template Team</strong></p>
      </div>
    </div>
  `;
};
