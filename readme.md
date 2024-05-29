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

2. Entre no diretorio do backend

   ```bash
   cd backend
   ```

3. Instale as dependências:

   ```bash
   pip install -r requirements.txt
   ```

4. Execute as migrações e inicie o servidor:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend (Next.js)

1. Entre no diretorio frontend

   ```bash
   cd ..
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
