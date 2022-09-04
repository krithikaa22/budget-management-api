import { Income } from "../entity/Income";
import { MyContext } from "src/utils";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver(Income)
export class IncomeResolver{
    // @Mutation(() => Boolean)
    // async createIncome(
    //     @Arg('value') value: number,
    //     @Arg('name') name: string
    // ){
    //     const income = await Income.create({value, name}).save()

        
    //     return !!income
    // }   

    @Mutation(() => Boolean)
    async createIncome(
        @Ctx() {id} : MyContext,
        @Arg('value') value: string,
        @Arg('name') name: string,
    ){
        var user = await User.findOne({where: {id}})
        user?.incomeValue.push(value)
        user?.incomeName.push(name)

        const {affected} = await User.update(user!.id, {...user})
        console.log(user)

        return affected == 1
    }

    // @Mutation(() => Boolean)
    // async editExpense(
    //     @Ctx() {id} : MyContext,
    //     @Arg('value') value: number,
    //     @Arg('name') name: string
    // ){
    //     const data = {value: value, name: name}
    //     const {affected} = await Income.update(id, {...data})

    //     return affected == 1
    // }

    // @Mutation(() => Boolean)
    // async deleteExpense(
    //     @Arg('expenseId') expenseId: string
    // ){
    //     const {affected} = await Income.delete(expenseId)
    //     return affected == 1
    // }

    @Mutation(() => Boolean)
    async deleteIncome(
        @Arg('index') index: number,
        @Ctx() {id} : MyContext
    ){
        var user = await User.findOne({where: {id}})

        var temp = user?.incomeName.filter(e => user?.incomeName.indexOf(e) != index)
        user!.incomeName = temp!

        var temp = user?.incomeValue.filter(e => user?.incomeValue.indexOf(e) != index)
        user!.incomeValue = temp!

        const {affected} = await User.update(user!.id, {...user})

        return affected == 1

    }
}