export enum ToyStatus {
    Pending = 0,
    Completed = 1,
    FailedToComplete = 2,
    Cancelled = 3,
    Paused = 4,
}

export const ToyStatusLabel: Record<ToyStatus, string> = {
  [ToyStatus.Pending]: 'En cours',
  [ToyStatus.Completed]: 'Succès',
  [ToyStatus.FailedToComplete]: 'Abandonné : objectif non atteint',
  [ToyStatus.Cancelled]: 'Annulé',
  [ToyStatus.Paused]: 'Mis en pause'
};