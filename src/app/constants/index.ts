export const workingHours = [
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
]

export const workingPeriodLabels = [
    'Manhã',
    'Tarde',
    'Noite',
] as const

type Period = (typeof workingPeriodLabels)[number]