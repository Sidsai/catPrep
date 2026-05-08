# CAT Prep Tracker

A comprehensive, data-driven web application for CAT (Common Admission Test) exam preparation. Track your performance, identify weak areas, and get adaptive recommendations to maximize your exam scores.

## 🎯 Features

### 📊 Performance Analytics
- Real-time score tracking and historical data
- Category-wise accuracy analysis
- Time management insights
- Visual performance trends using interactive charts

### 🎯 Adaptive Learning System
- AI-powered recommendations based on performance
- Priority-based suggestions (High, Medium, Low)
- Category-specific improvement tips
- Learning path customization

### 📧 Smart Notifications
- Daily reminders at 7:00 AM
- Weekly performance reports (Sunday 9:00 AM)
- Monthly detailed analysis
- Email delivered via Gmail SMTP

### 📝 Study Plans
- Create personalized study schedules
- Set focus areas and goals
- Track progress over time
- Milestone-based planning

### 🧪 Practice Tests
- 100+ CAT-format practice tests
- Realistic time limits (180 minutes)
- Category-based filtering
- Difficulty levels (Easy, Medium, Hard)
- Instant score calculation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Neon PostgreSQL database
- Gmail account (for email notifications)

### Installation

1. **Clone or Download the Project**
```bash
cd cat-prep-tracker
```

2. **Install Dependencies**
```bash
pnpm install
```

3. **Set Up Environment Variables**
Create a `.env.local` file:
```env
DATABASE_URL=your_neon_postgresql_url
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_specific_password
```

4. **Run the Development Server**
```bash
pnpm dev
```

5. **Access the Application**
Open `http://localhost:3000` in your browser

## 📖 User Guide

### Getting Started
1. Visit the homepage
2. Click "Getting Started" for a comprehensive tutorial
3. Sign up with your email and password
4. Complete your profile
5. Start taking practice tests

### Taking a Test
1. Navigate to "Practice Tests"
2. Select a test by difficulty or category
3. Click "Start Test"
4. Answer all questions within the time limit
5. Submit to see instant results

### Analyzing Performance
1. Go to "Analytics" page
2. View overall statistics and trends
3. Check category-wise performance
4. Use insights to identify weak areas

### Getting Recommendations
1. Open "Recommendations" page
2. Review personalized suggestions
3. Follow high-priority recommendations first
4. Update study plans based on feedback

### Creating Study Plans
1. Navigate to "Study Plans"
2. Click "Create New Plan"
3. Set title, dates, and focus areas
4. Track progress as you take tests

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: PostgreSQL (Neon serverless)
- **Authentication**: Custom (bcryptjs password hashing)
- **Email**: Gmail SMTP via nodemailer
- **Scheduler**: node-cron (background tasks)
- **Charts**: Recharts for data visualization

### Database Schema

```
users
├── id (PK)
├── email (UNIQUE)
├── password_hash
├── full_name
├── created_at
└── updated_at

practice_tests
├── id (PK)
├── user_id (FK)
├── title
├── description
├── total_questions
├── time_limit_minutes
└── difficulty_level

test_attempts
├── id (PK)
├── user_id (FK)
├── practice_test_id (FK)
├── score
├── accuracy_percentage
├── time_spent_minutes
└── completed_at

question_performance
├── id (PK)
├── user_id (FK)
├── test_attempt_id (FK)
├── question_id
├── category
├── difficulty
├── is_correct
└── time_spent_seconds

study_plans
├── id (PK)
├── user_id (FK)
├── title
├── focus_areas
├── start_date
├── end_date
└── status

user_preferences
├── id (PK)
├── user_id (FK - UNIQUE)
├── daily_reminder_enabled
├── weekly_report_enabled
└── monthly_analysis_enabled

notifications
├── id (PK)
├── user_id (FK)
├── type
├── subject
├── body
├── status
└── sent_at

adaptive_recommendations
├── id (PK)
├── user_id (FK)
├── category
├── recommendation_type
├── description
└── priority
```

## 🔌 API Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

### Practice Tests
```
GET /api/practice-tests
POST /api/practice-tests
```

### Test Attempts
```
POST /api/test-attempts
```

