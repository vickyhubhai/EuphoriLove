export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    const webhookUrl = 'https://discord.com/api/webhooks/1359184454769315840/xI7oT4QDv8Ajpd5JDf2nvK0An_H_9MTalwUfdvAxSVEhj4t1aEO570lAcyQQ7ggRxVbM';

    const embedData = {
      embeds: [
        {
          title: `📬 New Contact Message: ${subject}`,
          color: 0x3b82f6, // Blue color
          fields: [
            {
              name: '👤 Name',
              value: name,
              inline: true
            },
            {
              name: '📧 Email',
              value: email,
              inline: true
            },
            {
              name: '📝 Subject',
              value: subject,
              inline: false
            },
            {
              name: '💬 Message',
              value: message
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: 'EuphoriLove Contact Form'
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embedData),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Discord');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending message to Discord:', error);
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 