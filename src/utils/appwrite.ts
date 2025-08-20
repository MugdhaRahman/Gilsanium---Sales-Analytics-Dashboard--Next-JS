// /utils/appwrite.ts
import { Client, Account, OAuthProvider } from "appwrite";

export const appwriteClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // e.g. https://fra.cloud.appwrite.io/v1
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(appwriteClient);

// Call from a click handler — NOT at module top-level
export function loginWithGithub() {
    return account.createOAuth2Session(
        OAuthProvider.Github,
        `${window.location.origin}/overview`, // success redirect
        `${window.location.origin}/`, // failure redirect (make a simple page)
        ["read:user", "repo"] // optional scopes
    );
}

export function logout() {
    return account.deleteSession("current");
}
