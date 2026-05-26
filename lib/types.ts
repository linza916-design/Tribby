export type MatchMode = "dating" | "friendship" | "networking" | "events";

export interface Profile {
  id: string;
  moniker: string;
  age: number;
  location: string;
  bio: string;
  compatibility: number; // e.g. 98%
  tags: string[];
  relationshipGoals: string;
  matchMode: MatchMode;
  imageUrl: string;
  currentMusicName?: string;
  currentMusicArtist?: string;
  mood: string;
  nearbyDistance: string; // e.g., "1.2 miles"
  favoriteHangouts: string[];
  isVerified: boolean;
  tribeCount: string;
  meetupsCount: number;
  isFakeCheckOk: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string; // "user" or partner profile's id
  text: string;
  timestamp: string; // e.g. "10:42 PM"
  read: boolean;
  isDisappearing?: boolean;
}

export interface ChatSession {
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  messages: ChatMessage[];
  lastActive: string; // "2m ago"
}

export interface MeetupItem {
  id: string;
  title: string;
  description: string;
  attendeesCount: number;
  attendeesPics: string[];
  vibe: string;
  distance: string;
  costLevel: "$" | "$$" | "$$$";
  safetyVerification: boolean; // biometric verified host
  music: string;
  category: string;
}

export interface TribeNode {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  activeNodesCount: string; // e.g., "4.2k"
  membersCount: string; // e.g., "1.8k"
  category: "Trending" | "Nearby" | "Digital Art" | "Techno" | "Philosophy";
  memberPics: string[];
}
