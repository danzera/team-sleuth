class Game {
  // base constructor for creating a new Team object
  constructor(id, teamId, gameDate = '', gameTime = '', location = '', opponent) {
    this.id = id;
    this.teamId= teamId;
    this.gameDate = gameDate;
    this.gameTime = gameTime;
    this.location = location;
    this.opponent = opponent;
  }
  // clear all Game properties
  clear() {
    this.id = '';
    this.teamId= '';
    this.gameDate = '';
    this.gameTime = '';
    this.location = '';
    this.opponent = '';
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getTeamId() {
    return this.teamId;
  }
  setTeamId(teamId) {
    this.teamId = teamId;
  }
  getGameDate() {
    return this.gameDate;
  }
  setGameDate(gameDate) {
    this.gameDate = gameDate;
  }
  getGameTime() {
    return this.gameTime;
  }
  setGameTime(gameTime) {
    this.gameTime = gameTime;
  }
  getLocation() {
    return this.location;
  }
  setLocation(location) {
    this.location = location;
  }
  getOpponent() {
    return this.opponent;
  }
  setOpponent(opponent) {
    this.opponent = opponent;
  }
}