import { getErrorMessage } from './misc.tsx'

// 🐨 uncomment this to test it out:
// sendEmail({
// 	to: 'kody@kcd.dev',
// 	subject: 'Hello World',
// 	text: 'This is the plain text version',
// 	html: '<p>This is the HTML version</p>',
// })

export async function sendEmail(options: {
	to: string
	subject: string
	html?: string
	text: string
}) {
	const from = 'hello@epicstack.dev'

	const email = {
		from,
		...options,
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		body: JSON.stringify(email),
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()

	if (response.ok) {
		return { status: 'success' } as const
	} else {
		return {
			status: 'error',
			error: getErrorMessage(data),
		} as const
	}
}
