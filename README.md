# Commonwealth Labs Landing Page

The official landing page for [commonwealthlabs.io](https://commonwealthlabs.io) - open-source civic technology for engaged democracy.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** - Styling
- **[TypeScript](https://typescriptlang.org)** - Type safety

## Project Structure

```
commonwealthlabs.io/
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Site pages (index, about, network, join)
│   └── styles/         # Global styles
├── public/             # Static assets (logos, favicons)
├── infra/              # Terraform infrastructure (S3 + CloudFront)
└── .github/workflows/  # CI/CD pipeline
```

## Deployment

The site automatically deploys to AWS S3 + CloudFront when changes are pushed to `main`.

### Required Secrets

Configure these in GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key for deployment |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `S3_BUCKET_NAME` | S3 bucket name (from Terraform output) |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID (from Terraform output) |

### Infrastructure Setup

See [infra/README.md](infra/README.md) for Terraform setup instructions.

## Pages

- **Home** (`/`) - Mission, features, calls to action
- **About** (`/about`) - Mission, what we build, open source commitment
- **Network** (`/network`) - How the network works, benefits, current members
- **Join** (`/join`) - Requirements, steps to join, FAQ

## Brand Assets

Brand assets are duplicated from the [qckstrt](https://github.com/rodneygagnon/qckstrt) repository. If assets change, update them in `public/`.

## Related Repositories

- **[qckstrt](https://github.com/rodneygagnon/qckstrt)** - The QCKSTRT platform (forkable by jurisdictions)
- This repo is for the Commonwealth Labs marketing site only

## License

MIT License - See [LICENSE](LICENSE) file.
