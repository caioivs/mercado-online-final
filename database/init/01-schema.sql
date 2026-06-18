SET NAMES utf8mb4;
ALTER DATABASE labdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0,
  imagem VARCHAR(250),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO categories (name, description) VALUES
('Tecnologia', 'Computadores, periféricos e eletrônicos'),
('Livros', 'Livros, revistas e publicações'),
('Games', 'Jogos, consoles e acessórios gamers'),
('Casa e Decoração', 'Itens para o lar, móveis e enfeites');


INSERT INTO products (category_id, name, price, stock, imagem) VALUES
(1, 'Monitor LED 24"', 799.90, 15, 'monitor_24.jpg'),
(1, 'Fone de Ouvido Bluetooth', 159.90, 30, 'fone_bluetooth.jpg'),
(1, 'Cabo HDMI 2 Metros', 25.50, 100, 'cabo_hdmi.jpg'),
(2, 'Livro - O Senhor dos Anéis (Volume Único)', 120.00, 12, 'livro_lotr.jpg'),
(2, 'Livro - Código Limpo (Clean Code)', 95.90, 8, 'livro_cleancode.jpg'),
(3, 'Controle Sem Fio', 349.90, 25, 'controle_sem_fio.jpg'),
(3, 'Headset Gamer RGB', 289.90, 18, 'headset_gamer.jpg'),
(3, 'Console de Videogame 1TB', 4299.90, 5, 'console_1tb.jpg'),
(4, 'Luminária de Mesa LED', 65.00, 22, 'luminaria.jpg'),
(4, 'Quadro Decorativo Abstrato', 45.90, 40, 'quadro_abstrato.jpg');
