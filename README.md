# LCM Range Calculator

Aplicacao full-stack que calcula o menor multiplo comum (MMC) de todos os inteiros dentro de um intervalo. Construida com React e Django REST Framework.

## Pre-requisitos

- Python 3.13+
- Node.js 18+

## Primeiro uso

### Server (Django)

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Client (React)

```bash
cd client
npm install
```

## Rodando a aplicacao

Inicie cada comando em um terminal separado a partir da raiz do projeto:

### Server

```bash
cd server && source venv/bin/activate && python manage.py runserver
```

Roda em http://localhost:8000

### Client

```bash
cd client && npm run dev
```

Roda em http://localhost:5173

## Uso

1. Abra http://localhost:5173 no navegador.
2. Insira os valores de inicio e fim do intervalo.
3. Clique em **Calculate LCM** para ver o resultado.

### Exemplo

- **Entrada:** 1 e 10
- **Saida:** 2520 (o menor inteiro divisivel por todos os numeros de 1 a 10)
