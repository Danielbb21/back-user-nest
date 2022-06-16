import {MigrationInterface, QueryRunner} from "typeorm";

export class produtoecarrinho1655412083942 implements MigrationInterface {
    name = 'produtoecarrinho1655412083942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "produtos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "Nome" character varying NOT NULL, "descricao" character varying NOT NULL, "preco" double precision NOT NULL, "imagem" character varying NOT NULL, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL DEFAULT '1', "carrinhoId" uuid, "produtoId" uuid, CONSTRAINT "PK_c473d5240fe22d87076551b4ee2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "listas" ADD CONSTRAINT "FK_2d467593d64169ff9fb688bd4f0" FOREIGN KEY ("carrinhoId") REFERENCES "carrinhos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listas" ADD CONSTRAINT "FK_c76e5dbc8d3c9c1580274c414eb" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listas" DROP CONSTRAINT "FK_c76e5dbc8d3c9c1580274c414eb"`);
        await queryRunner.query(`ALTER TABLE "listas" DROP CONSTRAINT "FK_2d467593d64169ff9fb688bd4f0"`);
        await queryRunner.query(`DROP TABLE "listas"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
    }

}
