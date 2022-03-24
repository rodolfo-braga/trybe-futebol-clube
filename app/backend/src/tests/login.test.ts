import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { IUser } from '../interfaces/User';

chai.use(chaiHttp);

const { expect } = chai;

const userLoginInfo = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const mockedUser: IUser = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
}

describe('Testando a rota /login', () => {
  describe('Ao inserir dados válidos no frontend', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(mockedUser as User);
            
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(userLoginInfo)
    });

    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })

    it('retorna o status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    })

    it('o corpo da resposta é um objeto com as propriedades "user" e "token"', () => {
      expect(chaiHttpResponse.body).to.have.keys(['user', 'token']);
    })

    it('a propriedade "user" não possui a chave "password"', () => {
      expect(chaiHttpResponse.body.user).to.not.have.key('password');
    })

    it('após o acesso, redireciona o usuário para a tela de jogos', () => {
      expect(chaiHttpResponse).to.redirectTo('http://localhost:3000/matchs');
    })
  })
});