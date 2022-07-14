create database systemx;

create user systemx with encrypted password 'NorthVersusSouth!';

grant all privileges on database systemx to systemx;

/** Switch to user systemx */

create schema if not exists systemx;


CREATE TABLE olympic_winners (
  athlete varchar(20) DEFAULT NULL,
  age int DEFAULT NULL,
  country varchar(20) DEFAULT NULL,
  country_group varchar(2) DEFAULT NULL,
  year int DEFAULT NULL,
  date varchar(20) DEFAULT NULL,
  sport varchar(20) DEFAULT NULL,
  gold int DEFAULT NULL,
  silver int DEFAULT NULL,
  bronze int DEFAULT NULL,
  total int DEFAULT NULL
) 

psql -h systemx.ciym2ycdxvvw.us-east-1.rds.amazonaws.com  -p 5432 -d systemx -U postgres -W < olympic_winners.sql