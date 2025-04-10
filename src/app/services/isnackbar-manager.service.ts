/* interface base que garanto que o SnackbarManagerService use os metodos criados aqui */
export interface ISnackbarManagerService {
  show(message: string, action?: string, duration?: number): void
}
