import appConfig from "../../../src/shared/common/config";
import { formatUTC } from "../../../src/shared/utils/formatUTC";

import { ISendbirdService } from "../interface";

export class SendbirdService implements ISendbirdService {
  async getAllGroupChannels(): Promise<any> {
    const response = await fetch(
      `https://api-${appConfig.SENDBIRD.applicationId}.sendbird.com/v3/group_channels`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": appConfig.SENDBIRD.apiToken ?? "",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get group channels");
    }

    const data = await response.json();

    return data.channels.map((channel: any) => ({
      name: channel.name,
      channel_url: channel.channel_url,
      last_message: channel.last_message
        ? {
            created_at: formatUTC(channel.last_message.created_at),
            user: {
              user_id: channel.last_message.user.user_id,
              nickname: channel.last_message.user.nickname,
              role: channel.last_message.user.metadata?.role ?? null,
            },
            message: channel.last_message.message,
            unread_message_count: channel.unread_message_count,
          }
        : null,
    }));
  }

  async getMessagesFromGroupChannel(channelUrl: string): Promise<any> {
    const response = await fetch(
      `https://api-${appConfig.SENDBIRD.applicationId}.sendbird.com/v3/group_channels/${channelUrl}/messages?message_ts=${Date.now()}&prev_limit=200`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Api-Token": appConfig.SENDBIRD.apiToken ?? "",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to get messages");
    }

    const data = await response.json();

    return data.messages.map((message: any) => ({
      user: {
        user_id: message.user.user_id,
        nickname: message.user.nickname,
        role: message.user.metadata?.role ?? null,
      },
      message: message.message,
      created_at: formatUTC(message.created_at),
    }));
  }
}
