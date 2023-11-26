import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1701037971885 implements MigrationInterface {
    name = 'CreateDatabase1701037971885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reserves" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "entry_date" date NOT NULL, "exit_date" date NOT NULL, "userId" uuid, "roomId" uuid, CONSTRAINT "PK_e38489955a3c1a3880737f466ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."rooms_status_enum" AS ENUM('disponivel', 'ocupado', 'em limpeza')`);
        await queryRunner.query(`CREATE TABLE "rooms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "capacity" integer NOT NULL, "status" "public"."rooms_status_enum" NOT NULL DEFAULT 'disponivel', "value" integer NOT NULL, "description" text NOT NULL, "experience" text NOT NULL, CONSTRAINT "PK_0368a2d7c215f2d0458a54933f2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "occupations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "check_in" date NOT NULL DEFAULT now(), "check_out" date, "is_active" boolean NOT NULL DEFAULT true, "userId" uuid, "roomId" uuid, CONSTRAINT "PK_0bf09083dd897df1e8ebb96b5c1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('guest', 'manager', 'attendant')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "cpf" character varying(11) NOT NULL, "password" character varying(128) NOT NULL, "email" character varying(128) NOT NULL, "telephone" character varying(13) NOT NULL, "nationality" character varying(50) NOT NULL, "room_key" character varying(100), "role" "public"."users_role_enum" NOT NULL DEFAULT 'guest', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "emergencyContactId" uuid, CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_954a7306d84a63b8eb31da7678" UNIQUE ("emergencyContactId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emergency_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "telephone" character varying(13) NOT NULL, CONSTRAINT "PK_8be191845b6fca1c4e5ba5bd7d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_52d23b1777f37dd5c660fd55cd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_afd7a9f3f1cd8dbb37db5494d7f" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occupations" ADD CONSTRAINT "FK_3b1319c72da52696b09a19e4558" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "occupations" ADD CONSTRAINT "FK_101b47c4b11a75767282f53e5b6" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_954a7306d84a63b8eb31da7678c" FOREIGN KEY ("emergencyContactId") REFERENCES "emergency_contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_954a7306d84a63b8eb31da7678c"`);
        await queryRunner.query(`ALTER TABLE "occupations" DROP CONSTRAINT "FK_101b47c4b11a75767282f53e5b6"`);
        await queryRunner.query(`ALTER TABLE "occupations" DROP CONSTRAINT "FK_3b1319c72da52696b09a19e4558"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_afd7a9f3f1cd8dbb37db5494d7f"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_52d23b1777f37dd5c660fd55cd9"`);
        await queryRunner.query(`DROP TABLE "emergency_contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "occupations"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TYPE "public"."rooms_status_enum"`);
        await queryRunner.query(`DROP TABLE "reserves"`);
    }

}
