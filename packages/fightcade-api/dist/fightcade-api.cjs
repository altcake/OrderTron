"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/fightcade-api.ts
var fightcade_api_exports = {};
__export(fightcade_api_exports, {
  Fightcade: () => Fightcade,
  GetEvents: () => GetEvents,
  GetGame: () => GetGame,
  GetRankings: () => GetRankings,
  GetReplay: () => GetReplay,
  GetReplayURL: () => GetReplayURL,
  GetReplays: () => GetReplays,
  GetUser: () => GetUser,
  GetUserReplays: () => GetUserReplays,
  GetVideoURL: () => GetVideoURL,
  GetVideoURLs: () => GetVideoURLs,
  Rank: () => Rank
});
module.exports = __toCommonJS(fightcade_api_exports);
var import_zod = require("zod");
var Fightcade;
((Fightcade2) => {
  const ResponseSchema = import_zod.z.object({ res: import_zod.z.literal("OK") });
  const RankEnumSchema = import_zod.z.nativeEnum({ Unranked: 0, E: 1, D: 2, C: 3, B: 4, A: 5, S: 6 });
  const GameInfoSchema = import_zod.z.record(import_zod.z.object({
    rank: import_zod.z.optional(import_zod.z.nullable(RankEnumSchema)),
    num_matches: import_zod.z.optional(import_zod.z.number()),
    last_match: import_zod.z.optional(import_zod.z.number()),
    time_played: import_zod.z.number()
  }));
  const UserSchema = import_zod.z.object({
    name: import_zod.z.string(),
    gravatar: import_zod.z.optional(import_zod.z.string()),
    ranked: import_zod.z.boolean(),
    last_online: import_zod.z.optional(import_zod.z.number()),
    date: import_zod.z.number(),
    gameinfo: import_zod.z.optional(GameInfoSchema)
  });
  const UserResponseSchema = ResponseSchema.merge(import_zod.z.object({ user: UserSchema }));
  const CountrySchema = import_zod.z.object({
    iso_code: import_zod.z.string(),
    full_name: import_zod.z.string()
  });
  const PlayerSchema = import_zod.z.object({
    name: import_zod.z.string(),
    country: CountrySchema.or(import_zod.z.string()),
    rank: import_zod.z.optional(import_zod.z.nullable(RankEnumSchema)),
    score: import_zod.z.optional(import_zod.z.nullable(import_zod.z.number())),
    gameinfo: import_zod.z.optional(GameInfoSchema)
  });
  const PlayerResultsSchema = import_zod.z.object({
    results: PlayerSchema.array(),
    count: import_zod.z.number()
  });
  const PlayerResultsResponseSchema = ResponseSchema.merge(import_zod.z.object({ results: PlayerResultsSchema }));
  const ReplaySchema = import_zod.z.object({
    quarkid: import_zod.z.string(),
    channelname: import_zod.z.string(),
    date: import_zod.z.number(),
    duration: import_zod.z.number(),
    emulator: import_zod.z.string(),
    gameid: import_zod.z.string(),
    num_matches: import_zod.z.optional(import_zod.z.number()),
    players: PlayerSchema.array(),
    ranked: import_zod.z.nullable(import_zod.z.number().or(import_zod.z.literal("cancelled"))),
    replay_file: import_zod.z.optional(import_zod.z.string()),
    realtime_views: import_zod.z.optional(import_zod.z.number()),
    saved_views: import_zod.z.optional(import_zod.z.number())
  });
  const ReplayResultsSchema = import_zod.z.object({
    results: ReplaySchema.array(),
    count: import_zod.z.number()
  });
  const ReplayResultsResponseSchema = ResponseSchema.merge(import_zod.z.object({ results: ReplayResultsSchema }));
  const VideoURLResponse = import_zod.z.record(import_zod.z.string());
  const GameSchema = import_zod.z.object({
    gameid: import_zod.z.string(),
    romof: import_zod.z.optional(import_zod.z.string()),
    name: import_zod.z.string(),
    year: import_zod.z.string().optional(),
    publisher: import_zod.z.string().optional(),
    emulator: import_zod.z.string(),
    available_for: import_zod.z.number(),
    system: import_zod.z.string(),
    ranked: import_zod.z.boolean(),
    training: import_zod.z.boolean().optional(),
    genres: import_zod.z.string().array().optional()
  });
  const GameResponseSchema = ResponseSchema.merge(import_zod.z.object({ game: GameSchema }));
  const EventSchema = import_zod.z.object({
    name: import_zod.z.string(),
    author: import_zod.z.string(),
    date: import_zod.z.number(),
    gameid: import_zod.z.string(),
    link: import_zod.z.string(),
    region: import_zod.z.string(),
    stream: import_zod.z.optional(import_zod.z.string())
  });
  const EventResultsSchema = import_zod.z.object({
    results: EventSchema.array(),
    count: import_zod.z.number()
  });
  const EventResultsResponseSchema = ResponseSchema.merge(import_zod.z.object({ results: EventResultsSchema }));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
