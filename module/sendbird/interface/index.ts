export interface ISendbirdService {
  getAllGroupChannels(): Promise<any>;
  getMessagesFromGroupChannel(channelUrl: string): Promise<any>;
}
