import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Club from '../database/models/Club';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const mockedClubs = [
	{
		id: 1,
		clubName: "Avaí/Kindermann"
	},
	{
		id: 2,
		clubName: "Bahia"
	}
]

const mockedClub = {
  id: 1,
  clubName: "Avaí/Kindermann"
}

describe('Testando a rota /clubs', () => {
  describe('Ao receber uma requisição do tipo GET', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Club, "findAll")
        .resolves(mockedClubs as Club[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
    });

    after(()=>{
      (Club.findAll as sinon.SinonStub).restore();
    });

    it('deve retornar uma lista de times', () => {
      expect(chaiHttpResponse.body).to.be.an('array');
    });

    it('cada item da lista possui os atributos "id" e "clubName"', () => {
      console.log();
      
      expect(chaiHttpResponse.body[0]).to.have.keys(['id', 'clubName']);
    });

    it('a resposta deve ter o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });

  describe('Ao receber uma requisição do tipo GET com um param "id"', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(Club, "findByPk")
        .resolves(mockedClub as Club);

      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
    });

    after(()=>{
      (Club.findByPk as sinon.SinonStub).restore();
    });

    it('deve retornar um objeto', () => {
      expect(chaiHttpResponse.body).to.be.an('object');
    });

    it('o objeto possui os atributos "id" e "clubName"', () => {
      expect(chaiHttpResponse.body).to.have.keys(['id', 'clubName']);
    });

    it('a resposta deve ter o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});
