export enum MessageType {
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export interface Message {
  value: string;
  type: string;
}
