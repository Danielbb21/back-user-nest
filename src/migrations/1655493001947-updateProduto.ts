import {MigrationInterface, QueryRunner} from "typeorm";

export class updateProduto1655493001947 implements MigrationInterface {
    name = 'updateProduto1655493001947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "estoque" integer NOT NULL DEFAULT '32'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "estoque"`);
    }

}
