export type SceneId =
  | 'door'
  | 'countdown'
  | 'midnight'
  | 'lights'
  | 'cake'
  | 'wishes'
  | 'final';

export interface SceneProps {
  onNext: () => void;
}
