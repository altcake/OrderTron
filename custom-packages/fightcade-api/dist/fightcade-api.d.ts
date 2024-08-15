import { z } from 'zod';

declare namespace Fightcade {
    const RankEnumSchema: z.ZodNativeEnum<{
        readonly Unranked: 0;
        readonly E: 1;
        readonly D: 2;
        readonly C: 3;
        readonly B: 4;
        readonly A: 5;
        readonly S: 6;
    }>;
    export type RankEnum = z.infer<typeof RankEnumSchema>;
    /**
     * Fightcade GameInfo
     *
     * @param gameid - Object Keys are Fightcade Game ROM Name
     * @param rank - Fightcade Game Rank
     * @param num_matches - Amount of Ranked Games Played
     * @param last_match - Last Match Played Millisecond Epoch Date Timestamp
     * @param time_played - Time Played in Milliseconds.
     *
     * @example
     * ```js
     * // Print the amount of ranked matches per game for the user 'biggs'.
     * const user = await Fightcade.GetUser('biggs');
     * Object.entries(user.gameinfo).forEach(([gameid, gameinfo]) => {
     *   if (gameinfo.rank) console.log(`${gameid}: ${gameinfo.num_matches}`);
     * });
     * ```
     */
    export type GameInfo = {
        [gameid: string]: {
            rank?: RankEnum | null;
            num_matches?: number;
            last_match?: number;
            time_played: number;
        };
    };
    const UserSchema: z.ZodObject<{
        name: z.ZodString;
        gravatar: z.ZodOptional<z.ZodString>;
        ranked: z.ZodBoolean;
        last_online: z.ZodOptional<z.ZodNumber>;
        date: z.ZodNumber;
        gameinfo: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            rank: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
                readonly Unranked: 0;
                readonly E: 1;
                readonly D: 2;
                readonly C: 3;
                readonly B: 4;
                readonly A: 5;
                readonly S: 6;
            }>>>;
            num_matches: z.ZodOptional<z.ZodNumber>;
            last_match: z.ZodOptional<z.ZodNumber>;
            time_played: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        date: number;
        name: string;
        ranked: boolean;
        gravatar?: string | undefined;
        last_online?: number | undefined;
        gameinfo?: Record<string, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }> | undefined;
    }, {
        date: number;
        name: string;
        ranked: boolean;
        gravatar?: string | undefined;
        last_online?: number | undefined;
        gameinfo?: Record<string, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }> | undefined;
    }>;
    /**
     * Fightcade User
     *
     * @param name - Fightcade Username
     * @param gravatar - Gravatar URL
     * @param ranked - Ranked Player?
     * @param last_online - Last Logout Millisecond Epoch Date Timestamp
     * @param date - Account Creation Millisecond Epoch Date Timestamp
     * @param gameinfo - Fightcade GameInfo
     *
     * @example
     * ```js
     * // Print the account creation date for the user 'biggs'.
     * const user = await Fightcade.GetUser('biggs');
     * const date = new Date(user.date);
     * console.log(date.toString());
     * ```
     */
    export type User = z.infer<typeof UserSchema>;
    const CountrySchema: z.ZodObject<{
        iso_code: z.ZodString;
        full_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        iso_code: string;
        full_name: string;
    }, {
        iso_code: string;
        full_name: string;
    }>;
    /**
     * Fightcade Country
     *
     * @param iso_code - `ISO 3166-1 alpha2` Country Code
     * @param full_name - Country Name
     *
     * @example
     * ```js
     * // Print the player names and countries from the replay '1638725293444-1085'.
     * const replay = await Fightcade.GetReplay('1638725293444-1085');
     * replay.players.forEach(player => console.log(`${player.name}: ${(typeof player.country === 'string') ? player.country : player.country.full_name}`));
     * ```
     */
    export type Country = z.infer<typeof CountrySchema>;
    const PlayerSchema: z.ZodObject<{
        name: z.ZodString;
        country: z.ZodUnion<[z.ZodObject<{
            iso_code: z.ZodString;
            full_name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            iso_code: string;
            full_name: string;
        }, {
            iso_code: string;
            full_name: string;
        }>, z.ZodString]>;
        rank: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
            readonly Unranked: 0;
            readonly E: 1;
            readonly D: 2;
            readonly C: 3;
            readonly B: 4;
            readonly A: 5;
            readonly S: 6;
        }>>>;
        score: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        gameinfo: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            rank: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
                readonly Unranked: 0;
                readonly E: 1;
                readonly D: 2;
                readonly C: 3;
                readonly B: 4;
                readonly A: 5;
                readonly S: 6;
            }>>>;
            num_matches: z.ZodOptional<z.ZodNumber>;
            last_match: z.ZodOptional<z.ZodNumber>;
            time_played: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        country: (string | {
            iso_code: string;
            full_name: string;
        }) & (string | {
            iso_code: string;
            full_name: string;
        } | undefined);
        rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
        score?: number | null | undefined;
        gameinfo?: Record<string, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }> | undefined;
    }, {
        name: string;
        country: (string | {
            iso_code: string;
            full_name: string;
        }) & (string | {
            iso_code: string;
            full_name: string;
        } | undefined);
        rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
        score?: number | null | undefined;
        gameinfo?: Record<string, {
            time_played: number;
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            num_matches?: number | undefined;
            last_match?: number | undefined;
        }> | undefined;
    }>;
    /**
     * Fightcade Player
     *
     * @param name - Fightcade Username
     * @param country - Country Name or Fightcade Country Object
     * @param rank - User Game Rank
     * @param score - Match Score
     * @param gameinfo - GameInfo Object
     *
     * @example
     * ```js
     * // Print the player names from the replay '1638725293444-1085'.
     * const replay = await Fightcade.GetReplay('1638725293444-1085');
     * replay.players.forEach(player => console.log(player.name));
     * ```
     */
    export type Player = z.infer<typeof PlayerSchema>;
    const ReplaySchema: z.ZodObject<{
        quarkid: z.ZodString;
        channelname: z.ZodString;
        date: z.ZodNumber;
        duration: z.ZodNumber;
        emulator: z.ZodString;
        gameid: z.ZodString;
        num_matches: z.ZodOptional<z.ZodNumber>;
        players: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            country: z.ZodUnion<[z.ZodObject<{
                iso_code: z.ZodString;
                full_name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                iso_code: string;
                full_name: string;
            }, {
                iso_code: string;
                full_name: string;
            }>, z.ZodString]>;
            rank: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
                readonly Unranked: 0;
                readonly E: 1;
                readonly D: 2;
                readonly C: 3;
                readonly B: 4;
                readonly A: 5;
                readonly S: 6;
            }>>>;
            score: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            gameinfo: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                rank: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<{
                    readonly Unranked: 0;
                    readonly E: 1;
                    readonly D: 2;
                    readonly C: 3;
                    readonly B: 4;
                    readonly A: 5;
                    readonly S: 6;
                }>>>;
                num_matches: z.ZodOptional<z.ZodNumber>;
                last_match: z.ZodOptional<z.ZodNumber>;
                time_played: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                time_played: number;
                rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
                num_matches?: number | undefined;
                last_match?: number | undefined;
            }, {
                time_played: number;
                rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
                num_matches?: number | undefined;
                last_match?: number | undefined;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            country: (string | {
                iso_code: string;
                full_name: string;
            }) & (string | {
                iso_code: string;
                full_name: string;
            } | undefined);
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            score?: number | null | undefined;
            gameinfo?: Record<string, {
                time_played: number;
                rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
                num_matches?: number | undefined;
                last_match?: number | undefined;
            }> | undefined;
        }, {
            name: string;
            country: (string | {
                iso_code: string;
                full_name: string;
            }) & (string | {
                iso_code: string;
                full_name: string;
            } | undefined);
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            score?: number | null | undefined;
            gameinfo?: Record<string, {
                time_played: number;
                rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
                num_matches?: number | undefined;
                last_match?: number | undefined;
            }> | undefined;
        }>, "many">;
        ranked: z.ZodNullable<z.ZodUnion<[z.ZodNumber, z.ZodLiteral<"cancelled">]>>;
        replay_file: z.ZodOptional<z.ZodString>;
        realtime_views: z.ZodOptional<z.ZodNumber>;
        saved_views: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        date: number;
        ranked: number | "cancelled" | null;
        quarkid: string;
        channelname: string;
        duration: number;
        emulator: string;
        gameid: string;
        players: {
            name: string;
            country: (string | {
                iso_code: string;
                full_name: string;
            }) & (string | {
                iso_code: string;
                full_name: string;
            } | undefined);
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            score?: number | null | undefined;
            gameinfo?: Record<string, {
                time_played: number;
                rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
                num_matches?: number | undefined;
                last_match?: number | undefined;
            }> | undefined;
        }[];
        num_matches?: number | undefined;
        replay_file?: string | undefined;
        realtime_views?: number | undefined;
        saved_views?: number | undefined;
    }, {
        date: number;
        ranked: number | "cancelled" | null;
        quarkid: string;
        channelname: string;
        duration: number;
        emulator: string;
        gameid: string;
        players: {
            name: string;
            country: (string | {
                iso_code: string;
                full_name: string;
            }) & (string | {
                iso_code: string;
                full_name: string;
            } | undefined);
            rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
            score?: number | null | undefined;
            gameinfo?: Record<string, {
                time_played: number;
                rank?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | null | undefined;
                num_matches?: number | undefined;
                last_match?: number | undefined;
            }> | undefined;
        }[];
        num_matches?: number | undefined;
        replay_file?: string | undefined;
        realtime_views?: number | undefined;
        saved_views?: number | undefined;
    }>;
    /**
     * Fightcade Replay
     *
     * @param quarkid - Fightcade Challenge ID
     * @param channelname - Fightcade Game Channel Name
     * @param date - Replay Millisecond Epoch Date Timestamp
     * @param duration - Replay Duration in Seconds
     * @param emulator - Emulator Name
     * @param gameid - Fightcade ROM Name
     * @param num_matches - Replay Match Amount
     * @param players - Replay Player List
     * @param ranked - Ranked FT# Set or 'cancelled'
     * @param replay_file - Replay Filename
     * @param realtime_views - Total Amount of Live Spectators
     * @param saved_views - Amount of Replay Views
     *
     * @example
     * ```js
     * // Print the date of the replay '1638725293444-1085'.
     * const replay = await Fightcade.GetReplay('1638725293444-1085');
     * const date = new Date(replay.date);
     * console.log(date.toString());
     * ```
     */
    export type Replay = z.infer<typeof ReplaySchema>;
    /**
     * FightcadeVids URLs
     *
     * @param quarkid - Object Keys are Fightcade Challenge IDs
     * @param quarkid - Object Values are FightcadeVids URLs
     *
     * @example
     * ```js
     * // Print the FightcadeVids URLs of the provided Challenge IDs if there are any.
     * const quarkids = ['1638725293444-1085', '1631056456752-7358', '1650423155905-2091'];
     * const urls = await Fightcade.GetVideoURLs(quarkids);
     * Object.values(urls).forEach(url => console.log(url));
     * ```
     */
    export type VideoURLs = {
        [quarkid: string]: string;
    };
    const GameSchema: z.ZodObject<{
        gameid: z.ZodString;
        romof: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        year: z.ZodOptional<z.ZodString>;
        publisher: z.ZodOptional<z.ZodString>;
        emulator: z.ZodString;
        available_for: z.ZodNumber;
        system: z.ZodString;
        ranked: z.ZodBoolean;
        training: z.ZodOptional<z.ZodBoolean>;
        genres: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        ranked: boolean;
        emulator: string;
        gameid: string;
        available_for: number;
        system: string;
        romof?: string | undefined;
        year?: string | undefined;
        publisher?: string | undefined;
        training?: boolean | undefined;
        genres?: string[] | undefined;
    }, {
        name: string;
        ranked: boolean;
        emulator: string;
        gameid: string;
        available_for: number;
        system: string;
        romof?: string | undefined;
        year?: string | undefined;
        publisher?: string | undefined;
        training?: boolean | undefined;
        genres?: string[] | undefined;
    }>;
    /**
     * Fightcade Game
     *
     * @param gameid - Fightcade Game ROM Name
     * @param romof - ???
     * @param name - Fightcade Game Channel Name
     * @param year - String Representation of Game's Release Year
     * @param publisher - Game Publisher
     * @param emulator - Game Emulator
     * @param available_for - ???
     * @param system - Fightcade System Name
     * @param ranked - Ranked Matchmaking Available
     * @param training - Training Mode Available
     * @param genres - Game Genre Tag List
     *
     * @example
     * ```js
     * // Prints the publisher of the game 'umk3'.
     * const game = await Fightcade.GetGame('umk3');
     * console.log(game.publisher);
     * ```
     */
    export type Game = z.infer<typeof GameSchema>;
    const EventSchema: z.ZodObject<{
        name: z.ZodString;
        author: z.ZodString;
        date: z.ZodNumber;
        gameid: z.ZodString;
        link: z.ZodString;
        region: z.ZodString;
        stream: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        date: number;
        name: string;
        gameid: string;
        author: string;
        link: string;
        region: string;
        stream?: string | undefined;
    }, {
        date: number;
        name: string;
        gameid: string;
        author: string;
        link: string;
        region: string;
        stream?: string | undefined;
    }>;
    /**
     * Fightcade Event
     *
     * @param name - Event Name
     * @param author - Event Author's Fightcade Username
     * @param date - Event Millisecond Epoch Date Timestamp
     * @param gameid - Fightcade Game ROM Name
     * @param link - Event URL
     * @param region - Event Region
     * @param stream - Event Livestream URL
     *
     * @example
     * ```js
     * // Print the 15 most recent active event names for 'garou'.
     * const events = await Fightcade.GetEvents('garou');
     * events.forEach(event => console.log(event.name));
     * ```
     */
    export type Event = z.infer<typeof EventSchema>;
    /**
     * Fightcade Rank
     *
     * @example
     * ```js
     * // Print the top 15 ranked UMK3 players and their ranks
     * const gameid = 'umk3';
     * const rankings = await Fightcade.GetRankings(gameid);
     * rankings.forEach(player => {
     *  if (player.gameinfo && player.gameinfo[gameid].rank) {
     *    console.log(`${Fightcade.Rank[player.gameinfo[gameid].rank]}: ${player.name}`);
     * }});
     * ```
     */
    export const Rank: readonly ["Unranked", "E", "D", "C", "B", "A", "S"];
    /**
     * Get Fightcade User Info by Username
     *
     * @param username - Fightcade Username
     *
     * @example
     * ```js
     * // Print the amount of ranked matches per game for the user 'biggs'.
     * const user = await Fightcade.GetUser('biggs');
     * Object.entries(user.gameinfo).forEach(([gameid, gameinfo]) => {
     *   if (gameinfo.rank) console.log(`${gameid}: ${gameinfo.num_matches}`);
     * });
     * ```
     */
    export function GetUser(username: string): Promise<Fightcade.User>;
    /**
     * Get Fightcade Replay by Challenge ID
     *
     * @param quarkid - Fightcade Challenge ID
     *
     * @exmaple
     * ```js
     * // Print the date of the replay '1638725293444-1085'
     * const replay = await Fightcade.GetReplay('1638725293444-1085');
     * const date = new Date(replay.date);
     * console.log(date.toString());
     * ```
     */
    export function GetReplay(quarkid: string): Promise<Fightcade.Replay>;
    /**
     * Get Newest Fightcade Replays
     *
     * @example
     * ```js
     * // Print the game channel names of the 15 most recent replays.
     * const replays = await Fightcade.GetReplays();
     * replays.forEach(replay => console.log(replay.channelname));
     * ```
     */
    export function GetReplays(): Promise<Fightcade.Replay[]>;
    /**
     * Get Fightcade Replays
     *
     * @param args.gameid - `default: undefined` Fightcade ROM Name
     * @param args.limit - `default: 15` Amount of Replays to request beginning from `offset`
     * @param args.offset - `default: 0` Newest Replay number to request
     * @param args.best - `default: false` Sort Replays by Fightcade Player Elo
     * @param args.since - `default: 0` Millisecond Epoch Timestamp Date
     * @param args.ranked - `default: false` Request only Ranked Replays
     *
     * @example
     * ```js
     * // Print the game channel names of the 5 best most recent ranked replays since '2022-07-17T04:30:10.798Z'.
     * const date = new Date('2022-07-17T04:30:10.798Z');
     * const replays = await Fightcade.GetReplays({limit: 5, best: true, since: date.getTime(), ranked: true});
     * replays.forEach(replay => console.log(replay.channelname));
     * ```
     */
    export function GetReplays(args: {
        gameid?: string;
        limit?: number;
        offset?: number;
        best?: boolean;
        since?: number;
        ranked?: boolean;
    }): Promise<Fightcade.Replay[]>;
    /**
     * Get Fightcade User's Newest Replays
     *
     * @param username - Fightcade Username
     *
     * @example
     * ```js
     * // Print the game channel names of the 15 most recent replays belonging to the user 'biggs'.
     * const replays = await Fightcade.GetUserReplays('biggs');
     * replays.forEach(replay => console.log(replay.channelname));
     * ```
     */
    export function GetUserReplays(username: string): Promise<Fightcade.Replay[]>;
    /**
     * Get Fightcade User's Newest Replays
     *
     * @param username - Fightcade Username
     * @param args.limit - `default: 15` Amount of Replays to request beginning from `offset`
     * @param args.offset - `default: 0` Newest Replay number to request
     * @param args.best - `default: false` Sort Replays by Fightcade Player Elo
     * @param args.since - `default: 0` Millisecond Epoch Timestamp Date
     * @param args.ranked - `default: false` Request only Ranked Replays
     *
     * @example
     * ```js
     * // Print the game channel names of the 30 best most recent ranked replays for the user 'biggs' since '2022-07-17T04:30:10.798Z'.
     * const date = new Date('2022-07-17T04:30:10.798Z');
     * const replays = await Fightcade.GetUserReplays('biggs', {limit: 30, best: true, since: date.getTime(), ranked: true});
     * replays.forEach(replay => console.log(replay.channelname));
     * ```
     */
    export function GetUserReplays(username: string, args: {
        limit?: number;
        offset?: number;
        best?: boolean;
        since?: number;
        ranked?: boolean;
    }): Promise<Fightcade.Replay[]>;
    /**
     * Get Fightcade Replay URL
     *
     * @example
     * ```js
     * // Print the replay URLs of the 15 most recent replays belonging to the user 'biggs'.
     * const user_replays = await Fightcade.GetUserReplays('biggs');
     * user_replays.forEach(replay => console.log(Fightcade.GetReplayURL(replay)));
     * ```
     */
    export const GetReplayURL: (replay: Fightcade.Replay) => string;
    /**
     * @deprecated `GetVideoURL()` is deprecated because `https://fightcadevids.com` is currently abandoned.
     *
     * Get FightcadeVids URL of Fightcade Replay if it exists
     *
     * @param replay Fightcade Challenge ID
     *
     * @example
     * ```js
     * // Print the Replay's FightcadeVids URL.
     * const replay = await Fightcade.GetReplay('1638725293444-1085');
     * const url = await Fightcade.GetVideoURL(replay);
     * console.log(url ?? 'Replay not found.');
     * ```
     */
    export function GetVideoURL(replay: string): Promise<string>;
    /**
     * @deprecated `GetVideoURL()` is deprecated because `https://fightcadevids.com` is currently abandoned.
     *
     * Get FightcadeVids URL of Fightcade Replay if it exists
     *
     * @param replay Fightcade Replay Object
     *
     * @example
     * ```js
     * // Print the FightcadeVids URL by Challenge ID.
     * const url = await Fightcade.GetVideoURL('1638725293444-1085');
     * console.log(url ?? 'Replay not found.');
     * ```
     */
    export function GetVideoURL(replay: Fightcade.Replay): Promise<string>;
    /**
     * @deprecated `GetVideoURLs()` is deprecated because `https://fightcadevids.com` is currently abandoned.
     *
     * Get a list of FightcadeVids URLs from a list of Fightcade Replays if they exist
     *
     * @param replays Fightcade Challenge IDs
     * @returns Empty array if there are no valid URLs
     *
     * @example
     * ```js
     * // Print the FightcadeVids URLs of the provided Challenge IDs if there are any.
     * const quarkids = ['1638725293444-1085', '1631056456752-7358', '1650423155905-2091'];
     * const urls = await Fightcade.GetVideoURLs(quarkids);
     * Object.values(urls).forEach(url => console.log(url));
     * ```
     */
    export function GetVideoURLs(replays: string[]): Promise<Fightcade.VideoURLs>;
    /**
     * @deprecated `GetVideoURLs()` is deprecated because `https://fightcadevids.com` is currently abandoned.
     *
     * Get a list of FightcadeVids URLs from a list of Fightcade Replays if they exist
     *
     * @param replays Fightcade Replay Objects
     * @returns Empty array if there are no valid URLs
     *
     * @example
     * ```js
     * // Print the replay's FightcadeVids URLs if there are any.
     * const replays = await Fightcade.GetReplays();
     * const urls = await Fightcade.GetVideoURLs(replays);
     * Object.values(urls).forEach(url => console.log(url));
     * ```
     */
    export function GetVideoURLs(replays: Fightcade.Replay[]): Promise<Fightcade.VideoURLs>;
    /**
     * Get Fightcade Game's Top Ranked Players
     *
     * @param gameid - Fightcade ROM Name
     *
     * @example
     * ```js
     * // Print the top 15 recent ranked UMK3 players and their ranks.
     * const gameid = 'umk3';
     * const rankings = await Fightcade.GetRankings(gameid);
     * rankings.forEach(player => {
     *  if (player.gameinfo && player.gameinfo[gameid].rank) {
     *    console.log(`${Fightcade.Rank[player.gameinfo[gameid].rank]}: ${player.name}`);
     * }});
     * ```
     */
    export function GetRankings(gameid: string): Promise<Fightcade.Player[]>;
    /**
     * Get Fightcade Game's Top Ranked Players
     *
     * @param gameid - Fightcade ROM Name
     * @param args.limit - `default: 15` Amount of Replays to request beginning from `offset`
     * @param args.offset - `default: 0` Newest Replay number to request
     * @param args.byElo - `default: true` Sort Players by Fightcade Elo
     * @param args.recent - `default: true` Only Include Recent Players
     *
     * @example
     * ```js
     * // Print the top 30 ranked UMK3 players of all time and their ranks without ordering.
     * const gameid = 'umk3';
     * const rankings = await Fightcade.GetRankings(gameid, {limit: 30, offset: 0, byElo: false, recent: false});
     * rankings.forEach(player => {
     *  if (player.gameinfo && player.gameinfo[gameid].rank) {
     *    console.log(`${Fightcade.Rank[player.gameinfo[gameid].rank]}: ${player.name}`);
     * }});
     * ```
     */
    export function GetRankings(gameid: string, args: {
        limit?: number;
        offset?: number;
        byElo?: boolean;
        recent?: boolean;
    }): Promise<Fightcade.Player[]>;
    /**
     * Get Fightcade Game Info
     *
     * @param gameid - Fightcade ROM Name
     *
     * @example
     * ```js
     * // Prints the publisher of the game 'umk3'.
     * const game = await Fightcade.GetGame('umk3');
     * console.log(game.publisher);
     * ```
     */
    export function GetGame(gameid: string): Promise<Fightcade.Game>;
    /**
     * Get Fightcade Game's Active Events
     *
     * @param gameid - Fightcade ROM Name
     *
     * @returns Empty array if there are no active Events
     *
     * @example
     * ```js
     * // Print the 15 most recent active events for a game.
     * const events = await Fightcade.GetEvents('garou');
     * events.forEach(event => console.log(event));
     * ```
     */
    export function GetEvents(gameid: string): Promise<Fightcade.Event[]>;
    /**
     * Get Fightcade Game's Active Events
     *
     * @param gameid - Fightcade ROM Name
     * @param args.limit - `default: 15` Amount of Replays to request beginning from `offset`
     * @param args.offset - `default: 0` Newest Replay number to request
     *
     * @returns Empty array if there are no active Events
     *
     * @example
     * ```js
     * // Print the 30 most recent active events for a game.
     * const events = await Fightcade.GetEvents('garou', {limt: 30, offset: 0});
     * events.forEach(event => console.log(event));
     * ```
     */
    export function GetEvents(gameid: string, args: {
        limit?: number;
        offset?: number;
    }): Promise<Fightcade.Event[]>;
    export {  };
}
declare const Rank: readonly ["Unranked", "E", "D", "C", "B", "A", "S"];
declare const GetUser: typeof Fightcade.GetUser;
declare const GetReplay: typeof Fightcade.GetReplay;
declare const GetReplays: typeof Fightcade.GetReplays;
declare const GetUserReplays: typeof Fightcade.GetUserReplays;
declare const GetReplayURL: (replay: Fightcade.Replay) => string;
declare const GetVideoURL: typeof Fightcade.GetVideoURL;
declare const GetVideoURLs: typeof Fightcade.GetVideoURLs;
declare const GetRankings: typeof Fightcade.GetRankings;
declare const GetGame: typeof Fightcade.GetGame;
declare const GetEvents: typeof Fightcade.GetEvents;

export { Fightcade, GetEvents, GetGame, GetRankings, GetReplay, GetReplayURL, GetReplays, GetUser, GetUserReplays, GetVideoURL, GetVideoURLs, Rank };
