import * as postmark from 'postmark'

let client: postmark.ServerClient
if (process.env.POSTMARK_API_KEY) {
  client = new postmark.ServerClient(process.env.POSTMARK_API_KEY)
}

interface SendEmailArgs {
  subject: string
  content: string
  email: string
}

export const sendEmail = async ({ email, subject, content }: SendEmailArgs) =>
  client?.sendEmail({
    From: 'Codesign UI <noreply@codesign.chat>',
    To: email,
    Subject: subject,
    TextBody: content,
  })
