export default function isTokenExpired(token: string): boolean {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp;

        if(!exp) return true;

        return exp * 1000 < Date.now();
    } catch {
        return true;
    }
}