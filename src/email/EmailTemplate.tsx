export function EmailTemplate({ name, fPhotoUrl }: { name: string; fPhotoUrl: string }): string {
  // Escape variables to prevent XSS
  const safeName = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safePhotoUrl = fPhotoUrl.replace(/"/g, '&quot;');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Memory Wall Framed Photo</title>
  <style>
    .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
    .header { text-align: center; margin-bottom: 20px; }
    .logo { max-width: 100%; width: 250px, height: auto; }
    .greeting { font-size: 24px; font-weight: bold; color: #f97316; margin-bottom: 20px; }
    .message { font-size: 16px; color: #333333; margin-bottom: 20px; line-height: 1.5; }
    .photo { max-width: 100%; height: auto; margin-bottom: 20px; border-radius: 8px; }
    .button { display: inline-block; padding: 12px 24px; background-color: #f97316; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; }
    .button:hover { background-color: #e66915; }
    .footer { font-size: 14px; color: #666666; text-align: center; margin-top: 20px; }
    @media only screen and (max-width: 600px) {
      .container { padding: 10px; }
      .greeting { font-size: 20px; }
      .message { font-size: 14px; }
      .button { padding: 10px 20px; font-size: 14px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="cid:logo" alt="MovingSurface Logo" class="logo" />
    </div>
    <div class="greeting">Hi ${safeName},</div>
    <div class="message">
      Your memory is ready to shine on the Memory Wall! 🎉 We've framed your special moment, and it's looking fantastic. Check it out below and keep it forever with the download link!
    </div>
    <img src="cid:framedPhoto" alt="Your Framed Memory" class="photo" />
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${safePhotoUrl}" class="button">Download Your Framed Photo</a>
    </div>
    <div class="footer">
      Thank you for sharing your memory with us!<br />
      &copy; 2025 MovingSurface. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;
}