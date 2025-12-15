export enum owners {
    ZooVerviers = 1,
    ZooBrussels = 2,
    ZooAntwerp = 3,
    SafariLiege= 4
}

export const OwnerLabels: Record<owners, string> = {
  [owners.ZooVerviers]: 'Zoo de Verviers',
  [owners.ZooBrussels]: 'Zoo de Bruxelles',
  [owners.ZooAntwerp]: 'Zoo d’Anvers',
  [owners.SafariLiege]: 'Safari de Liège',
};