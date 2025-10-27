export interface Alert {
    severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined | null,
    message: string
}
