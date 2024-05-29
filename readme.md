# IronBat

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

# Deploy

## Passo 1: Clonando o Repositório

Primeiro, clone o repositório do seu projeto para o diretório `/home/matheus/`.

```bash
cd /home/matheus/
git clone <url-do-seu-repositorio> ironbat-tarefas
cd ironbat-tarefas
```

## Passo 2: Configurando o Ambiente Virtual

Crie um ambiente virtual dentro do diretório ironbat-tarefas.

```bash
python3 -m venv venv
source venv/bin/activate
```

## Passo 3: Instalando Dependências do Backend

Navegue até o diretório do backend e instale as dependências.

```bash
cd backend
pip install -r requirements.txt
```

## Passo 4: Configurando o Gunicorn

Instale o Gunicorn no ambiente virtual.

```bash
pip install gunicorn
```

## Passo 5: Configurando o Supervisor para o Gunicorn

Crie um arquivo de configuração do Supervisor para gerenciar o processo do Gunicorn.

```bash
sudo nano /etc/supervisor/conf.d/gunicorn.conf
```

Adicione o seguinte conteúdo, ajustando os caminhos conforme necessário:

```bash
[program:gunicorn]
directory=/home/matheus/ironbat-tarefas/backend
command=/home/matheus/ironbat-tarefas/venv/bin/gunicorn --workers 3 --bind unix:/home/matheus/ironbat-tarefas/backend/gunicorn.sock backend.wsgi:application
autostart=true
autorestart=true
stderr_logfile=/var/log/gunicorn/gunicorn.err.log
stdout_logfile=/var/log/gunicorn/gunicorn.out.log
```

## Passo 6: Configurando o Frontend Next.js

Navegue até o diretório do frontend e instale as dependências.

```bash
cd /home/matheus/ironbat-tarefas/frontend
npm install
```

## Passo 7: Configurando o Supervisor para o Next.js

Crie um arquivo de configuração do Supervisor para gerenciar o processo do Next.js.

```bash
sudo nano /etc/supervisor/conf.d/nextjs.conf
```

Adicione o seguinte conteúdo, ajustando os caminhos conforme necessário:

```bash
[program:nextjs]
directory=/home/matheus/ironbat-tarefas/frontend
command=/usr/bin/npm start
autostart=true
autorestart=true
stderr_logfile=/var/log/nextjs/nextjs.err.log
stdout_logfile=/var/log/nextjs/nextjs.out.log
```

## Passo 8: Criando Diretórios de Logs

Crie os diretórios de logs para o Gunicorn e o Next.js.

```bash
sudo mkdir -p /var/log/gunicorn
sudo mkdir -p /var/log/nextjs
sudo chown -R $USER:$USER /var/log/gunicorn
sudo chown -R $USER:$USER /var/log/nextjs
```

## Passo 9: Reiniciando o Supervisor

Reinicie o Supervisor para aplicar as novas configurações.

```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all
```

## Passo 10: Configurando o Nginx

Edite a configuração do Nginx para redirecionar as solicitações para o backend Django e o frontend Next.js.

```bash
sudo nano /etc/nginx/sites-available/ironbat-tarefas
```

Adicione a seguinte configuração:

```bash
server {
    listen 80;
    server_name 192.168.101.93;

    location / {
        proxy_pass http://localhost:3000;  # Next.js frontend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://unix:/home/matheus/ironbat-tarefas/backend/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Crie um link simbólico para ativar essa configuração.

```bash
sudo ln -s /etc/nginx/sites-available/ironbat-tarefas /etc/nginx/sites-enabled/
```

## Passo 11: Reiniciando o Nginx

Reinicie o Nginx para aplicar as mudanças.

```bash
sudo systemctl restart nginx
```
