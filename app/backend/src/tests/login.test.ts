import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { IUser } from '../interfaces/User';
import ErrorMessage from '../enums/ErrorMessage';

chai.use(chaiHttp);

const { expect } = chai;

const userLoginInfo = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const mockedUser = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW",
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
  })

  describe('Ao receber um email inválido no frontend', () => {
    let chaiHttpResponse: Response;
    const invalidEmail = 'invalid@email';
    const invalidLoginInfo = {
      email: invalidEmail,
      password: 'secret_admin',
    }

    before(async () => {            
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(invalidLoginInfo)
    });

    it('retorna um erro com o status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('o corpo da resposta é um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    })

    it('a mensagem de erro é "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.equal(ErrorMessage.INVALID_INPUT);
    })
  })

  describe('Ao receber uma senha inválida no frontend', () => {
    let chaiHttpResponse: Response;
    const invalidPassword = 'pw';
    const invalidLoginInfo = {
      email: 'admin@admin.com',
      password: invalidPassword,
    }

    before(async () => {            
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(invalidLoginInfo)
    });

    it('retorna um erro com o status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('o corpo da resposta é um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    })

    it('a mensagem de erro é "Incorrect email or password"', () => {
      expect(chaiHttpResponse.body.message).to.equal(ErrorMessage.INVALID_INPUT);
    })
  })

  describe('Ao receber um login sem o campo "email"', () => {
    let chaiHttpResponse: Response;
    const loginWithoutEmail = {
      password: 'secret_admin',
    }

    before(async () => {            
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginWithoutEmail)
    });

    it('retorna um erro com o status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('o corpo da resposta é um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    })

    it('a mensagem de erro é "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.equal(ErrorMessage.EMPTY_FIELDS);
    })
  })

  describe('Ao receber um login sem o campo "password"', () => {
    let chaiHttpResponse: Response;
    const loginWithoutPassword = {
      email: 'admin@admin.com',
    }

    before(async () => {            
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginWithoutPassword)
    });

    it('retorna um erro com o status 401', () => {
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('o corpo da resposta é um objeto com a propriedade "message"', () => {
      expect(chaiHttpResponse.body).to.have.key('message');
    })

    it('a mensagem de erro é "All fields must be filled"', () => {
      expect(chaiHttpResponse.body.message).to.equal(ErrorMessage.EMPTY_FIELDS);
    })
  })
});