export interface Conversation {
  name: string | null;
  phoneNumber: number;
  dialCode: number;
  unReadCount: number;
  lastMessage: string;
  avatarColor?: string;
}
