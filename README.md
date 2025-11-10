# PostFlow AI

An intelligent LinkedIn post generation platform that leverages AI to create viral content with advanced virality scoring and comprehensive post management.

## 🚀 Features

### Core Functionality
- **AI-Powered Post Generation**: Generate LinkedIn posts using Google's Gemini AI
- **Virality Score Calculator**: Advanced algorithm to predict post performance
- **Post Library**: Save and manage your generated posts
- **Customizable Post Configuration**: Fine-tune every aspect of your content
- **Real-time Analytics**: Track post performance and engagement metrics

### Post Customization Options
- **Post Types**: Insight, Story, Question, Announcement, Tutorial
- **Tone Variations**: Professional, Casual, Inspirational, Humorous, Technical
- **Length Options**: Short, Medium, Long posts
- **Format Styles**: Standard, Numbered List, Bullet Points, Q&A
- **Hook Styles**: Question, Statistic, Story, Bold Statement
- **CTA Types**: Engagement, Visit Link, Follow, Comment, Share
- **Hashtag Strategies**: Minimal, Moderate, Extensive

### User Features
- **Authentication**: Secure user login/registration with Better Auth
- **Usage Tracking**: Monitor post generation limits and usage patterns
- **Feedback System**: Collect user feedback and bug reports
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Technology Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: Latest React version with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **React Hook Form**: Form management with Zod validation
- **Framer Motion**: Animations and transitions

### Backend & Database
- **Next.js API Routes**: Serverless API endpoints
- **Drizzle ORM**: Type-safe SQL toolkit
- **LibSQL**: Lightweight SQLite database
- **Better Auth**: Authentication solution

### AI & External Services
- **Google Gemini AI**: Content generation
- **Zod**: Schema validation

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Setup

1. **Clone the repository**
```bash
git clone <https://github.com/khalidh1b/postflow-ai.git>
cd postflow-ai
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# AI Service
GEMINI_API_KEY="your-google-gemini-api-key"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Optional: OAuth Providers
AUTH_GOOGLE_ID="your-google-oauth-id"
AUTH_GOOGLE_SECRET="your-google-oauth-secret"
```

4. **Database Setup**
```bash
# Run database migrations
pnpm drizzle-kit push

# (Optional) Generate migrations
pnpm drizzle-kit generate
```

5. **Start Development Server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── generate-post/ # Post generation API
│   │   ├── feedback/      # Feedback system
│   │   └── posts/         # Post management
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── pricing/           # Pricing page
│   └── ...
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── post-generator/   # Post generation components
│   ├── layout/           # Layout components
│   └── ...
├── db/                   # Database schema and configuration
├── lib/                  # Utility functions and configurations
├── hooks/                # Custom React hooks
├── contexts/             # React contexts
└── types/                # TypeScript type definitions
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
pnpm drizzle-kit push     # Push schema changes to database
pnpm drizzle-kit generate # Generate migration files
pnpm drizzle-kit studio   # Open Drizzle Studio
```

## 🎯 Core Components

### Post Generation Flow
1. **Configuration Form**: Users customize post parameters
2. **AI Processing**: Gemini AI generates content based on configuration
3. **Virality Scoring**: Algorithm calculates potential performance
4. **Preview & Edit**: Users can review and modify generated content
5. **Save to Library**: Posts are stored for future reference

### API Endpoints

#### POST `/api/generate-post`
Generates a LinkedIn post with virality scoring.

#### Authentication Endpoints
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout


## 🎨 UI Components

The application uses a comprehensive component library built with:
- **Radix UI**: For accessible primitives
- **Tailwind CSS**: For styling
- **Lucide React**: For icons
- **Framer Motion**: For animations

Key UI components include:
- Form controls with validation
- Post configuration sections
- Virality score displays
- Post library management
- Responsive navigation

## 🔐 Authentication

Implemented using **Better Auth** with:
- Email/password authentication
- Session management
- Protected routes
- User profile management

## 📊 Database Schema

### Core Tables
- **users**: User accounts and profiles
- **sessions**: Authentication sessions
- **posts**: Generated LinkedIn posts with metadata
- **user_feedback**: User feedback and bug reports
- **usage_tracking**: Post generation usage limits

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and feedback:
- Use the in-app feedback system
- Report issues on GitHub

## 🔮 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Post scheduling feature
- [ ] Multi-platform support (Twitter, Facebook)
- [ ] Team collaboration features
- [ ] Advanced AI model options
- [ ] A/B testing for posts
- [ ] Template library
- [ ] Export functionality


Built with ❤️ using Next.js, TypeScript, and Gemini AI.