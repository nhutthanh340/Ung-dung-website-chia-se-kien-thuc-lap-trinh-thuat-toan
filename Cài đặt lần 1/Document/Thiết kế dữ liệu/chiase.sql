CREATE SCHEMA chiase;

CREATE TABLE chiase.loainguoidung ( 
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT,
	tenloai              tinytext  NOT NULL  ,
	CONSTRAINT pk_loainguoidung PRIMARY KEY ( id )
 );

CREATE TABLE chiase.nguoidung ( 
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT,
	hoten                text  NOT NULL  ,
	tendangnhap          varchar(20)  NOT NULL  ,
	email                varchar(20)  NOT NULL  ,
	trinhdohocvan        varchar(10)    ,
	matkhau              varchar(25)  NOT NULL  ,
	ngaysinh             date    ,
	idloainguoidung      int UNSIGNED NOT NULL  ,
	CONSTRAINT pk_nguoidung PRIMARY KEY ( id ),
	CONSTRAINT fk_nguoidung_loainguoidung FOREIGN KEY ( idloainguoidung ) REFERENCES chiase.loainguoidung( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 );

CREATE INDEX fk_nguoidung_loainguoidung ON chiase.nguoidung ( idloainguoidung );

CREATE TABLE chiase.theloaibaiviet ( 
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT,
	tentheloai           text  NOT NULL  ,
	CONSTRAINT pk_theloaibaiviet PRIMARY KEY ( id )
 );

CREATE TABLE chiase.baiviet ( 
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT,
	tenbaiviet           text  NOT NULL  ,
	idtheloaibaiviet     int UNSIGNED NOT NULL  ,
	noidung              text  NOT NULL  ,
	idnguoigui           int UNSIGNED NOT NULL  ,
	CONSTRAINT pk_baiviet PRIMARY KEY ( id ),
	CONSTRAINT fk_baiviet_nguoidung FOREIGN KEY ( idnguoigui ) REFERENCES chiase.nguoidung( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_baiviet_theloaibaiviet FOREIGN KEY ( idtheloaibaiviet ) REFERENCES chiase.theloaibaiviet( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 );

CREATE INDEX fk_baiviet_nguoidung ON chiase.baiviet ( idnguoigui );

CREATE INDEX fk_baiviet_theloaibaiviet ON chiase.baiviet ( idtheloaibaiviet );

CREATE TABLE chiase.baidang ( 
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT,
	idbaiviet            int UNSIGNED NOT NULL  ,
	ngaydang             date  NOT NULL  ,
	idluotthich          int UNSIGNED NOT NULL  ,
	idluotbinhluan       int UNSIGNED NOT NULL  ,
	idluotchiase         int UNSIGNED NOT NULL  ,
	CONSTRAINT pk_baidang PRIMARY KEY ( id ),
	CONSTRAINT fk_baidang_baiviet FOREIGN KEY ( idbaiviet ) REFERENCES chiase.baiviet( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 );

CREATE INDEX fk_baidang_baiviet ON chiase.baidang ( idbaiviet );

CREATE TABLE chiase.binhluan ( 
	idnguoidung          int UNSIGNED NOT NULL  ,
	idbaidang            int UNSIGNED NOT NULL  ,
	id                   int UNSIGNED NOT NULL  AUTO_INCREMENT,
	CONSTRAINT pk_binhluan_id PRIMARY KEY ( id ),
	CONSTRAINT unq_binhluan_idnguoidung UNIQUE ( idnguoidung ) ,
	CONSTRAINT fk_binhluan_nguoidung FOREIGN KEY ( idnguoidung ) REFERENCES chiase.nguoidung( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_binhluan_baidang FOREIGN KEY ( idbaidang ) REFERENCES chiase.baidang( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 ) engine=InnoDB;

CREATE INDEX _2 ON chiase.binhluan ( idnguoidung, idbaidang );

CREATE TABLE chiase.chiase ( 
	idnguoidung          int UNSIGNED NOT NULL  ,
	idbaidang            int UNSIGNED NOT NULL  ,
	CONSTRAINT _1 PRIMARY KEY ( idnguoidung, idbaidang ),
	CONSTRAINT fk_chiase_nguoidung FOREIGN KEY ( idnguoidung ) REFERENCES chiase.nguoidung( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_chiase_baidang FOREIGN KEY ( idbaidang ) REFERENCES chiase.baidang( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 ) engine=InnoDB;

CREATE TABLE chiase.luotthich ( 
	idnguoidung          int UNSIGNED NOT NULL  ,
	idbaidang            int UNSIGNED NOT NULL  ,
	CONSTRAINT _0 PRIMARY KEY ( idnguoidung, idbaidang ),
	CONSTRAINT fk_luotthich_nguoidung FOREIGN KEY ( idnguoidung ) REFERENCES chiase.nguoidung( id ) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT fk_luotthich_baidang FOREIGN KEY ( idbaidang ) REFERENCES chiase.baidang( id ) ON DELETE NO ACTION ON UPDATE NO ACTION
 ) engine=InnoDB;
