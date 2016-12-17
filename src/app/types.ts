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
    Coach,
    Captain,
    Field,
    Substitute,
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
export type Player = {
    img?: string;
    gender: Gender;
    role: PlayerRole;
    position: FieldPosition | FieldPosition[];
    age: number;
    name: string;
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


export type Team = {
    name: string;
    img: string;
    players: Player[];
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
     * Transform API user represetation API to use in the app:
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
