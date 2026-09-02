# HYDUP Technology — Full-Stack Website

## What this includes
- Premium animated frontend
- HYDUP logo
- Services: Website Development, AI & Business Automation, Digital Marketing, Business Software
- Responsive mobile layout
- Contact form
- Node.js + Express backend
- Nodemailer Gmail integration
- No database required
- Contact form submissions are emailed to `hyduptechnology@gmail.com`

## 1. Install
Install Node.js, then in this folder run:

```bash
npm install
```

## 2. Configure Gmail
Copy `.env.example` to `.env`.

Set:
- `GMAIL_USER=hyduptechnology@gmail.com`
- `GMAIL_APP_PASSWORD=...`
- `TO_EMAIL=hyduptechnology@gmail.com`

The Gmail App Password is NOT your normal Gmail password. Google requires 2-Step Verification before an App Password can be created.

## 3. Run
```bash
npm start
```

Open:
`http://localhost:3000`

## 4. Deploy
Deploy this Node.js project to a Node-compatible host. Set the same environment variables in the host dashboard. Point `hyduptechnology.in` to the deployed app.

## Important
Never upload `.env` or your Gmail App Password to GitHub or share it publicly.
