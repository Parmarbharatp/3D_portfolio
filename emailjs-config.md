# EmailJS Configuration Guide

## Required Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

## How to Get These Values

1. **Public Key**: Go to EmailJS dashboard → Account → API Keys → Public Key
2. **Service ID**: Go to EmailJS dashboard → Email Services → Your Service → Service ID
3. **Template ID**: Go to EmailJS dashboard → Email Templates → Your Template → Template ID

## Important Notes

- All environment variables must start with `VITE_` for Vite to expose them to the client
- Restart your development server after creating/modifying the `.env` file
- Never commit your `.env` file to version control (it should be in `.gitignore`)

## Testing

After setting up the environment variables:
1. Fill out the contact form
2. Submit the form
3. Check the browser console for any errors
4. Check your email for the received message

The form will now work with your EmailJS configuration!
