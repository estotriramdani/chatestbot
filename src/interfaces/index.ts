export interface RAPI {
  status: string;
  message: string;
  data?: any;
  error?: any;
}

export interface RAPILimitChat {
  status: string;
  message: string;
  data: {
    date: string;
    limit: number;
    sentChats: number;
  };
}

export interface IConversation {
	_id: string;
	title: string;
	email: string;
	chats: any[];
}

export interface RAPIConversations {
	status: string;
	message: string;
	data: IConversation[];
}