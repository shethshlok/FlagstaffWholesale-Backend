import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCreate1711942250317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE customer ADD COLUMN activated BOOLEAN DEFAULT FALSE;"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \"customer\" DROP COLUMN \"activated\"`
        );
    }

}
