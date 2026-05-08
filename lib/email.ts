import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

function getTransporter() {
  if (!transporter) {
    // Using Gmail SMTP
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }
  return transporter
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
) {
  try {
    const mail = getTransporter()

    const result = await mail.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text: text || subject,
      html,
    })

    return {
      success: true,
      messageId: result.messageId,
    }
  } catch (error) {
    console.error('[v0] Email sending error:', error)
    throw error
  }
}

export async function sendDailyReminder(email: string, fullName: string) {
  const subject = 'Daily CAT Prep Reminder'
  const html = `
    <h2>Hello ${fullName}!</h2>
    <p>It's time for your daily CAT preparation session.</p>
    <p>Stay consistent with your practice to improve your scores.</p>
    <p>Log in to your tracker and take a practice test today!</p>
  `

  return sendEmail(email, subject, html)
}

export async function sendWeeklyReport(
  email: string,
  fullName: string,
  stats: any
) {
  const subject = 'Your Weekly CAT Prep Report'
  const html = `
    <h2>Weekly Report for ${fullName}</h2>
    <p>Here's a summary of your preparation this week:</p>
    <ul>
      <li>Tests Taken: ${stats.tests_taken}</li>
      <li>Average Score: ${stats.average_score?.toFixed(2) || 'N/A'}</li>
      <li>Average Accuracy: ${stats.average_accuracy?.toFixed(2) || 'N/A'}%</li>
      <li>Total Study Time: ${stats.total_time_minutes} minutes</li>
    </ul>
    <p>Keep up the great work!</p>
  `

  return sendEmail(email, subject, html)
}

export async function sendMonthlyAnalysis(
  email: string,
  fullName: string,
  analysis: any
) {
  const subject = 'Your Monthly CAT Prep Analysis'
  const html = `
    <h2>Monthly Analysis for ${fullName}</h2>
    <p>Here's your detailed monthly analysis:</p>
    <ul>
      <li>Total Tests: ${analysis.total_tests}</li>
      <li>Best Score: ${analysis.best_score}</li>
      <li>Average Score: ${analysis.average_score?.toFixed(2) || 'N/A'}</li>
      <li>Improvement: ${analysis.improvement?.toFixed(2) || '0'}%</li>
      <li>Strongest Area: ${analysis.strongest_area}</li>
      <li>Needs Improvement: ${analysis.weakest_area}</li>
    </ul>
  `

  return sendEmail(email, subject, html)
}
