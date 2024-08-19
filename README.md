# PortfolioCreator

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/Lorenzo0111/PortfolioCreator)](https://github.com/Lorenzo0111/PortfolioCreator/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Lorenzo0111/PortfolioCreator)](LICENSE)
[![Discord](https://img.shields.io/discord/1088775598337433662)](https://discord.gg/HT47UQXBqG)

</div>

## What is PortfolioCreator

PortfolioCreator is a website that allows you to create a portfolio for your projects, it's simple and easy to use.

https://github.com/user-attachments/assets/cccbc544-4df7-44c0-bcc0-932ea1c592af

## Deploying

You'll have to set the following environment variables to setup the dashboard, here is a list of them:

> ✨ You can generate secret tokens by visiting [this link](https://generate-secret.vercel.app/32)

### Dashboard Environment Variables

| Key                | Description             | Example               |
| ------------------ | ----------------------- | --------------------- |
| DATABASE_URL       | The SQLite URL          | file:/tmp/database.db |
| AUTH_GITHUB_ID     | The GitHub OAuth ID     |                       |
| AUTH_GITHUB_SECRET | The GitHub OAuth Secret |                       |
| AUTH_SECRET        | The Auth Secret         |                       |
| UPLOADTHING_SECRET | The UploadThing Secret  |                       |
| UPLOADTHING_APP_ID | The UploadThing App ID  |                       |

### Selfhosting

If you want to selfhost, you can run `pnpm`, `pnpm build` and `pnpm start` to start the program.

The dashboard will usually be available [here](http://localhost:3000/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help, feel free to join the [Discord Server](https://discord.gg/HT47UQXBqG) or open an issue.
