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


export enum RsvpStatus {
    Going = 2,
    NotSure = 1,
    NotGoing = 0,
    Invited = -1,
    AskedToJoin = -2,
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


/**
 * Game events. Certain date, certain place...
 */
export class GameEvent {
    id: number;
    datetime: Date;
    duration?: number; // Minutes
    description?: string;
    // eventType?: GameType;
    // league?: League;
    location: Location;
    name?: string;
    players?: Player[];
    playersById?: { [id: number]: Player };
    // playersCount?: PlayersCount;
    // playersNeeded?: PlayersCount;
    teams?: Team[];
    // result?: Result;
    organizer?: User;

    /**
     * Transform API team represetation to use in the app:
     *     use mixedCase
     *     transform nested objects
     *
     * @param  {any}  data user data as it comes from the api
     */
    constructor(data: any) {
        this.players = [];
        if (data['players'] != null) {
            this.players = data['players'].map(item => new Player(item));
        }

        this.teams = [];
        if (data['teams'] != null) {
            this.teams = data['teams'].map(item => new Team(item));
        }

        if (data['organizer'] != null) {
            this.organizer = new User(data['organizer']);
        }

        this.id = data['id'];
        this.description = data['description'];
        this.duration = data['duration'];
        this.datetime = new Date(data['datetime']);
        this.location = new Location(data['location']);

        this.playersById = {};

        for (let player of this.players) {
            this.playersById[player.id] = player;
            let team = this.teams[player.team];
            if (team == null) {
                continue;
            }

            if (team.playersInGame == null) {
                team.playersInGame = [];
            }

            if (player.status >= 0) {
                team.playersInGame.push(player);
            }
        }

    }
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
export class Location {
    id: number;
    address?: string;
    // fieldType?: FieldType;
    gis?: string;
    name?: string;  // Alias like "Field near the Don's house"

    constructor(data: any) {
        Object.assign(this, data);
    }
};


// Simple player model
export class Player {
    age?: number;
    firstName?: string;
    id: number;
    img?: string;
    lastName?: string;
    // position?: FieldPosition | FieldPosition[];
    role?: PlayerRole;
    roleId?: number;
    rsvp?: RsvpStatus;
    rsvpId?: number;
    status?: RsvpStatus;
    team?: number;

    /**
     * Transform API player represetation to use in the app:
     *
     * @param  {any}  data user data as it comes from the api
     */
    constructor(data: any) {
        this.age = data['age'];
        this.firstName = data['first_name'];
        this.id = data['id'];
        this.img = data['img'];
        this.lastName = data['last_name'];
        this.role = data['role'];
        this.roleId = data['role_id'];
        this.team = data['team'];

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
    playersInGame?: Player[];  // When team in a game
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

        this.managers = [];
        if (data['managers'] != null) {
            this.managers = data['managers'].map(item => new User(item));
        }

        this.players = [];
        if (data['players'] != null) {
            this.players = data['players'].map(item => new Player(item));
        }

        this.id = data['id'];
        this.info = data['info'];
        this.name = data['name'];
        this.slotsFemale = data['slots_female'];
        this.slotsMale = data['slots_male'];
        this.type = data['type'];
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
