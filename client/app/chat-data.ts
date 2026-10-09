export type Role = "admin" | "member" | "guest";
export type RoomId = "general" | "tech" | "random" | "staff";

type ChatUser = {
    username: string;
    password: string;
    role: Role;
    online: boolean;
};

export const USERS: ChatUser[] = [
    { username: "Matteo", password: "pass", role: "member", online: false },
    { username: "Sacha", password: "pass", role: "admin", online: false },
    { username: "Gladys", password: "pass", role: "guest", online: false },
];

export const ROOMS: { id: RoomId; name: string }[] = [
    { id: "general", name: "general" },
    { id: "tech", name: "tech" },
    { id: "random", name: "random" },
    { id: "staff", name: "staff" },
];

export const ROLE_PERMISSIONS: Record<Role, readonly RoomId[]> = {
    admin: ["general", "tech", "random", "staff"],
    member: ["general", "tech", "random"],
    guest: ["general", "random"],
};

export function canEnterRoom(user: ChatUser, roomId: RoomId) {
    return ROLE_PERMISSIONS[user.role].includes(roomId);
}
