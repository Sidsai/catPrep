# CAT Prep Tracker - Quick Reference Guide

## Access the Website

**URL:** `http://localhost:3000` (local development)

## Quick Navigation

### For New Users
1. **Homepage** - Overview and features (auto-redirects to dashboard if logged in)
2. **Getting Started** - Comprehensive tutorial guide (`/getting-started`)
3. **Sign Up** - Create new account (`/register`)
4. **Login** - Access existing account (`/login`)

### After Login
- **Dashboard** - Main hub with stats and recent tests (`/dashboard`)
- **Practice Tests** - Browse and start tests (`/practice-tests`)
- **Analytics** - View performance metrics (`/analytics`)
- **Recommendations** - Get personalized tips (`/recommendations`)
- **Study Plans** - Create and track goals (`/study-plans`)

---

## 5-Minute Quick Start

### 1. Sign Up (1 minute)
```
Visit: http://localhost:3000/register
Enter: Full Name, Email, Password
Click: Register
```

### 2. Access Dashboard (Automatic)
You'll be redirected to your Dashboard immediately after signup.

### 3. Take First Test (3 minutes)
- Click "Practice Tests" in sidebar
- Select any test
- Click "Start Test"
- Answer questions (timer runs automatically)
- Submit when complete

### 4. Check Performance (1 minute)
- Click "Analytics" in sidebar
- View your scores and category performance
- Check the performance chart

---

## Key Features Overview

### 📊 Analytics
- Overall Statistics: Total tests, average score, accuracy
- Category Performance: Subject-wise accuracy tracking
- Recent Tests: Last 5 test attempts with scores

### 🎯 Recommendations
- Personalized study suggestions based on performance
- Prioritized by your weak areas
- Updated after each test

### 📧 Email Notifications
- **Daily Reminders** - 7:00 AM
- **Weekly Reports** - Sunday 9:00 AM
- **Monthly Analysis** - 1st of each month

### 📝 Study Plans
- Create custom study schedules
- Set focus areas
- Track progress over time

---

## Account Management

### Login
```
Visit: http://localhost:3000/login
Enter: Email and Password
```

### Password Recovery
(If needed - currently manual password reset via admin)

### Profile Settings
- Accessible from dashboard
- Manage notification preferences
- Update personal information

---

## Database Tables (Backend)

| Table | Purpose |
|-------|---------|
| `users` | User accounts and credentials |
| `practice_tests` | Available test configurations |
| `test_attempts` | Individual test attempts and scores |
| `question_performance` | Question-level performance tracking |
| `study_plans` | User study schedules |
| `user_preferences` | Notification and notification settings |
| `notifications` | Sent and pending email notifications |
| `adaptive_recommendations` | Personalized study recommendations |

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Check current user

### Practice Tests
- `GET /api/practice-tests` - List all tests
- `POST /api/practice-tests` - Create new test

### Test Attempts
- `POST /api/test-attempts` - Submit test results

### Analytics
- `GET /api/analytics/performance` - Get performance data

### Recommendations
- `GET /api/recommendations` - Fetch recommendations
- `POST /api/recommendations` - Create recommendation

### Study Plans
- `GET /api/study-plans` - List study plans
- `POST /api/study-plans` - Create study plan

---

## Best Practices

✓ Take tests regularly (3-4 times per week)
✓ Review analytics after each test
✓ Focus on weak areas identified in recommendations
✓ Create a study plan aligned with your goals
✓ Enable email notifications to stay motivated
✓ Track progress by comparing historical data

❌ Don't skip analyzing test results
❌ Don't ignore low-scoring categories
❌ Don't rush through tests - practice time management
❌ Don't disable all notifications

---

## Troubleshooting

### Can't Login?
- Verify email and password are correct
- Check if account was created (try signing up)
- Ensure cookies are enabled in browser

### Missing Test Attempts?
- Tests appear in Analytics after submission
- Refresh page if data doesn't update
- Check if notifications are in pending status

### Email Notifications Not Received?
- Check spam/promotions folder
- Verify email is correct in account
- Ensure notifications are enabled in settings

### Performance Not Updating?
- Submit a test to generate data
- Wait for scheduler to process (runs hourly)
- Refresh browser to see latest data

---

## Contact & Support

For issues or questions:
1. Check the "Getting Started" guide
2. Review this Quick Reference
3. Verify all environment variables are set

---

## Tips for Maximum Results

1. **Consistency Matters**: Shorter, regular sessions > occasional long ones
2. **Analyze Mistakes**: Review failed questions to understand concepts
3. **Track Trends**: Use analytics to spot improvement patterns
4. **Focus Areas**: Prioritize high-impact weak areas
5. **Time Management**: Practice under real test conditions
6. **Plan Ahead**: Create realistic study milestones
