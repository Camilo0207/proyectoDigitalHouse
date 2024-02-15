-- MySQL Workbench Synchronization
-- Generated: 2022-11-03 00:01
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Gonzalo Piazza

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `dh`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(25) NOT NULL,
  `description` VARCHAR(200) NULL DEFAULT NULL,
  `image_url` VARCHAR(256) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `titulo_UNIQUE` (`title` ASC),
  UNIQUE INDEX `url_imagen_UNIQUE` (`image_url` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`countries` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(2) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `titulo_UNIQUE` (`name` ASC),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`states` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `country_id` INT(11) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_COUNTRYSTATE_idx` (`country_id` ASC),
  CONSTRAINT `FK_COUNTRYSTATE`
    FOREIGN KEY (`country_id`)
    REFERENCES `dh`.`countries` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`cities` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `state_id` INT(11) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_STATECITIY_idx` (`state_id` ASC),
  CONSTRAINT `FK_STATECITIY`
    FOREIGN KEY (`state_id`)
    REFERENCES `dh`.`states` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `address1` VARCHAR(256) NOT NULL,
  `address2` VARCHAR(100) NULL DEFAULT NULL,
  `starts` INT(1) NULL DEFAULT NULL,
  `score` FLOAT(11) NOT NULL,
  `check_in` TIME NOT NULL,
  `check_out` TIME NOT NULL,
  `rules` LONGTEXT NOT NULL,
  `security` LONGTEXT NOT NULL,
  `cancellation` LONGTEXT NOT NULL,
  `longitude` FLOAT(11) NULL DEFAULT NULL,
  `latitude` FLOAT(11) NULL DEFAULT NULL,
  `category_id` INT(11) NOT NULL,
  `city_id` INT(11) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_CATEGORYPRODUCT_idx` (`category_id` ASC),
  INDEX `FK_CITYPRODUCT_idx` (`city_id` ASC),
  CONSTRAINT `FK_CATEGORYPRODUCT`
    FOREIGN KEY (`category_id`)
    REFERENCES `dh`.`categories` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `FK_CITYPRODUCT`
    FOREIGN KEY (`city_id`)
    REFERENCES `dh`.`cities` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`services` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `image_url` VARCHAR(256) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `titulo_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`products_services` (
  `product_id` INT(11) NOT NULL,
  `image_id` INT(11) NOT NULL,
  PRIMARY KEY (`product_id`, `image_id`),
  INDEX `FK_SERVICEPRODUCT_idx` (`image_id` ASC),
  CONSTRAINT `FK_PRODUCTSERVICE`
    FOREIGN KEY (`product_id`)
    REFERENCES `dh`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_SERVICEPRODUCT`
    FOREIGN KEY (`image_id`)
    REFERENCES `dh`.`services` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `image_url` VARCHAR(256) NOT NULL,
  `product_id` INT(11) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_PRODUCTIMAGE_idx` (`product_id` ASC),
  CONSTRAINT `FK_PRODUCTIMAGE`
    FOREIGN KEY (`product_id`)
    REFERENCES `dh`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `surname` VARCHAR(20) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `image_url` VARCHAR(256) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `salt` VARCHAR(127) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`products_scores` (
  `product_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `score` INT(1) NOT NULL,
  PRIMARY KEY (`product_id`, `user_id`),
  INDEX `FK_USERSCORE_idx` (`user_id` ASC),
  CONSTRAINT `FK_PRODUCTSCORE`
    FOREIGN KEY (`product_id`)
    REFERENCES `dh`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_USERSCORE`
    FOREIGN KEY (`user_id`)
    REFERENCES `dh`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`users_favorites` (
  `product_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`product_id`, `user_id`),
  INDEX `FK_USERSCORE_idx` (`user_id` ASC),
  CONSTRAINT `FK_PRODUCTFAVORITE`
    FOREIGN KEY (`product_id`)
    REFERENCES `dh`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_USERSFAVORITE`
    FOREIGN KEY (`user_id`)
    REFERENCES `dh`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `dh`.`booking` (
  `product_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  `created_user_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT NULL,
  `updated_user_id` INT(11) NULL DEFAULT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `deleted_user_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`, `user_id`),
  INDEX `FK_USERSCORE_idx` (`user_id` ASC),
  CONSTRAINT `FK_PRODUCTBOOKING`
    FOREIGN KEY (`product_id`)
    REFERENCES `dh`.`products` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_USERBOOKING`
    FOREIGN KEY (`user_id`)
    REFERENCES `dh`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
