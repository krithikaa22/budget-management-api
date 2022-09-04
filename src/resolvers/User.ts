import { User } from ".././entity/User";
import { Arg, Ctx,  Mutation, Query, Resolver} from "type-graphql";
import { MyContext } from "src/utils";
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

@Resolver(User)
export class UserResolver{
    @Mutation(() => Boolean)
    async createUser(
        @Arg('name') name: string, 
        @Arg('email') email: string, 
        @Arg('password') password: string,
        @Arg('phone') phone: string,
        ){
            bcrypt.genSalt(10, function(err: any, salt: any) {
                if(err){
                    throw new Error(err)
                }
                bcrypt.hash(password, salt, async function(err: any, hash: any) {
                    if(err){
                        throw new Error(err)
                    }
                   let user = await User.create({name, email, password: hash, phone, expensesDate: [], expensesValue: [], expensesName: [], incomeName: [], incomeValue: []}).save()
                    return !!user
                });
            });
            return true
    }

    @Mutation(() => Boolean)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res, id}: MyContext
    ){
        let userN = await User.findOne({where: {email}})
        if (!userN){
            throw new Error("Team not registered! Register your team to access the service.")
        }
        await bcrypt.compare(password, userN!.password, 
           (err: any, isMatch: boolean) => {
            if(err){
                throw new Error(err)
            } 
            if (!isMatch){
                throw new Error("Wrong Credentials!")
            }
        })
        var token = jwt.sign({ id: userN.id }, 'secret');
        res.cookie("token", token)

        id = userN.id

        console.log(id)

        return true
    }

 
    @Query(() => User, { nullable: true })
    async me(@Ctx() { id }: MyContext) {
        const user = User.findOne({where: {id}})
        return user;
    }


    @Query(() => Number)
    async getBalance(@Ctx() {id} : MyContext){
        const user = await User.findOne({where: {id}})
        console.log(user)
        var totalE = 0;
        var totalI = 0

        user?.expensesValue.map(e => {
          totalE += parseInt(e)  
        })
        user?.incomeValue.map(i => [
            totalI += parseInt(i)
        ])

        return (totalI - totalE)
    }

    @Mutation(() => Boolean)
    async addBudget(@Arg('budget') budget: number, @Ctx(){id}: MyContext){
        var user = await User.findOne({where: {id}})
        console.log(user)
        user!.budget = budget
        console.log(user)
        const {affected} = await User.update(user!.id, {...user})

        return affected == 1
    }

    @Mutation(() => Boolean)
    async editBudget(@Arg('budget') budget: number, @Ctx(){id}: MyContext){
        var user = await User.findOne({where: {id}})
        user!.budget = budget
        const {affected} = await User.update(user!.id, {...user})

        return affected == 1
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() {res}: MyContext){
        res.cookie("token", "", { httpOnly: true, maxAge: 1 })

        return true;
    }

}