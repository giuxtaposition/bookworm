export interface User {
    id: string
    username: string
    name: string
    bio: string
    email: string
    favoriteGenre: string
    profilePhoto: {
        location: string
    }
    coverPhoto: {
        location: string
    }
}
