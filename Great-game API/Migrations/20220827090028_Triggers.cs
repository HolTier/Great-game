using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Great_game_API.Migrations
{
    public partial class Triggers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE or REPLACE FUNCTION before_add_cost ()
                RETURNS trigger
                language plpgsql
                AS
                $$
                    BEGIN
                        IF NEW.""Cost"" < 0 OR NEW.""Prize"" < 0 THEN
                            IF tg_op = 'UPDATE' THEN
                                RETURN OLD;
                            END IF;
                            RETURN NULL;
                        END IF;
                        RETURN NEW;
                    END;
                $$;

                CREATE TRIGGER before_add_cost_trigger
                    BEFORE UPDATE OR INSERT
                    ON ""GameTypes""
                    FOR EACH ROW
                    EXECUTE FUNCTION before_add_cost();

                CREATE or REPLACE FUNCTION before_add_cash()
                RETURNS trigger
                language plpgsql
                AS
                $$
                BEGIN
                    IF NEW.""Cash"" < 0 THEN
                        IF tg_op = 'UPDATE' THEN
                            RETURN OLD;
                        END IF;
                        RETURN NULL;
                    END IF;
                    RETURN NEW;
                END;
                $$;

            CREATE TRIGGER before_add_cash_trigger
                BEFORE UPDATE OR INSERT
                ON ""Users""
                FOR EACH ROW
                EXECUTE FUNCTION before_add_cash();"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}
