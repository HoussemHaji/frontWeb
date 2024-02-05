export class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    profilePic: string;
    place: string;
    bio: string;
    constructor(
        id = '',
        firstname = '',
        lastname = '',
        email = '',
        password = '',
        profilepic = '',
        place = '',
        bio = ''
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.profilePic = profilepic;
        this.place = place;
        this.bio = bio;
    }

}