### Analytics
```
GET /api/analytics/performance
```

### Recommendations
```
GET /api/recommendations
POST /api/recommendations
```

### Study Plans
```
GET /api/study-plans
POST /api/study-plans
```

See `QUICK_START_GUIDE.md` for detailed endpoint documentation.

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with features |
| Getting Started | `/getting-started` | Comprehensive tutorial |
| Register | `/register` | Create new account |
| Login | `/login` | User authentication |
| Dashboard | `/dashboard` | Main hub with stats |
| Practice Tests | `/practice-tests` | Browse and start tests |
| Analytics | `/analytics` | Performance metrics |
| Recommendations | `/recommendations` | Study suggestions |
| Study Plans | `/study-plans` | Study scheduling |

## 🔐 Security Features

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ HTTP-only secure session cookies
- ✅ Parameterized SQL queries (no injection vulnerabilities)
- ✅ Input validation on all endpoints
- ✅ CORS protection for API routes
- ✅ Environment variables for sensitive data

## 📧 Email Configuration

### Setting Up Gmail Notifications

1. **Enable 2-Step Verification** in your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → App passwords
   - Select "Mail" and "Windows Computer"
   - Copy the generated 16-character password

3. **Set Environment Variables**:
```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
```

### Scheduled Emails

- **Daily Reminders**: 7:00 AM
- **Weekly Reports**: Sunday 9:00 AM
- **Monthly Analysis**: 1st of each month

## 🔄 Background Scheduler

Runs automatically when the app starts:
- Sends daily reminder emails
- Generates weekly performance summaries
- Creates monthly analysis reports
- Cleans up old notification logs

## 📊 Analytics Dashboard

Track:
- Total tests completed
- Average and best scores
- Overall accuracy percentage
- Category-wise performance
- Time management metrics
- Historical trends

## 🎓 Study Recommendations Engine

Creates recommendations based on:
- Performance in each category
- Accuracy percentage
- Number of attempts
- Time spent per question
- Weak area identification

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Import from GitHub
- Add environment variables
- Deploy

### Environment Variables on Vercel

Add to Project Settings → Environment Variables:
- `DATABASE_URL` - Neon connection string
- `GMAIL_USER` - Gmail account
- `GMAIL_APP_PASSWORD` - App password

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon project is active
- Ensure IP whitelist allows your server

### Email Not Sending
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- Check spam/promotions folder
- Ensure app has correct permissions

### Tests Not Showing
- Wait for tests to be inserted in database
- Refresh the page
- Check database connection

### Authentication Errors
- Clear cookies and cache
- Verify environment variables are set
- Check database has `users` table

## 📝 Development

### Project Structure
```
app/
├── api/                    # API routes
│   ├── auth/              # Authentication
│   ├── practice-tests/    # Test management
│   ├── test-attempts/     # Test submissions
│   ├── analytics/         # Performance data
│   ├── recommendations/   # Suggestions
│   └── study-plans/       # Study planning
├── dashboard/             # Main dashboard
├── practice-tests/        # Practice test pages
├── analytics/             # Analytics pages
├── recommendations/       # Recommendations pages
├── study-plans/          # Study plan pages
├── login/                # Login page
├── register/             # Registration page
└── page.tsx              # Home page

components/
├── DashboardStats.tsx    # Stats cards
├── RecentTestsList.tsx   # Recent tests
├── PerformanceChart.tsx  # Charts
└── Sidebar.tsx           # Navigation

lib/
├── db.ts                 # Database client
├── email.ts              # Email service
└── scheduler.ts          # Background tasks
```

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
pnpm start
```

## 📄 License

This project is available for educational and commercial use.

## 🤝 Support

For issues or questions:
1. Check the Getting Started guide at `/getting-started`
2. Review `QUICK_START_GUIDE.md`
3. Check API documentation in this README

## 🎯 Future Enhancements

- Mobile app (React Native)
- Real-time collaboration
- Video tutorials for topics
- Community discussion forums
- Live mock tests with proctoring
- Advanced AI-powered learning paths
- Integration with official CAT exam dates

---

**Happy Studying! 🚀**

Master CAT with data-driven preparation and adaptive learning.
