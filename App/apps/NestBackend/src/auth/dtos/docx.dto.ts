import { IsNotEmpty, IsString } from "class-validator";

export class DocxDto{

    @IsString()
    @IsNotEmpty()
    deviceNo: string

    @IsString()
    @IsNotEmpty()
    conductedBy: string

    @IsString()
    @IsNotEmpty()
    date: string
    
    @IsString()
    @IsNotEmpty()
    startTime: string
    
    @IsString()
    @IsNotEmpty()
    completionTime: string

    @IsString()
    @IsNotEmpty()
    lastCalibrationDate: string
    
    @IsString()
    @IsNotEmpty()
    dueDate: string
    
    
    @IsString()
    discrepancyReason?: string

    @IsString()
    @IsNotEmpty()
    ph7: string

    @IsString()
    @IsNotEmpty()
    ph4: string
    
    @IsString()
    @IsNotEmpty()
    ph10: string

    @IsString()
    @IsNotEmpty()
    calibrationStatus: string
    
    @IsString()
    @IsNotEmpty()
    preparedBy: string
    
    @IsString()
    @IsNotEmpty()
    signature: string
    
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    preparedDate: string


}