const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    emailjs: {
      serviceId: process.env.EMAILJS_SERVICE_ID!,
      templates: {
        welcome: process.env.EMAILJS_WELCOME_TEMPLATE_ID!,
        verification: process.env.EMAILJS_VERIFICATION_TEMPLATE_ID!,
        passwordReset: process.env.EMAILJS_PASSWORD_RESET_TEMPLATE_ID!,
        notification: process.env.EMAILJS_NOTIFICATION_TEMPLATE_ID!,
      },
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
    },
    resendToken: process.env.RESEND_TOKEN!,
  },
};

export default config;
