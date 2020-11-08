-- setup db schema
-- -- setup stock
create database stock;
use stock;
create table stock(code varchar(20), type varchar(4), date datetime, open double, close double, high double, low double, authority double, delta double, volume bigint(20), minute text);
alter table stock add primary key (code,date);

-- -- setup run
CREATE TABLE `run` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `authority` double NOT NULL,
  `boughtAuthority` double NOT NULL,
  `boughtPrice` double NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` bigint(20) NOT NULL,
  `strategy` varchar(255) DEFAULT NULL,
  `tradingType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)
-- setup user
create user zhangsh;
GRANT ALL ON stock.stock TO 'zhangsh'@'localhost' IDENTIFIED BY '000000';

