import { Expense } from "../entity/Expense";
import { User } from "../entity/User";
import { MyContext } from "src/utils";
import { Arg, Ctx, Mutation,  Resolver } from "type-graphql";

@Resolver(Expense)
export class ExpensesResolver{
    // @Mutation(() => Boolean)
    // async createExpense(
    //     @Ctx() {id} : MyContext,
    //     @Arg('value') value: number,
    //     @Arg('name') name: string,
    //     @Arg('date') date: string
    // ){
    //     const user = await User.findOne({where: {id}})
    //     var ex = {value: value, name: name, date:date}
    //     let expense;
    //     if(user)
    //     expense = await Expense.create({...ex, user}).save()
    //     console.log(await User.findOne({where: {id}}))

    //     return !!expense
    // }   

    @Mutation(() => Boolean)
    async createExpense(
        @Ctx() {id} : MyContext,
        @Arg('value') value: string,
        @Arg('name') name: string,
        @Arg('date') date: string 
    ){
        var user = await User.findOne({where: {id}})
        user?.expensesValue.push(value)
        user?.expensesDate.push(date)
        user?.expensesName.push(name)

        const {affected} = await User.update(user!.id, {...user})
        console.log(user)

        return affected == 1
    }

    @Mutation(() => Boolean)
    async editExpense(
        @Ctx() {id} : MyContext,
        @Arg('value') value: number,
        @Arg('name') name: string,
        @Arg('date') date: string 
    ){
        const data = {value: value, name: name, date: date}
        const {affected} = await Expense.update(id, {...data})

        return affected == 1
    }


    @Mutation(() => Boolean)
    async deleteExpense(
        @Arg('index') index: number,
        @Ctx() {id} : MyContext
    ){
        var user = await User.findOne({where: {id}})

        var temp = user?.expensesName.filter(e => user?.expensesName.indexOf(e) != index)
        user!.expensesName = temp!

        var temp = user?.expensesValue.filter(e => user?.expensesValue.indexOf(e) != index)
        user!.expensesValue = temp!

        var temp = user?.expensesDate.filter(e => user?.expensesDate.indexOf(e) != index)
        user!.expensesDate = temp!

        const {affected} = await User.update(user!.id, {...user})

        return affected == 1

    }
    // @Query(() => [Expense])
    // async getExpenseForUser(
    //     @Ctx() {id} : MyContext,
    // ){

    //     const expenses = await Expense.find()
    //     var temp = expenses

    //     temp = expenses.filter(e => e.id == id)

    //     return temp
    // }
}