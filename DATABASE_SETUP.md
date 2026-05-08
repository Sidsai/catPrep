# CAT Prep Tracker - Database Setup

## Overview
The Neon PostgreSQL database has been successfully configured with a complete schema for the CAT Prep Tracker application.

## Database Schema

### Tables Created

#### 1. **users** (Authentication & User Management)
- `id` - Primary key
- `email` - Unique email address
- `password_hash` - Bcrypt-hashed password
- `full_name` - User's full name
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

#### 2. **practice_tests** (Test Management)
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Test title
- `description` - Test description
- `total_questions` - Default: 100
- `time_limit_minutes` - Default: 180
- `difficulty_level` - Test difficulty (Easy/Medium/Hard)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### 3. **test_attempts** (Test Tracking)
- `id` - Primary key
- `user_id` - Foreign key to users
- `practice_test_id` - Foreign key to practice_tests
- `score` - Numerical score
- `accuracy_percentage` - Percentage accuracy
- `time_spent_minutes` - Time taken to complete test
- `completed_at` - Completion timestamp
- `created_at` - Creation timestamp

#### 4. **question_performance** (Question-level Analytics)
- `id` - Primary key
- `user_id` - Foreign key to users
- `test_attempt_id` - Foreign key to test_attempts
- `question_id` - Question identifier
- `category` - Question category
- `difficulty` - Question difficulty level
- `is_correct` - Boolean: whether answered correctly
- `time_spent_seconds` - Time spent on this question
- `created_at` - Creation timestamp

#### 5. **study_plans** (Study Planning)
- `id` - Primary key
- `user_id` - Foreign key to users
- `title` - Plan title
- `focus_areas` - Areas to focus on (TEXT)
- `start_date` - Plan start date
- `end_date` - Plan end date
- `status` - Plan status (active/completed/paused)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### 6. **user_preferences** (User Settings)
- `id` - Primary key
- `user_id` - Foreign key to users (unique)
- `daily_reminder_enabled` - Default: true
- `weekly_report_enabled` - Default: true
- `monthly_analysis_enabled` - Default: true
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

#### 7. **notifications** (Notification System)
- `id` - Primary key
- `user_id` - Foreign key to users
- `type` - Notification type
- `subject` - Notification subject
- `body` - Notification content
- `status` - Status (sent/pending/failed)
- `sent_at` - Timestamp when sent
- `created_at` - Creation timestamp

#### 8. **adaptive_recommendations** (Personalized Recommendations)
- `id` - Primary key
- `user_id` - Foreign key to users
- `category` - Category of recommendation
- `recommendation_type` - Type of recommendation
- `description` - Detailed description
- `priority` - Priority level (1-10)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Indexes Created
- `idx_practice_tests_user_id`
- `idx_test_attempts_user_id`
- `idx_test_attempts_practice_test_id`
- `idx_question_performance_user_id`
- `idx_question_performance_test_attempt_id`
- `idx_study_plans_user_id`
- `idx_adaptive_recommendations_user_id`
- `idx_notifications_user_id`

## Backend API Routes

### Authentication Endpoints
- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/logout` - User logout
- **GET** `/api/auth/me` - Get current user info

### Practice Tests Endpoints
- **GET** `/api/practice-tests` - Get user's practice tests
- **POST** `/api/practice-tests` - Create new practice test

### Test Attempts Endpoints
- **POST** `/api/test-attempts` - Submit test attempt with performance data

### Analytics Endpoints
- **GET** `/api/analytics/performance` - Get performance analytics and stats

### Study Plans Endpoints
- **GET** `/api/study-plans` - Get user's study plans
- **POST** `/api/study-plans` - Create new study plan

### Recommendations Endpoints
- **GET** `/api/recommendations` - Get adaptive recommendations
- **POST** `/api/recommendations` - Create recommendation

## Environment Variables Required
- `DATABASE_URL` - Neon PostgreSQL connection string (automatically provided by Neon integration)

## Session Management
- **Cookie Name**: `user_id`
- **Cookie Duration**: 7 days
- **Cookie Security**: 
  - HttpOnly: true
  - Secure: true (production)
  - SameSite: strict/lax

## Database Connection
- **Client Library**: `@neondatabase/serverless`
- **Connection**: Configured in `/lib/db.ts`
- **Parameterized Queries**: All queries use parameterized statements to prevent SQL injection

## Relationships & Constraints
- All foreign keys cascade on delete
- User data is properly isolated (each user sees only their own data)
- Indexes optimize common query patterns

## Next Steps
1. The database schema is ready to use
2. All API endpoints are connected to the database
3. Authentication flow is set up with secure password hashing
4. Deploy to production and start using the platform
