export interface RAPI {
  status: string;
  message: string;
  data?: any;
  error?: any;
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