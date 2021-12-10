const sinon = require('sinon')
const { deepStrictEqual } = require('assert')

const Service = require('./src/service')

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alteraan: require('./mocks/alderaan.json'),
}

;(async () => {
  // Conecta com a API na Internet 

  // const service = new Service()
  // const withoutStub = await service.makeRequest(BASE_URL_2)
  // console.log(JSON.stringify(withoutStub))

  // Quando fizer a request, retorna dados fixos

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
  stub.withArgs(BASE_URL_2).resolves(mocks.alteraan)

  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appearedIn: 5
    }

    const results = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(results, expected)
  }
  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appearedIn: 2
    }

    const results = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(results, expected)
  }
})()