export async function sendSlackMessage(channelId, text) {
    console.log(channelId, text)
    const token = process.env.SLACK_BOT_TOKEN;

    try {
        const response = await fetch('https://slack.com/api/chat.postMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                channel: channelId,
                text: text,
            })
        });

        const data = await response.json();
        if (!data.ok) {
            console.error('Error sending slack message -->', data.error);
        }
        return data

    } catch (error) {
        console.error('Error sending slack message -->', error);

    }

}