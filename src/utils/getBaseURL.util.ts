

export const getBaseURL = (env = 'APP_API'): string | undefined => {
    return import.meta.env['VITE_' + env]
}