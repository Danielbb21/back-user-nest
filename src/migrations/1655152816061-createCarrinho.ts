import {MigrationInterface, QueryRunner} from "typeorm";

export class createCarrinho1655152816061 implements MigrationInterface {
    name = 'createCarrinho1655152816061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carrinhos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dataCompra" TIMESTAMP NOT NULL DEFAULT now(), "clienteId" uuid, CONSTRAINT "PK_8ed80828de93327d4601c21c30f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carrinhos" ADD CONSTRAINT "FK_ccdc7ca1fac03470a3dea65ad5a" FOREIGN KEY ("clienteId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carrinhos" DROP CONSTRAINT "FK_ccdc7ca1fac03470a3dea65ad5a"`);
        await queryRunner.query(`DROP TABLE "carrinhos"`);
    }

}
