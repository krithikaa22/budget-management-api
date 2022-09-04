import { ExpensesResolver } from "./Expenses";
import { IncomeResolver } from "./Income";
import { UserResolver } from "./User";

export default [UserResolver, ExpensesResolver, IncomeResolver] as const