import {jwtDecode} from "jwt-decode";

export function calculateMaxAge(token: string): number {
    try {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: any = jwtDecode(token);
        if (decodedToken && decodedToken.exp) {
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();

            const maxAge = Math.floor((expirationTime - currentTime) / 1000);
            return maxAge > 0 ? maxAge : 0;
        }
        return 0;
    } catch (error) {
        console.error("Invalid token or decoding failed:", error);
        return 0;
    }
}
