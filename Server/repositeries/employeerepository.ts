import {PrismaClient, Employee, Role, PostOffice} from "@prisma/client"
const prisma = new PrismaClient();

interface User {
    postOfficeName: string,
    employeeName: string,
    postalCode: string,
    role: string,
}
class EmployeeRepository {
   
    private static instance: EmployeeRepository;
    static getInstance(): EmployeeRepository{
        if(!EmployeeRepository.instance){
            EmployeeRepository.instance = new EmployeeRepository();
        }
        return EmployeeRepository.instance;
    }
    async getUserData(userName: string): Promise<User>{
        try{
            const res = await prisma.$queryRaw<User[]>`SELECT e."employeeName",  e."role", e."postalCode", p."postOfficeName" 
            FROM "Employee" AS e 
            JOIN 
            "PostOffice" AS p 
            ON
            e."postalCode" = p."postalCode"
            WHERE e."employeeID" = ${userName}`
            console.log("res res res", res[0])
            return res[0];
        }catch(error){
            console.log("error", error)
            throw error
        }
    }
    async findUserbyDB(username: string): Promise<(Employee) |null>{
        try {
            const res = await prisma.employee.findUnique({
                where :{
                    employeeID: username,
                    
                }
            });

            console.log("employee queried", res) 
            return res;
        } catch (error) {
            console.error("Error getting password from DB:", error);
            throw error;
        }
    }
    async registerUser(employeeID:string, userName:string, postalCode:string, telephone:string, email:string, role:Role ): Promise<Employee | null> {
        try {
            const result = await prisma.employee.create({
                data: {
                    employeeID: employeeID,
                    postalCode: postalCode,
                    employeeName: userName,
                    email: email,
                    telephone: telephone,
                    role: role,
                },
            });
            return result;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }
    async getEmployees(postalCode: string): Promise<Employee[]> {
        try {
            const res = await prisma.employee.findMany({
                where:{
                    postalCode: postalCode,
                },
            });
            return res;
        } catch (error) {
            console.error("Error getting employees:", error);
            throw error;
        }
    }
}
export {EmployeeRepository}


