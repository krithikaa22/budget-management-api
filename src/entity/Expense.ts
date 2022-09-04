import { BaseEntity, Column, Entity, PrimaryColumn,  BeforeInsert } from "typeorm"
import cuid from "cuid";

@Entity()
export class Expense extends BaseEntity{
    @BeforeInsert()
    setId() {
      this.id = cuid();
    }

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    value: number

    @Column()
    date: string

    // @ManyToOne(() => User)
    // @JoinColumn([{
    //     name: "userId",
    //     referencedColumnName: "id"
    // }])
    // user: User
}