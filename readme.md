# MyProject

## Descrição

Descrição do seu projeto.

## Configuração

### Backend (Django)

1. Crie um ambiente virtual e ative-o:

   ```bash
   python3 -m venv env
   source env/bin/activate  # No Windows use `env\Scripts\activate`
   ```

2. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

3. Configure as variáveis de ambiente no arquivo `.env`.

4. Execute as migrações e inicie o servidor:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend (Next.js)

1. Instale as dependências:

   ```bash
   cd frontend
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
