export class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profilePic: string;
    place: string;
    bio: string;
    roles: string;
    constructor(
        id = '',
        firstname = '',
        lastname = '',
        email = '',
        password = '',
        profilepic = '',
        place = '',
        bio = '',
        roles = ''
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.profilePic = profilepic;
        this.place = place;
        this.bio = bio;
        this.roles = roles;
    }

}
