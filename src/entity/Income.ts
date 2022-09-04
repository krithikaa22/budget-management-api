import { Entity, Column, PrimaryColumn, BaseEntity} from "typeorm"

@Entity()
export class Income extends BaseEntity{
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    value: number

    // @ManyToOne(() => User)
    // @JoinColumn([{
    //     name: "userId",
    //     referencedColumnName: "id"
    // }])
    // user: User

}