// App types. All in one place for the start, later should go to separate
// respective modules


export enum FieldPosition {
    Attacker,
    Midfielder,
    Defender,
    Keeper,
}


export enum FieldType {
    Indoor,
    Outdoor,
}


export enum GameType {
    Match,
    Pickup,
    Tournament,
    Other,
}


export enum Gender {
    Male,
    Female,
}


export enum PlayerRole {
    // Active players
    Captain = 3,
    Field = 2,
    Substitute = 1,

    // Inactive
    Inactive = 0,
    Invited = -1,
    RequestedToJoin = -2,
}


export enum PlayType {
    Competitive,
    Recreational,
}


export enum SkillLevel {
    Beginner,
    Casual,
    Amateur,
    Professional,
}


export enum TeamType {
    Coed,
    Female,
    Male,
}


export enum UserStatus {
    Going,
    NotSure,
    NotGoing,
}

/**
 * Personalized (your team, players on your team) game event.
 * @type {Object}
 */
export type GameEvent = {
    id: number;
    datetime: Date;
    duration?: number; // Minutes
    description?: string;
    eventType?: GameType;
    league?: League;
    location: Location;
    myStatus?: UserStatus;
    name?: string;
    players?: Player[];
    playersById?: { number: Player };
    playersCount?: PlayersCount;
    playersNeeded?: PlayersCount;
    team?: number;
    result?: Result;
    organizer?: any;
};


export type League = {
    age: number | [number, number];
    description: string;
    duration: number; // Weeks
    gameType: number; // Indoor Outdoor
    gender: number; // Coed Male Female
    location: Location;
    name: string;
    numberOfTeams: number;
    playersPerTeam: PlayersCount; // Minimum
    teams: Team[];
};


// Field
export type Location = {
    address?: string;
    fieldType?: FieldType;
    lat?: number;
    lng?: number;
    name?: string;  // Alias like "Field near the Don's house"
};


// Simple player model
export class Player {
    age?: number;
    firstName?: string;
    id: number;
    img?: string;
    lastName?: string;
    position?: FieldPosition | FieldPosition[];
    role: PlayerRole;
    roleId: number;

    /**
     * Transform API player represetation to use in the app:
     *
     * @param  {any}  data user data as it comes from the api
     */
    constructor(data: any) {

        return {
            age: data['age'],
            firstName: data['first_name'],
            id: data['id'],
            img: data['img'],
            lastName: data['last_name'],
            role: data['role'],
            roleId: data['role_id'],
        };

    }
};


export type PlayersCount = {
    male: number;
    female: number;
} | number;


// Detailed player model
export type Profile = {
    age?: number;
    availability?: any;
    coed?: boolean;
    contactInfo?: any;
    fieldType?: FieldType;
    gender?: Gender;
    img?: string;
    name: string;
    playType?: PlayType;
    position?: FieldPosition | FieldPosition[];
    role?: PlayerRole;
    skill?: SkillLevel;
    teams?: Team[];
};


export type Result = {
    winner: Team;
    score: string;
};


export class Team {
    id: number;
    info?: string;
    managers?: User[];
    name: string;
    players?: Player[];
    slotsFemale?: string;
    slotsMale?: string;
    type?: TeamType;

    /**
     * Transform API team represetation to use in the app:
     *     use mixedCase
     *     transform nested objects
     *
     * @param  {any}  data user data as it comes from the api
     */
    constructor(data: any) {

        let managers = [];
        if (data['managers'] != null) {
            managers = data['managers'].map(item => new User(item));
        }

        let players = [];
        if (data['players'] != null) {
            players = data['players'].map(item => new Player(item));
        }

        return {
            id: data['id'],
            info: data['info'],
            managers: managers,
            name: data['name'],
            players: players,
            slotsFemale: data['slots_female'],
            slotsMale: data['slots_male'],
            type: data['type'],
        };
    }
};


export class User {
    id?: number;
    firstName: string;
    lastName: string;
    bio?: string;
    birthday?: Date;
    cover?: string;
    email?: string;
    gender?: Gender;
    img?: string;
    phone?: string;

    /**
     * Transform API user represetation to use in the app:
     *     use mixedCase
     *     replace non existing cover and user images with defaults
     *
     * @param  {any}  data user data as it comes from the api
     */
    constructor(data: any) {
        this.id = data['id'];
        this.phone = data['phone'];
        this.bio = data['bio'];
        this.birthday = data['birthday'];
        this.email = data['email'];
        this.firstName = data['first_name'];
        this.lastName = data['last_name'];

        if (data['gender'] != null) {
            this.gender = data['gender'] === 'M' ?
                Gender.Male :
                Gender.Female;
        }

        let hash = data['id'] % 50;
        this.cover = data['cover'] == null ?
            `https://placekitten.com/${600 + hash}/${300 + hash}/` :
            data['cover'];
        this.img = data['img'] == null ?
            `https://placekitten.com/${150 + hash}/${150 + hash}/` :
            data['img'];
    }
};
