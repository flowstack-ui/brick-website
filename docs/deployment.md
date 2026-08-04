# Deployment

- Development: `127.0.0.1:3012`
- LAN review: `0.0.0.0:3012`
- Automated browser preview allocation: `127.0.0.1:4012`

Run `npm run verify` before preview or production deployment. Vercel project
identifiers remain local to Vercel's ignored configuration; application
secrets belong in ignored environment files. Preview and generated deployment
URLs stay protected. The reviewed production deployment is promoted to the
canonical `brick-ui.com` apex only after its remote qualification gate passes.
