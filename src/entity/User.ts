import { Field, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity,PrimaryGeneratedColumn } from "typeorm"

@Entity('User')
@ObjectType('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: string

    @Column()
    @Field()
    name: string

    @Column()
    @Field()
    email: string

    @Column()
    @Field()
    password: string

    @Column()
    @Field()
    phone: string

    @Column({nullable: true})
    @Field({nullable: true})
    budget: number

    @Column("simple-array")
    @Field(() => [String])
    expensesValue: string[]

    @Column("simple-array")
    @Field(() => [String])
    expensesName: string[]

    @Column("simple-array")
    @Field(() => [String])
    expensesDate: string[]

    @Column("simple-array")
    @Field(() => [String])
    incomeValue: string[]

    @Column("simple-array")
    @Field(() => [String])
    incomeName: string[]

    // @OneToMany(() => Expense, (expense) => expense.user, {nullable: true})
    // expenses: Expense[]

    // @OneToMany(() => Income, (income) => income.user)
    // income: Income[]
}