import EmployeeService from '../services/employeeservice';
import { EmployeeRepository } from '../repositeries/employeerepository';

jest.mock('../../repositeries/employeerepository');  // Mock the EmployeeRepository

describe('EmployeeService', () => {
    let employeeService: EmployeeService;
    let employeeRepository: jest.Mocked<EmployeeRepository>;

    beforeEach(() => {
        employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
        employeeService = new EmployeeService(employeeRepository);
    });

    it('should return true if employee exists', async () => {
        // Mock the findUserbyID method to return a non-null value
        employeeRepository.findUserbyID.mockResolvedValue({employeeID: '123', password: 'password4', postalCode: '10120', employeeName: 'Sandali', email: 'dkflsdifoeer', telephone: '0485945945', role: 'POSTMAN'});

        const result = await employeeService.validateEmployeeID('123');

        expect(result).toBe(true);
        expect(employeeRepository.findUserbyID).toHaveBeenCalledWith('123');
    });

    it('should return false if employee does not exist', async () => {
        // Mock the findUserbyID method to return null
        employeeRepository.findUserbyID.mockResolvedValue(null);

        const result = await employeeService.validateEmployeeID('123');

        expect(result).toBe(false);
        expect(employeeRepository.findUserbyID).toHaveBeenCalledWith('123');
    });

    it('should return false if an error occurs', async () => {
        // Mock the findUserbyID method to throw an error
        employeeRepository.findUserbyID.mockRejectedValue(new Error('Database error'));

        const result = await employeeService.validateEmployeeID('123');

        expect(result).toBe(false);
        expect(employeeRepository.findUserbyID).toHaveBeenCalledWith('123');
    });
});