-- setup db schema
-- -- setup stock
create database stock;
use stock;
create table stock(code varchar(20), type char(3), date datetime, open double, close double, high double, low double, authority double, delta double, volume long, minute text);
alter table stock add primary key (code,date);

-- setup user
create user zhangsh;
GRANT ALL ON stock.stock TO 'zhangsh'@'localhost' IDENTIFIED BY '000000';

