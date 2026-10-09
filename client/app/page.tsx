"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./session-provider";
import { USERS } from "./chat-data";

export default function Home() {
    const router = useRouter();
    const { setUsername } = useSession();
    const [error, setError] = useState("");

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const fields = new FormData(event.currentTarget);

        const credential = USERS.find(
            ({ username, password }) =>
                username === fields.get("username") && password === fields.get("password"),
        );

        if (credential) {
            setError("");
            setUsername(credential.username);
            router.push("/chat");
            return;
        }

        setError("Nom d’utilisateur ou mot de passe incorrect.");
    }

    return (
        <main className="page">
            <section className="card" aria-labelledby="login-title">
                <h1 id="login-title">Connexion</h1>
                <p className="subtitle">Connectez-vous pour accéder au chat.</p>
                <form onSubmit={handleSubmit} onChange={() => setError("")}>
                    <label htmlFor="username">Nom d’utilisateur</label>
                    <input id="username" name="username" autoComplete="username" required />

                    <label htmlFor="password">Mot de passe</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required />

                    {error && <p className="error" role="alert">{error}</p>}
                    <button type="submit">Se connecter</button>
                </form>
            </section>
        </main>
    );
}
