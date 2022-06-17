import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCarrinho1655498511250 implements MigrationInterface {
    name = 'updateCarrinho1655498511250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listas" DROP CONSTRAINT "FK_2d467593d64169ff9fb688bd4f0"`);
        await queryRunner.query(`ALTER TABLE "listas" ADD CONSTRAINT "FK_2d467593d64169ff9fb688bd4f0" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listas" DROP CONSTRAINT "FK_2d467593d64169ff9fb688bd4f0"`);
        await queryRunner.query(`ALTER TABLE "listas" ADD CONSTRAINT "FK_2d467593d64169ff9fb688bd4f0" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
