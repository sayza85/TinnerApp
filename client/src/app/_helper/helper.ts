import { User } from "../_models/users"
const defaultAvatarblack = '/assets/defaultAvatarblack.png'
const defaultAvatarwhite = '/assets/defaultAvatarwhite.png'
function getAvatar(user: User): string {
    if (user.photos) {
        const avatar = user.photos.find(p => p.is_avatar)
        if (avatar) {
            return avatar.url
        }
    }
    return defaultAvatarblack
    
}
function getPhotoOftheday(user: User): string {
    if (user.photos && user.photos.length > 0) {
        const index = Math.floor(Math.random() * user.photos.length)
        return user.photos[index].url
    }
    return defaultAvatarwhite
}
export function parseUserPhotos(user: User): User {
    user.avatar = getAvatar(user)
    user.photoOfTheDay = getPhotoOftheday(user)
    return user
}

