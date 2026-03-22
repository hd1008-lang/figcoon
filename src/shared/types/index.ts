export interface IFeatureAction  {
    getData: () => void
}
export type TFeatureAction = IFeatureAction | null;