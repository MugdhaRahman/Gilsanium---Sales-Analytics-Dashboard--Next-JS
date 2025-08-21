// /utils/appwrite.ts
import {Client, Account, OAuthProvider, Databases} from "appwrite";

export const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // e.g. https://fra.cloud.appwrite.io/v1
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const database = new Databases(client);

// Call from a click handler — NOT at module top-level
export function loginWithGithub() {
    return account.createOAuth2Session(
        OAuthProvider.Github,
        `${window.location.origin}/overview`, // success redirect
        `${window.location.origin}/`, // failure redirect (make a simple page)
        ["read:user", "repo"] // optional scopes
    );
}

export async function logoutAndRedirect() {
    try {
        await account.deleteSession("current"); // end the session
        window.location.href = `${window.location.origin}/`; // go to root
    } catch (err) {
        console.error("Logout failed:", err);
    }

}
