

import { Request, Response } from 'express';
import * as companyService from './company.service';
import * as driverService from '../drivers/driver.service';
import asyncHandler from '../../utils/asyncHandler';

export const getCompanies = asyncHandler(async (req: any, res: any) => {
    const companies = await companyService.getAllCompanies();
    res.status(200).json({ success: true, data: companies });
});

export const getCompanyById = asyncHandler(async (req: any, res: any) => {
    const company = await companyService.getCompanyById(req.params.id);
    res.status(200).json({ success: true, data: company });
});

export const getCompanyDetails = asyncHandler(async (req: any, res: any) => {
    const companyDetails = await companyService.getCompanyDetailsById(req.params.id);
    res.status(200).json({ success: true, data: companyDetails });
});

// --- Driver Management for Companies ---

export const getMyDrivers = asyncHandler(async (req: any, res: any) => {
    const drivers = await companyService.getDriversByCompany(req.user.company_id);
    res.status(200).json({ success: true, data: drivers });
});

export const createDriverForMyCompany = asyncHandler(async (req: any, res: any) => {
    const driver = await companyService.createDriver(req.body, req.user.company_id);
    res.status(201).json({ success: true, data: driver });
});

export const updateDriverForMyCompany = asyncHandler(async (req: any, res: any) => {
    const driver = await companyService.updateDriver(req.params.id, req.body, req.user.company_id);
    res.status(200).json({ success: true, data: driver });
});

export const deleteDriverForMyCompany = asyncHandler(async (req: any, res: any) => {
    await companyService.deleteDriver(req.params.id, req.user.company_id);
    res.status(200).json({ success: true, data: {} });
});

export const getDriverHistoryForCompany = asyncHandler(async (req: any, res: any) => {
    await companyService.checkDriverOwnership(req.params.id, req.user.company_id);
    const history = await driverService.getTripHistoryForDriver(parseInt(req.params.id));
    res.status(200).json({ success: true, data: history });
});

// --- Gallery Management ---
export const addGalleryImage = asyncHandler(async (req: any, res: any) => {
    const { imageUrl, category } = req.body;
    const newImage = await companyService.addGalleryImage(req.user.company_id, imageUrl, category);
    res.status(201).json({ success: true, data: newImage });
});

export const deleteGalleryImage = asyncHandler(async (req: any, res: any) => {
    await companyService.deleteGalleryImage(req.user.company_id, parseInt(req.params.id));
    res.status(200).json({ success: true, data: {} });
});
