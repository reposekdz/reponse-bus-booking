import Company from './company.model';
import User from '../users/user.model';
import { AppError } from '../../utils/AppError';

export const getAllCompanies = async () => {
    return Company.find({ status: 'Active' }).select('name logoUrl description coverUrl');
};

export const getCompanyById = async (id: string) => {
    const company = await Company.findById(id);
    if (!company) {
        throw new AppError('Company not found', 404);
    }
    return company;
};


// --- Service functions for company managers managing their drivers ---

export const getDriversByCompany = async (companyId: string) => {
    if (!companyId) {
        throw new AppError('Company manager is not associated with a company.', 400);
    }
    return User.find({ role: 'driver', company: companyId })
        .populate('company', 'name');
};

export const createDriver = async (driverData: any, companyId: string) => {
    const { name, email, password, phone } = driverData;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new AppError('A user with this email already exists.', 400);
    }

    const driver = await User.create({
        name,
        email,
        password,
        phone,
        role: 'driver',
        company: companyId,
        status: 'Active'
    });
    
    const driverResponse = driver.toObject();
    delete driverResponse.password;
    return driverResponse;
};

export const updateDriver = async (driverId: string, updateData: any, companyId: string) => {
    delete updateData.password; // Password is changed via auth route

    const driver = await User.findById(driverId);
    if (!driver || driver.role !== 'driver' || driver.company?.toString() !== companyId.toString()) {
        throw new AppError('Driver not found or you do not have permission to edit this driver.', 404);
    }
    
    Object.assign(driver, updateData);
    await driver.save();
    return driver;
};

export const deleteDriver = async (driverId: string, companyId: string) => {
    const driver = await User.findById(driverId);
     if (!driver || driver.role !== 'driver' || driver.company?.toString() !== companyId.toString()) {
        throw new AppError('Driver not found or you do not have permission to delete this driver.', 404);
    }
    await driver.deleteOne();
    return;
};