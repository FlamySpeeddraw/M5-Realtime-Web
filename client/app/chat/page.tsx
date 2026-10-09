"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../session-provider";
import { USERS, ROOMS, canEnterRoom, type RoomId } from "../chat-data";

export default function ChatPage() {
    const router = useRouter();
    const { username, setUsername } = useSession();
    const [selectedRoomId, setSelectedRoomId] = useState<RoomId>("general");
    const currentUser = USERS.find((user) => user.username === username);

    useEffect(() => {
        if (!currentUser) {
            router.replace("/");
        }
    }, [currentUser, router]);

    if (!currentUser) {
        return null;
    }

    const visibleRooms = ROOMS.filter((room) => canEnterRoom(currentUser, room.id));
    const selectedRoom = visibleRooms.find((room) => room.id === selectedRoomId) ?? visibleRooms[0];
    const sortedUsers = USERS.map((user) => ({
        ...user,
        online: user.username === username || user.online,
    })).sort((a, b) => Number(b.online) - Number(a.online) || a.username.localeCompare(b.username, "fr"));

    return (
        <div className="chat-page">
            <header className="chat-header">
                <p>Connecté en tant que <strong>{username}</strong></p>
                <button type="button" onClick={() => {
                    setUsername(null);
                    router.replace("/");
                }}>
                    Se déconnecter
                </button>
            </header>
            <div className="chat-body">
                <aside className="chat-sidebar" aria-label="Menu du chat">
                    <section aria-labelledby="users-title">
                        <h2 id="users-title">Utilisateurs</h2>
                        <ul className="user-list">
                            {sortedUsers.map((user) => (
                                <li key={user.username}>
                                    <span className={`status-dot ${user.online ? "online" : "offline"}`} aria-hidden="true" />
                                    <span>{user.username}{user.username === username ? " (vous)" : ""}</span>
                                    <span className="sr-only">{user.online ? "En ligne" : "Hors ligne"}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <nav aria-labelledby="rooms-title">
                        <h2 id="rooms-title">Salons</h2>
                        <ul className="room-list">
                            {visibleRooms.map((room) => (
                                <li key={room.id}>
                                    <button
                                        type="button"
                                        className="room-button"
                                        aria-current={selectedRoom?.id === room.id ? "true" : undefined}
                                        onClick={() => {
                                            if (canEnterRoom(currentUser, room.id)) {
                                                setSelectedRoomId(room.id);
                                            }
                                        }}
                                    >
                                        # {room.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className="chat-content">
                    <h1>{selectedRoom ? `# ${selectedRoom.name}` : "Aucun salon accessible"}</h1>
                    {selectedRoom && <p className="subtitle">Bienvenue dans le salon {selectedRoom.name}.</p>}
                </main>
            </div>
        </div>
    );
}
