export interface FriendProps {
 
    userId?: string
}

export const enum FriendType {
    
    Search = "search",

    Friend = "friend",

    Send = "send",

    Receive = "receive",
}