import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import { MatchResponse } from '../interfaces/Match';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockedMatch1 = {
		id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeClub: {
      clubName: "São Paulo"
    },
    awayClub: {
      clubName: "Grêmio"
    }
}

const mockedMatch2 = {
  id: 41,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeClub: {
    clubName: "São Paulo"
  },
  awayClub: {
    clubName: "Internacional"
  }
}

const mockedResponse = [mockedMatch1, mockedMatch2] as MatchResponse[];
const mockedResponseFilteredTrue = [mockedMatch2] as MatchResponse[];
const mockedResponseFilteredFalse = [mockedMatch1] as MatchResponse[];

describe('Testando a rota /matchs', () => {
  describe('Ao receber uma requisição do tipo GET', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(mockedResponse as unknown as MatchResponse[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('deve retornar uma lista de partidas', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('cada partida possui os atributos "id", "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress", "homeClub" e "awayClub"', () => {      
      expect(chaiHttpResponse.body[0]).to.have.keys(['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub']);
    });

    it('a resposta deve ter o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });

  describe('Ao receber uma requisição do tipo GET com a query "inProgress=true"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(mockedResponseFilteredTrue as unknown as MatchResponse[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: true })
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('deve retornar uma lista de partidas', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('cada partida possui os atributos "id", "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress", "homeClub" e "awayClub"', () => {      
      expect(chaiHttpResponse.body[0]).to.have.keys(['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub']);
    });

    it('o atributo inProgress possui o valor "true"', () => {
      expect(chaiHttpResponse.body[0].inProgress).to.be.true;
    });

    it('a resposta deve ter o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });

  describe('Ao receber uma requisição do tipo GET com a query "inProgress=false"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(mockedResponseFilteredFalse as unknown as MatchResponse[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .query({ inProgress: false })
    });

    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('deve retornar uma lista de partidas', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('cada partida possui os atributos "id", "homeTeam", "homeTeamGoals", "awayTeam", "awayTeamGoals", "inProgress", "homeClub" e "awayClub"', () => {      
      expect(chaiHttpResponse.body[0]).to.have.keys(['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'homeClub', 'awayClub']);
    });

    it('o atributo inProgress possui o valor "false"', () => {
      expect(chaiHttpResponse.body[0].inProgress).to.be.false;
    });

    it('a resposta deve ter o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});