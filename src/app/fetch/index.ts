import { Schedule } from "../agenda"

interface GetScheduleParams{
    date: string
    time: string
    client: string
    username: string
}

export async function getSchedules(body: GetScheduleParams) {
    const response = await fetch('/system/makeSchedule', {
        method: 'POST',
        // body: JSON.stringify({ ...data, username: usernameCookie }),
        body: JSON.stringify(body),
    })

    const { newSchedule }: { newSchedule: Schedule } = await response.json()

    return { newSchedule }
}