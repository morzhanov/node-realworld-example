import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedNewFieldForPost1556283290732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" ADD "newFieldForMigrationTest" character varying DEFAULT 'example field'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "newFieldForMigrationTest"`);
    }

}
