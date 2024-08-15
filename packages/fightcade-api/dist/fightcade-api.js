// src/fightcade-api.ts
import { z } from "zod";
var Fightcade;
((Fightcade2) => {
  const ResponseSchema = z.object({ res: z.literal("OK") });
  const RankEnumSchema = z.nativeEnum({ Unranked: 0, E: 1, D: 2, C: 3, B: 4, A: 5, S: 6 });
  const GameInfoSchema = z.record(z.object({
    rank: z.optional(z.nullable(RankEnumSchema)),
    num_matches: z.optional(z.number()),
    last_match: z.optional(z.number()),
    time_played: z.number()
  }));
  const UserSchema = z.object({
    name: z.string(),
    gravatar: z.optional(z.string()),
    ranked: z.boolean(),
    last_online: z.optional(z.number()),
    date: z.number(),
    gameinfo: z.optional(GameInfoSchema)
  });
  const UserResponseSchema = ResponseSchema.merge(z.object({ user: UserSchema }));
  const CountrySchema = z.object({
    iso_code: z.string(),
    full_name: z.string()
  });
  const PlayerSchema = z.object({
    name: z.string(),
    country: CountrySchema.or(z.string()),
    rank: z.optional(z.nullable(RankEnumSchema)),
    score: z.optional(z.nullable(z.number())),
    gameinfo: z.optional(GameInfoSchema)
  });
  const PlayerResultsSchema = z.object({
    results: PlayerSchema.array(),
    count: z.number()
  });
  const PlayerResultsResponseSchema = ResponseSchema.merge(z.object({ results: PlayerResultsSchema }));
  const ReplaySchema = z.object({
    quarkid: z.string(),
    channelname: z.string(),
    date: z.number(),
    duration: z.number(),
    emulator: z.string(),
    gameid: z.string(),
    num_matches: z.optional(z.number()),
    players: PlayerSchema.array(),
    ranked: z.nullable(z.number().or(z.literal("cancelled"))),
    replay_file: z.optional(z.string()),
    realtime_views: z.optional(z.number()),
    saved_views: z.optional(z.number())
  });
  const ReplayResultsSchema = z.object({
    results: ReplaySchema.array(),
    count: z.number()
  });
  const ReplayResultsResponseSchema = ResponseSchema.merge(z.object({ results: ReplayResultsSchema }));
  const VideoURLResponse = z.record(z.string());
  const GameSchema = z.object({
    gameid: z.string(),
    romof: z.optional(z.string()),
    name: z.string(),
    year: z.string().optional(),
    publisher: z.string().optional(),
    emulator: z.string(),
    available_for: z.number(),
    system: z.string(),
    ranked: z.boolean(),
    training: z.boolean().optional(),
    genres: z.string().array().optional()
  });
  const GameResponseSchema = ResponseSchema.merge(z.object({ game: GameSchema }));
  const EventSchema = z.object({
    name: z.string(),
    author: z.string(),
    date: z.number(),
    gameid: z.string(),
    link: z.string(),
    region: z.string(),
    stream: z.optional(z.string())
  });
  const EventResultsSchema = z.object({
    results: EventSchema.array(),
    count: z.number()
  });
  const EventResultsResponseSchema = ResponseSchema.merge(z.object({ results: EventResultsSchema }));
  const URL = {
    API: "https://www.fightcade.com/api/",
    REPLAY: "https://replay.fightcade.com/",
    VIDS: "https://fightcadevids.com/api/videolinks"
  };
  Fightcade2.Rank = ["Unranked", "E", "D", "C", "B", "A", "S"];
  async function GetUser2(username) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "getuser", username })
    });
    return UserResponseSchema.parse(await response.json()).user;
  }
  Fightcade2.GetUser = GetUser2;
  async function GetReplay2(quarkid) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "searchquarks", quarkid })
    });
    return ReplaySchema.parse(ReplayResultsResponseSchema.parse(await response.json()).results.results.at(0));
  }
  Fightcade2.GetReplay = GetReplay2;
  async function GetReplays2(args = {}) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "searchquarks", ...args })
    });
    return ReplayResultsResponseSchema.parse(await response.json()).results.results;
  }
  Fightcade2.GetReplays = GetReplays2;
  async function GetUserReplays2(username, args = {}) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "searchquarks", username, ...args })
    });
    return ReplayResultsResponseSchema.parse(await response.json()).results.results;
  }
  Fightcade2.GetUserReplays = GetUserReplays2;
  Fightcade2.GetReplayURL = (replay) => `${URL.REPLAY}${replay.emulator}/${replay.gameid}/${replay.quarkid}`;
  async function GetVideoURL2(replay) {
    const response = await fetch(URL.VIDS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [typeof replay === "string" ? replay : replay.quarkid] })
    });
    const url = VideoURLResponse.parse(await response.json())[typeof replay === "string" ? replay : replay.quarkid];
    if (url) return url;
    throw Error(`Property '${typeof replay === "string" ? replay : replay.quarkid}' does not exist on type 'Fightcade.VideoURLs'`);
  }
  Fightcade2.GetVideoURL = GetVideoURL2;
  async function GetVideoURLs2(replays) {
    const response = await fetch(URL.VIDS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: replays.map((replay) => typeof replay === "string" ? replay : replay.quarkid) })
    });
    return VideoURLResponse.parse(await response.json());
  }
  Fightcade2.GetVideoURLs = GetVideoURLs2;
  async function GetRankings2(gameid, args = {}) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "searchrankings", gameid, ...args })
    });
    return PlayerResultsResponseSchema.parse(await response.json()).results.results;
  }
  Fightcade2.GetRankings = GetRankings2;
  async function GetGame2(gameid) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "gameinfo", gameid })
    });
    return GameResponseSchema.parse(await response.json()).game;
  }
  Fightcade2.GetGame = GetGame2;
  async function GetEvents2(gameid, args = {}) {
    const response = await fetch(URL.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ req: "searchevents", gameid, ...args })
    });
    return EventResultsResponseSchema.parse(await response.json()).results.results;
  }
  Fightcade2.GetEvents = GetEvents2;
})(Fightcade || (Fightcade = {}));
var Rank = Fightcade.Rank;
var GetUser = Fightcade.GetUser;
var GetReplay = Fightcade.GetReplay;
var GetReplays = Fightcade.GetReplays;
var GetUserReplays = Fightcade.GetUserReplays;
var GetReplayURL = Fightcade.GetReplayURL;
var GetVideoURL = Fightcade.GetVideoURL;
var GetVideoURLs = Fightcade.GetVideoURLs;
var GetRankings = Fightcade.GetRankings;
var GetGame = Fightcade.GetGame;
var GetEvents = Fightcade.GetEvents;
export {
  Fightcade,
  GetEvents,
  GetGame,
  GetRankings,
  GetReplay,
  GetReplayURL,
  GetReplays,
  GetUser,
  GetUserReplays,
  GetVideoURL,
  GetVideoURLs,
  Rank
};
