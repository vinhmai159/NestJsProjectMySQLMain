import {MigrationInterface, QueryRunner} from "typeorm";

export class v1566978865826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `category` CHANGE `date` `date` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `category` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `category` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` CHANGE `price` `price` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `product` CHANGE `salePrice` `salePrice` double NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `discount` `discount` double NOT NULL DEFAULT 0");
        await queryRunner.query("ALTER TABLE `product` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `product` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `date` `date` timestamp NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `user` CHANGE `date` `date` timestamp NOT NULL DEFAULT 'current_timestamp()' ON UPDATE current_timestamp()");
        await queryRunner.query("ALTER TABLE `product` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `discount` `discount` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `product` CHANGE `salePrice` `salePrice` double(22) NOT NULL");
        await queryRunner.query("ALTER TABLE `product` CHANGE `price` `price` double(22) NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `updatedAt` `updatedAt` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `createdAt` `createdAt` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)'");
        await queryRunner.query("ALTER TABLE `category` CHANGE `date` `date` timestamp NOT NULL DEFAULT 'current_timestamp()' ON UPDATE current_timestamp()");
    }

}
