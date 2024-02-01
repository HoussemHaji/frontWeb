export class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    profilepic?: string;
    roles: string;
    constructor(
        id = '',
        firstname = '',
        lastname = '',
        email = '',
        password = '',
        profilepic = '',
        roles = ''
    ) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.profilepic = profilepic;
        this.roles = roles;
    }

}
